import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Image } from 'angular-responsive-carousel';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { BehaviorSubject, Observable, Observer, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ImageDto } from '../../api/docs/data-contracts';
import { UploadService } from '../../api/docs/upload.service';
import { ChangeImageMiniature, ImageMiniature } from '../../helpers/image.miniature';

@UntilDestroy()
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  host: { class: 'd-block position-relative' },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor, OnInit {
  fileList: BehaviorSubject<NzUploadFile[]> = new BehaviorSubject<NzUploadFile[]>([]);
  fileList$: Observable<NzUploadFile[]> = this.fileList.asObservable();
  uploadError: Subject<string | null> = new Subject<string | null>();
  uploadError$: Observable<string | null> = this.uploadError.asObservable();
  isValid: boolean = true;

  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() path!: string;
  @Input() multiple: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() uploadType: 'image' | 'receipt' = 'image';
  @Input() isValidateImage: boolean = false;
  @Input() imageValidator: 'rect' | 'squire' | null = null;

  constructor(private http: HttpClient, private service: UploadService, private nzImageService: NzImageService) {}

  ngOnInit(): void {
    this.service.errors$.subscribe(() => (this.isValid = false));
    this.fileList
      .pipe(
        untilDestroyed(this),
        map((value: NzUploadFile[]) => value.map((v: NzUploadFile) => v.url || '')),
      )
      .subscribe((v: string[]) => (this.multiple ? this.onChange(v) : this.onChange(v[0])));
  }

  beforeUpload = (file: NzUploadFile): boolean | Observable<boolean> => {
    return new Observable((observer: Observer<boolean>) => {
      if (!file.type?.includes('image')) {
        observer.next(true);
        observer.complete();
        return;
      }

      const fileReader: FileReader = new FileReader();
      fileReader.readAsDataURL((file as unknown) as File);

      fileReader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
        const image: HTMLImageElement = new Image() as HTMLImageElement;

        if (!e.target?.result) {
          observer.next(false);
          this.uploadError.next('Target file not found.');
          observer.complete();
          return;
        }

        image.src = e.target.result instanceof ArrayBuffer ? e.target.result[Symbol.toStringTag] : e.target.result;

        image.addEventListener('load', () => {
          if (!this.isValidateImage) {
            observer.next(true);
            observer.complete();
            return;
          }

          if (this.isValidImage(image.width, image.height)) {
            observer.next(true);
          }

          image.remove();
          if (image.removeAllListeners) {
            image.removeAllListeners();
          }
          if (fileReader.removeAllListeners) {
            fileReader.removeAllListeners();
          }
          observer.complete();
        });
      });
    });
  };

  uploadFile = (item: NzUploadXHRArgs): Subscription => {
    const formData: any = new FormData();
    formData.append('file', item.postFile);
    formData.append('path', this.path);
    // Always return a `Subscription` object, nz-upload will automatically unsubscribe at the appropriate time

    return this.service[this.uploadType === 'image' ? 'uploadImage' : 'uploadReceipt'](formData).subscribe(
      (event: ImageDto) => {
        const file: NzUploadFile = {
          uid: (this.fileList.getValue().length * -1).toString(),
          url: event.url,
          thumbUrl: event.thumbs[5],
          name: item.file.name,
        };
        if (this.multiple) {
          this.fileList.next([...this.fileList.getValue(), file]);
        } else {
          this.fileList.next([file]);
        }
      },
      (err: any) => {
        if (item.onError) {
          item.onError(err, item.file);
        }
      },
    );
  };

  onRemove = (delFile: NzUploadFile): boolean | Observable<boolean> => {
    const newFileList: NzUploadFile[] = this.fileList.getValue().filter((file: NzUploadFile) => file.url !== delFile.url);
    this.fileList.next(newFileList);
    return true;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange(_: any): void {}

  writeValue(value: string | string[]): void {
    if (value) {
      if (!Array.isArray(value)) {
        this.fileList.next([
          {
            uid: '0',
            url: value,
            thumbUrl: ChangeImageMiniature(value, 200),
            name: value.split('/').pop() ?? '',
          },
        ]);
      } else {
        this.fileList.next(
          value.map(
            (v: string, index: number): NzUploadFile => ({
              ...(v.includes('origin') && { thumbUrl: ImageMiniature(v, 50) }),
              uid: (index * -1).toString(),
              url: v,
              name: v.split('/').pop() ?? '',
            }),
          ),
        );
      }
    } else {
      this.fileList.next([]);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {}

  onDrop(event: CdkDragDrop<NzUploadFile[]>): void {
    const listArray: NzUploadFile[] = this.fileList.getValue();
    moveItemInArray(listArray, event.previousIndex, event.currentIndex);
    this.fileList.next(listArray);
  }

  onPreview(originalUrl?: string): void {
    if (!originalUrl) {
      return;
    }
    this.nzImageService.preview(
      [
        {
          src: originalUrl,
        },
      ],
      { nzZoom: 1, nzRotate: 0 },
    );
  }

  isValidImage(width: number, height: number): boolean {
    switch (this.imageValidator) {
      case 'squire': {
        const isValid: boolean = width / height === 1;
        this.uploadError.next(isValid ? null : 'Incorrect aspect ratio. The picture should be square.');
        return isValid;
      }
      case 'rect': {
        const isValid: boolean = width > height;
        this.uploadError.next(isValid ? null : 'Incorrect aspect ratio. The picture should be rect.');
        return isValid;
      }
      default: {
        this.uploadError.next('Wrong validator type.');
        return false;
      }
    }
  }
}
