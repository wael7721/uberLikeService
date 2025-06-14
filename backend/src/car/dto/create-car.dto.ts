import { IsString, IsInt, MinLength, Min, Max } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @MinLength(3)
  plateNumber: string;

  @IsInt()
  @Min(1)
  @Max(10) // adjust max capacity as needed
  passengerCapacity: number;
}