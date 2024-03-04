import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable } from 'rxjs';

import { LocationDto, ZipInfoEntity } from '../../../../api/auth/data-contracts';
import { ZipInfoService } from '../../../../api/auth/zip-info.service';
import { GoogleMapLoaderService } from '../../../../services/google-map-loader.service';
import { ZipCodePolygon } from '../../interfaces/zip-code-polygon';

@UntilDestroy()
@Component({
  selector: 'app-zip-code-picker',
  templateUrl: 'zip-code-picker.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZipCodePickerComponents {
  @Input() set postalCodes(postalCodes: string[] | null) {
    const zipCodes: string[] = postalCodes ? [...new Set(postalCodes.filter(Boolean))] : [];
    zipCodes.sort();
    if (zipCodes.length > 0) {
      this.findPolygonByPostalCode(zipCodes);
    } else {
      this.clearMap();
    }
  }

  @Input() set center(center: LocationDto | undefined) {
    if (!center) {
      return;
    }
    this.setShopMarker(center);
    this.setMapCenter(center);
  }

  @Output() zipCodesChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  marketMarker?: google.maps.MarkerOptions;
  $isLoaded: Observable<boolean> = this.googleMapLoaderService.$isLoaded;
  mapOptions: google.maps.MapOptions = {
    clickableIcons: false,
    zoom: 10,
  };

  private polygonOptions: google.maps.PolygonOptions = {
    draggable: false,
    geodesic: true,
    editable: false,
    fillColor: 'rgba(70,203,22,0.71)',
    strokeColor: 'rgba(0,169,14,0.71)',
    strokeWeight: 1,
    strokePosition: 0,
    clickable: true,
  };

  polygonsSubject: BehaviorSubject<Map<string, ZipCodePolygon>> = new BehaviorSubject<Map<string, ZipCodePolygon>>(new Map());

  constructor(
    private readonly googleMapLoaderService: GoogleMapLoaderService,
    private readonly mapGeocoder: MapGeocoder,
    private readonly zipInfoService: ZipInfoService,
  ) {
    this.subscribeOnPolygonChanges();
  }

  private clearMap(): void {
    if (this.polygonsSubject.getValue().size > 0) {
      this.polygonsSubject.next(new Map());
    }
  }

  private setShopMarker(position: LocationDto): void {
    this.marketMarker = {
      clickable: false,
      position,
      icon: '../../../../../../assets/img/map-markers/blue-marker.svg',
    };
  }

  private setMapCenter(center: LocationDto): void {
    this.mapOptions = {
      ...this.mapOptions,
      center,
    };
  }

  private subscribeOnPolygonChanges(): void {
    this.polygonsSubject.pipe(untilDestroyed(this)).subscribe((map: Map<string, ZipCodePolygon>) => {
      const zipCodes: string[] = [...new Set(map.keys())];
      zipCodes.sort();
      this.zipCodesChange.emit(zipCodes);
    });
  }

  async mapClick(event: google.maps.MapMouseEvent | google.maps.IconMouseEvent): Promise<void> {
    const location: LocationDto | undefined = event.latLng?.toJSON();
    if (location) {
      this.zipInfoService
        .searchByLocation(location)
        .pipe(untilDestroyed(this))
        .subscribe((zipInfo: ZipInfoEntity) => {
          if (zipInfo) {
            this.polygonsSubject.next(
              this.polygonsSubject.getValue().set(zipInfo.zipCode, {
                zipCode: zipInfo.zipCode,
                multipolygon: this.mapGeoJsonToLatLngLiteral(zipInfo.multipolygon),
                options: this.polygonOptions,
              }),
            );
          }
        });
    }
  }

  private mapGeoJsonToLatLngLiteral(multipolygon: ZipInfoEntity['multipolygon']): google.maps.LatLngLiteral[][][] {
    return !multipolygon
      ? []
      : multipolygon.map((m: number[][][]) =>
          m.map((l: number[][]) =>
            l.map((v: number[]) => ({
              lat: v[1],
              lng: v[0],
            })),
          ),
        );
  }

  private findPolygonByPostalCode(postalCodes: string[]): void {
    const map: Map<string, ZipCodePolygon> = this.polygonsSubject.getValue();
    const newZipCodes: string[] = postalCodes.filter((zip: string) => !map.has(zip));
    const deletedZipCodes: string[] = [...new Set(map.keys())].filter((zip: string) => !postalCodes.includes(zip));
    if (deletedZipCodes.length > 0) {
      for (const deletedZip of deletedZipCodes) {
        map.delete(deletedZip);
      }
      this.polygonsSubject.next(map);
    }

    if (newZipCodes.length > 0) {
      this.zipInfoService
        .searchByZipCodes({ zip: newZipCodes })
        .pipe(untilDestroyed(this))
        .subscribe((zipInfos: ZipInfoEntity[]) => {
          for (const zipInfo of zipInfos) {
            map.set(zipInfo.zipCode, {
              zipCode: zipInfo.zipCode,
              multipolygon: this.mapGeoJsonToLatLngLiteral(zipInfo.multipolygon),
              options: this.polygonOptions,
            });
          }
          const notFoundZipCodes: string[] = newZipCodes.filter(
            (z: string) => !zipInfos.some(({ zipCode }: ZipInfoEntity) => zipCode === z),
          );
          if (notFoundZipCodes.length > 0) {
            for (const deletedZip of notFoundZipCodes) {
              map.delete(deletedZip);
            }
          }
          this.polygonsSubject.next(map);
        });
    }
  }

  deletePolygon(zipCode: string): void {
    const map: Map<string, ZipCodePolygon> = this.polygonsSubject.getValue();
    const polygon: ZipCodePolygon | undefined = map.get(zipCode);
    if (!polygon) {
      return;
    }
    map.delete(zipCode);
    this.polygonsSubject.next(map);
  }
}
