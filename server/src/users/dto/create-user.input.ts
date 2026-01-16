import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TelephoneInput } from './telephone.input';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @MinLength(3)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field(() => [TelephoneInput])
  @ValidateNested({ each: true })
  @Type(() => TelephoneInput)
  telephones: TelephoneInput[];
}