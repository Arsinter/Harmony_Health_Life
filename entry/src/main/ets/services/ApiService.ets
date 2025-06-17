import http from '@ohos.net.http';

export class ApiService {
  private static instance: ApiService;
  private baseUrl: string = 'http://10.68.5.99:5000/api';

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  // 用户注册
  public async register(username: string, password: string): Promise<boolean> {
    try {
      console.info(`开始注册请求: ${username}`);
      let httpRequest = http.createHttp();
      let response = await httpRequest.request(
        this.baseUrl + "/users/register",
        {
          method: http.RequestMethod.POST,
          header: {
            'Content-Type': 'application/json'
          },
          extraData: JSON.stringify({
            username: username,
            password: password
          })
        }
      );
      
      console.info(`注册响应状态码: ${response.responseCode}`);
      console.info(`注册响应内容: ${response.result}`);
      
      if (response.responseCode === 201) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(`注册请求失败: ${JSON.stringify(err)}`);
      return false;
    }
  }

  // 用户登录
  public async login(username: string, password: string): Promise<boolean> {
    try {
      console.info(`开始登录请求: ${username}`);
      let httpRequest = http.createHttp();
      let response = await httpRequest.request(
        this.baseUrl + "/users/login",
        {
          method: http.RequestMethod.POST,
          header: {
            'Content-Type': 'application/json'
          },
          extraData: JSON.stringify({
            username: username,
            password: password
          })
        }
      );
      
      console.info(`登录响应状态码: ${response.responseCode}`);
      console.info(`登录响应内容: ${response.result}`);
      
      if (response.responseCode === 200) {
        return true;
      }
      return false;
    } catch (err) {
      console.error(`登录请求失败: ${JSON.stringify(err)}`);
      return false;
    }
  }
} 