interface User {
  id: number;
  user_name: string;
  user_password: string;
  role: string;
  id_info: number;
  height: number;
  weight_: number;
  desired_weight: number;
}

interface UserDto {
  user_name: string;
  user_password: string;
  role: string;
  height: number;
  weight_: number;
  desired_weight: number;
}
