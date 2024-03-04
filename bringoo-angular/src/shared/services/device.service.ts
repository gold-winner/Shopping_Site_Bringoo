import { Injectable } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private deviceDetectorService: DeviceDetectorService) {}

  private deviceId: string = this.deviceIdGenerator();

  getDeviceInfo(): Record<string, string> {
    const deviceInfo: DeviceInfo = this.deviceDetectorService.getDeviceInfo();

    return {
      deviceId: this.deviceId,
      deviceType: deviceInfo.deviceType,
      deviceName: deviceInfo.browser,
      deviceBrand: '',
      deviceOs: deviceInfo.os,
    };
  }

  private deviceIdGenerator(): string {
    const navigator_info: Navigator = window.navigator;
    const screen_info: Screen = window.screen;
    let uid: string = navigator_info.mimeTypes.length.toString();
    uid += navigator_info.userAgent.replace(/\D+/g, '');
    uid += navigator_info.plugins.length;
    uid += screen_info.height || 0;
    uid += screen_info.width || 0;
    uid += screen_info.pixelDepth || 0;
    return uid;
  }
}
