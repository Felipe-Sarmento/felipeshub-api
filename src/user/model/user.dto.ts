
export interface UserDataDTO {
  name?: string;
  email: string;
  password: string;
}

export interface UserCompleteDTO {
  id: string;
  name?: string;
  email: string;
  createdAt: Date;
}