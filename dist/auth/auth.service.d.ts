import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    register(username: string, password: string): Promise<User>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
