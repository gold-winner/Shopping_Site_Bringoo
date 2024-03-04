import { CustomerAddressCreateInput } from '../api/auth/data-contracts';

type Keys = 'countryCode' | 'city' | 'streetName' | 'streetNumber' | 'zipCode' | 'state';

export type AddressFromGoogleResult = Pick<CustomerAddressCreateInput, Keys> & { country: string };
