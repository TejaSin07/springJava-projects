export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}