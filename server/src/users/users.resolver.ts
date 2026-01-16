import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResponse } from './dto/user-response.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserResponse)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserResponse], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserResponse, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserResponse)
  updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => UserResponse)
  removeUser(@Args('id') id: string) {
    return this.usersService.remove(id);
  }

  @Query(() => [UserResponse], { name: 'searchUsers' })
  searchByName(@Args('name') name: string) {
    return this.usersService.searchByName(name);
  }
}