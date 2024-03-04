import { Iso3Enum } from '../api/auth/data-contracts';
import { AlphabeticallySort } from '../helpers/alphabetically-sort';

export const ISO3_CODES: string[] = Object.values(Iso3Enum).sort(AlphabeticallySort);
