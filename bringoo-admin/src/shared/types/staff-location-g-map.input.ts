import { LocationDto } from '../api/auth/data-contracts';

export type StaffLocationGMapInput = {
  staffId: string;
  deviceId: string;
  staffNumber: string;
  firstName: string;
  lastName: string;
  staffRole: string;
  updateDateTime: string;
  position: LocationDto;
};
