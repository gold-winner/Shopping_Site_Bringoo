import { LocationDto, StaffRoleEnum } from '../api/auth/data-contracts';

export type StaffMarkerOptionsType = {
  map: google.maps.Map;
  title: string;
  location: LocationDto;
  firstName: string;
  lastName: string;
  staffId: string;
  role: StaffRoleEnum;
  deviceId: string;
  updateTime: Date;
};
