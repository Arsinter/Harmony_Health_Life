import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { BusinessError } from '@ohos.base';
import { ApiService } from '../services/ApiService';

@Entry
@Component
struct Login {
  @State username: string = '';
  @State password: string = '';
  @State errorMessage: string = '';
  @State isLoading: boolean = false;

  build() {
    Column() {
      // 顶部标题
      Text('健康管理')
        .fontSize(32)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 80, bottom: 60 })
        .fontColor('#182431')

      // 登录表单
      Column() {
        // 用户名输入框
        TextInput({ placeholder: '请输入用户名' })
          .width('90%')
          .height(50)
          .margin({ bottom: 20 })
          .backgroundColor(Color.White)
          .borderRadius(8)
          .padding({ left: 16, right: 16 })
          .placeholderColor('#999999')
          .placeholderFont({ size: 16 })
          .fontSize(16)
          .onChange((value: string) => {
            this.username = value;
          })

        // 密码输入框
        TextInput({ placeholder: '请输入密码' })
          .width('90%')
          .height(50)
          .margin({ bottom: 30 })
          .backgroundColor(Color.White)
          .borderRadius(8)
          .padding({ left: 16, right: 16 })
          .placeholderColor('#999999')
          .placeholderFont({ size: 16 })
          .fontSize(16)
          .type(InputType.Password)
          .onChange((value: string) => {
            this.password = value;
          })

        // 错误信息
        if (this.errorMessage) {
          Text(this.errorMessage)
            .fontSize(14)
            .fontColor('#E92F4F')
            .margin({ bottom: 20 })
        }

        // 登录按钮
        Button(this.isLoading ? '登录中...' : '登录')
          .width('90%')
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .borderRadius(8)
          .enabled(!this.isLoading)
          .onClick(() => {
            this.handleLogin();
          })

        // 注册链接
        Text('还没有账号？点击注册')
          .fontSize(16)
          .fontColor('#007DFF')
          .margin({ top: 20 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/Register' });
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }

  private async handleLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = '请输入用户名和密码';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const apiService = ApiService.getInstance();
      const success = await apiService.login(this.username, this.password);

      if (success) {
        // 登录成功，跳转到主页
        try {
          await router.pushUrl({
            url: 'pages/MainPage',
            params: {
              username: this.username
            }
          });
          promptAction.showToast({ message: '登录成功' });
        } catch (err) {
          console.error(`跳转失败: ${err.message}`);
          promptAction.showToast({ message: '跳转失败，请重试' });
        }
      } else {
        this.errorMessage = '用户名或密码错误';
      }
    } catch (err) {
      console.error(`登录错误: ${err}`);
      this.errorMessage = '登录失败，请稍后重试';
    } finally {
      this.isLoading = false;
    }
  }
} 