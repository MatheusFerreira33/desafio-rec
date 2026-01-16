import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Telephone } from '../entities/telephone.entity';

@ObjectType()
export class UserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Telephone])
  telephones: Telephone[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}