import { IsNotEmpty, IsEnum, IsISO8601, IsOptional, Length, IsNumber, Min } from "class-validator";

export class CreateTransactionDto {
  @IsEnum(['income', 'expense'], { message: "The type must be 'income' or 'expense'." })
  type!: 'income' | 'expense';

  @IsNotEmpty()
  @Length(1, 50)
  category!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: "The amount must be a valid number." })
  @Min(1, { message: "The amount must be greater than or equal to 1." })
  amount!: number;

  @IsISO8601({}, { message: "The date must be in ISO 8601 format." })
  date!: string;

  @IsOptional()
  @Length(0, 255)
  note?: string;
}