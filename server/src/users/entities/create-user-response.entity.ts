import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateUserResponse {
  @Field(() => ID)
  id: string;

  @Field({ name: 'created_at' })
  createdAt: Date;

  @Field({ name: 'modified_at' })
  updatedAt: Date;
}