import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import { ImageDto } from "./data-contracts";

@Injectable({
  providedIn: "root",
})
export class UploadService extends ApiService {
  protected url: string = "https://docs.dev.de.bringooapi.com";
  /**
   * No description
   *
   * @tags upload
   * @name UploadControllerUploadImage
   * @request POST:/upload
   * @response `201` `ImageDto`
   */
  uploadImage = (data: { file: File; path: string; ext?: "JPG" | "PNG" | "WEBP" }): Observable<ImageDto> =>
    this.request<ImageDto, { file: File; path: string; ext?: "JPG" | "PNG" | "WEBP" }>(`/upload`, "POST", data);
  /**
   * No description
   *
   * @tags upload
   * @name UploadControllerUploadFile
   * @request POST:/upload/file
   * @response `201` `string`
   */
  uploadFile = (data: { file: File; path: string; name: string }): Observable<string> =>
    this.request<string, { file: File; path: string; name: string }>(`/upload/file`, "POST", data);
  /**
   * No description
   *
   * @tags upload
   * @name UploadControllerUploadReceipt
   * @request POST:/upload/receipt
   * @response `201` `ImageDto`
   */
  uploadReceipt = (data: { file: File }): Observable<ImageDto> =>
    this.request<ImageDto, { file: File }>(`/upload/receipt`, "POST", data);
}
