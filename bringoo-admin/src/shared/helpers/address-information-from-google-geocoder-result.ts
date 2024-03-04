import GeocoderResult = google.maps.GeocoderResult;
import GeocoderAddressComponent = google.maps.GeocoderAddressComponent;
import { AddressFromGoogleResult } from '../types/address-from-gogle-result.type';

export function AddressInformationFromGoogleGeocoderResult(result: GeocoderResult): AddressFromGoogleResult {
  const postalCode: string =
    result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('postal_code'))?.short_name ?? '';

  const countryCode: string =
    result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('country'))?.short_name ?? '';
  const country: string = result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('country'))?.long_name ?? '';

  const city: string = result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('locality'))?.long_name ?? '';

  const street: string = result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('route'))?.long_name ?? '';

  const state: string =
    result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('administrative_area_level_2'))?.long_name ??
    result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('administrative_area_level_1'))?.long_name ??
    '';

  const streetNumber: string =
    result.address_components.find((v: GeocoderAddressComponent) => v.types.includes('street_number'))?.long_name ?? '';

  return {
    countryCode: countryCode.toUpperCase(),
    city,
    streetName: street,
    streetNumber,
    zipCode: postalCode,
    state,
    country,
  };
}
