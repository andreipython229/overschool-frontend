export type userInitialT = {
  email: string;
  first_name: string;
  last_name: string;
};

export type UserT = {
  auth: boolean;
  user: userInitialT;
  phone_number: string;
  avatar: string | null;
  city: string;
  sex: string;
  permission: number;
  aboutMySelf: string;
};
