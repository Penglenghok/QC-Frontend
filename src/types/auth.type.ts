export type Credentials = {
    email: string;
    password: string;
  };
  
  export type userResponse = {
    user: IUser;
    token: string;
  };
  
  export type IUser = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };