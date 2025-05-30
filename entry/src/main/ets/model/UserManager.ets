import { User } from './User';

export class UserManager {
  private static instance: UserManager;
  private users: Map<string, User> = new Map();

  private constructor() {
    // 预设账号
    this.users.set('admin', new User('admin', '123456', 'admin@example.com'));
    this.users.set('test', new User('test', '123456', 'test@example.com'));
    this.users.set('user1', new User('user1', '123456', 'user1@example.com'));
  }

  public static getInstance(): UserManager {
    if (!UserManager.instance) {
      UserManager.instance = new UserManager();
    }
    return UserManager.instance;
  }

  public login(username: string, password: string): boolean {
    const user = this.users.get(username);
    if (user && user.password === password) {
      return true;
    }
    return false;
  }

  public register(username: string, password: string, email: string): boolean {
    if (this.users.has(username)) {
      return false;
    }
    const user = new User(username, password, email);
    this.users.set(username, user);
    return true;
  }

  public isUserExists(username: string): boolean {
    return this.users.has(username);
  }
} 