import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(username: string, password: string) {
    const user = this.userRepository.create({ username, password });
    return await this.userRepository.save(user);
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user || user.password !== password) {
      throw new Error('Credenciales inválidas');
    }
    return { access_token: 'mock_token' };
  }
}