export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
  password?: string;
}
