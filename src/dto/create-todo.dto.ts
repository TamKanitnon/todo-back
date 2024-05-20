import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @MaxLength(15)
    title: string;

    @IsNotEmpty()
    description: string;
}