import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  address!: string;

  @IsEmail()
  contactEmail!: string;

  @IsNotEmpty()
  contactPhone!: string;
}
