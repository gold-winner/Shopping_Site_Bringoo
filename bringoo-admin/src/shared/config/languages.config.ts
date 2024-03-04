import { LangCodeEnum } from '../api/auth/data-contracts';
import { I18NInputKeys } from '../types/i18n-input-keys.type';

export const LANGUAGES_CONFIG: I18NInputKeys[] = Object.keys(LangCodeEnum).filter((value: string) => value !== 'ALL') as I18NInputKeys[];
