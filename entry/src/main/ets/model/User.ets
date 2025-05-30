export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  createTime: Date;

  constructor(username: string, password: string, email: string) {
    this.id = this.generateId();
    this.username = username;
    this.password = password;
    this.email = email;
    this.createTime = new Date();
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
} 