import { uuid as uuidV4 } from './uuid';

export function RouteNumberGenerator(): string {
  const uuid: string = uuidV4();
  return `R${uuid.replace(/-/g, '').slice(0, 8).toUpperCase()}`;
}
