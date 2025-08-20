import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(username: string, password: string): Promise<import("../user/user.entity").User>;
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
}
