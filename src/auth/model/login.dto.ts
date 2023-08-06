import { UserCompleteDTO } from "src/user/model/user.dto";

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  id: string;
  token: string;
  user: UserCompleteDTO;
}