export type UserList = User[];

export interface User {
  name: string;
  age: number;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  occupation: string;
  hobbies: string[];
  id: string;
}

export interface Address {
  street: string;
  city: string;
  zip: string;
}
