import { Iso2Enum } from '../api/auth/data-contracts';
import { AlphabeticallySort } from '../helpers/alphabetically-sort';

export const ISO2_CODES: string[] = Object.values(Iso2Enum).sort(AlphabeticallySort);
