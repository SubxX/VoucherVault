export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  ref: string;
  referralCode?: string;
  referredBy?: string;
  mobile: string;
  dateOfBirth?: Date;
  currencyCode: string;
  countryCode: string;
  role?: string;
}
