import { Injectable } from '@nestjs/common';

export type Role = 'INTERN' | 'ENGINEER' | 'ADMIN';

export interface User {
  name: string;
  email: string;
  role: Role;
}

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

  findAll(role?: Role) {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(user: User) {
    const newUserId = [...this.users].sort((a, b) => b.id - a.id)[0].id + 1;
    const newUser = {
      id: newUserId,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: Partial<User>) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
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
