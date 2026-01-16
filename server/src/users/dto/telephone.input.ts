import { InputType, Field } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

@InputType()
export class TelephoneInput {
  @Field()
  @IsString()
  @Length(2, 3)
  areaCode: string;

  @Field()
  @IsString()
  @Length(8, 9)
  number: string;
}