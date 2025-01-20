import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Sam Amadi',
      email: 'sam@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Sam Alabi',
      email: 'sam@gmail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Sam Audu',
      email: 'sam@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Sam Awilo',
      email: 'sam@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: CreateUserDto['role']) {
    if (role) {
      const roleArr = this.users.filter((user) => user.role === role);
      if (roleArr.length > 1)
        throw new NotFoundException('User role not found');
      return roleArr;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUserId = [...this.users].sort((a, b) => b.id - a.id)[0].id + 1;
    const newUser = {
      id: newUserId,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateuserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);

    return `User ${id} Removed`;
  }
}
