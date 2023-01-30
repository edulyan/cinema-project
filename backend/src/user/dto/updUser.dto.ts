import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdUserDto {
  @IsNotEmpty({
    message: 'Firstname is required',
  })
  @IsString({
    message: 'Firstname must be a string',
  })
  firstName?: string;

  @IsNotEmpty({
    message: 'Lastname is required',
  })
  @IsString({
    message: 'Lastname must be a string',
  })
  lastName?: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail(
    { require_display_name: true },
    {
      message: 'Invalid email format',
    },
  )
  email?: string;
}
