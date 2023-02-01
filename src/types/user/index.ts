export interface User {
  id: string | undefined;
  name: string | undefined;
  phone: string | undefined;
  email: string | undefined;
  genre: string | undefined;
  password: string | undefined;
  birthday: Date | undefined;
  weight: number | undefined;
  height: number | undefined;
  goal: string | undefined;
  foodRestrictions: string[];
}
