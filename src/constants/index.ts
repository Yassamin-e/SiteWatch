export enum Usertype {
  GENERAL_DIRECTOR = 'GENERAL_DIRECTOR',
  ADMIN = 'ADMIN',
  PROJECT_MANAGER = 'PROJECT_MANAGER',
}

export interface UserPayload {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  userType: string;
  picture: string;
  access_token: string;
  generalDirectorID: number;
}
