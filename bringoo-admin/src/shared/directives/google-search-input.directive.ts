import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GoogleMap, MapGeocoder, MapGeocoderResponse } from '@angular/google-maps';
import { tap } from 'rxjs/operators';

import { LocationDto } from '../api/auth/data-contracts';
import { AddressInformationFromGoogleGeocoderResult } from '../helpers/address-information-from-google-geocoder-result';
import { AddressFromGoogleResult } from '../types/address-from-gogle-result.type';

@Directive({
  selector: '[google-search-input]',
})
export class GoogleSearchInputDirective implements OnInit {
  @Input() googleMapComponent!: GoogleMap;
  map!: google.maps.Map;
  placeService!: google.maps.places.PlacesService;

  @Input() set initLocation(location: LocationDto | null | undefined) {
    if (location) {
      this.geocoding({ location, isMapEvent: true });
    }
  }

  @Output() addressResult: EventEmitter<AddressFromGoogleResult> = new EventEmitter<AddressFromGoogleResult>();
  @Output() location: EventEmitter<LocationDto> = new EventEmitter<LocationDto>();
  @Output() locationError: EventEmitter<string> = new EventEmitter<string>();
  @Output() placeResult: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter<google.maps.places.PlaceResult>();

  input!: HTMLInputElement;

  constructor(public ref: ElementRef<HTMLInputElement>, private readonly geocoder: MapGeocoder) {
    this.input = this.ref.nativeElement;
  }

  ngOnInit(): void {
    if (this.googleMapComponent.googleMap) {
      this.map = this.googleMapComponent.googleMap;
      this.placeService = new google.maps.places.PlacesService(this.map);
    }
    this.bindInputToMap();
    this.mapClickSub();
  }

  bindInputToMap(): void {
    const searchBox: google.maps.places.SearchBox = new google.maps.places.SearchBox(this.input);

    searchBox.addListener('places_changed', () => {
      const places: google.maps.places.PlaceResult[] | undefined = searchBox.getPlaces();
      if (!places || places.length === 0) {
        return;
      }
      this.parsePlaceResultData(places);
    });
  }

  parsePlaceResultData(places: google.maps.places.PlaceResult[]): void {
    const { location, address, bounds, placeResult } = this.findCorrectAddress(places);

    this.location.emit(location);
    this.placeResult.emit(placeResult);
    this.addLocationInformationCard(placeResult, location);
    this.geocoding({ location, address });

    this.map.fitBounds(bounds);
  }

  findCorrectAddress(
    places: google.maps.places.PlaceResult[],
  ): { location: LocationDto; address: string; bounds: google.maps.LatLngBounds; placeResult: google.maps.places.PlaceResult } {
    const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

    let location!: LocationDto;
    let address!: string;
    let placeResult!: google.maps.places.PlaceResult;

    for (const place of places) {
      if (!place.geometry || !place.geometry.location) {
        continue;
      }

      location = place.geometry.location.toJSON();
      address = place.formatted_address ?? '';
      placeResult = place;

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    }
    return {
      address,
      location,
      bounds,
      placeResult,
    };
  }

  geocoding({ location, address, isMapEvent }: { location: LocationDto; address?: string; isMapEvent?: boolean }): void {
    this.geocoder.geocode({ location, address }).subscribe((response: MapGeocoderResponse) => {
      if (response.results.length === 0) {
        this.onErrorLocation();
      }

      const geocodedInformation: google.maps.GeocoderResult =
        response.results.find(({ types }: google.maps.GeocoderResult) => types.includes('street_address')) ?? response.results[0];

      const address: AddressFromGoogleResult = AddressInformationFromGoogleGeocoderResult(geocodedInformation);

      if (!isMapEvent) {
        this.addressResult.emit(address);
        return;
      }

      this.placeService.getDetails({ placeId: geocodedInformation.place_id }, (placeDetails: google.maps.places.PlaceResult | null) => {
        if (!placeDetails) return;

        this.addLocationInformationCard(placeDetails, location);
        this.addressResult.emit(address);
      });
    });
  }

  mapClickSub(): void {
    this.googleMapComponent.mapClick
      .pipe(
        tap((event: google.maps.MapMouseEvent | google.maps.IconMouseEvent) => {
          const location: LocationDto | null | undefined = event.latLng?.toJSON();
          if (location) {
            this.geocoding({ location, isMapEvent: true });
          }
        }),
      )
      .subscribe();
  }

  addLocationInformationCard(placeResult: google.maps.places.PlaceResult, location: LocationDto): void {
    const div: HTMLDivElement = document.querySelector('.gm-style') as HTMLDivElement;
    this.onRemoveLocationInformationHandler();

    div.insertAdjacentHTML(
      'beforeend',
      `<div class="place-card-handler">
              <div>
                <div>
                  <div class="place-card place-card-large">
                    <div class="place-desc-large">
                      <div class="place-name">${placeResult.name}</div>
                      <div class="address"> ${placeResult.formatted_address} </div>
                    </div>
                    <div class="navigate">
                      <div class="navigate">
                        <a class="navigate-link" href="https://www.google.com/maps?daddr=${location.lat},${location.lng}" target="_blank">
                          <div class="icon navigate-icon"></div>
                          <div class="navigate-text"> Directions </div>
                        </a>
                      </div>
                    </div>
                    <div class="maps-links-box-exp">
                      <div class="location">${location?.lat}, ${location.lng}</div>
                      <div class="google-maps-link">
                        <a href="https://maps.google.com/?q=${location?.lat},${location?.lng}" target="_blank">View larger map</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="close-button"></div>
              </div>
            </div>`,
    );

    const button: HTMLDivElement | null = document.querySelector('.close-button');
    if (button) {
      button.addEventListener('click', () => {
        this.onRemoveLocationInformationHandler();
      });
    }
  }

  onErrorLocation(): void {
    this.onRemoveLocationInformationHandler();
    this.locationError.emit('Data for location not found.');
  }

  onRemoveLocationInformationHandler(): void {
    const handler: HTMLDivElement | null = document.querySelector('.place-card-handler') as HTMLDivElement;
    if (handler) {
      handler.remove();
    }
  }
}
