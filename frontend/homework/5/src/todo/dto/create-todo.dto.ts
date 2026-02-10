import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty({ message: "Title is required"})
    @MinLength(3, { message: "Title must be at least 3 characters long"})
    @MaxLength(100, { message: "Title must not exceed 100 characters"})
    title : String;

    @IsString()
    @IsOptional()
    @MaxLength(500, { message: "Description must not exceed 500 characters"})
    description?: String;

}