import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";

@Injectable({
  providedIn: "root",
})
export class ImageStorageServersService extends ApiService {
  protected url: string = "https://docs.dev.de.bringooapi.com";
  /**
   * No description
   *
   * @tags version
   * @name AppControllerGetImageStorageServers
   * @request GET:/image-storage-servers
   * @response `200` `(string)[]`
   */
  getImageStorageServers = (): Observable<string[]> => this.request<string[], any>(`/image-storage-servers`, "GET");
}
