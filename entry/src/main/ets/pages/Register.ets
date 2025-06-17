import router from '@ohos.router';
import { ApiService } from '../services/ApiService';

@Entry
@Component
struct Register {
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State errorMessage: string = '';
  @State isLoading: boolean = false;

  build() {
    Column() {
      // 顶部标题
      Text('注册账号')
        .fontSize(32)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 80, bottom: 60 })
        .fontColor('#182431')

      // 注册表单
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
          .margin({ bottom: 20 })
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

        // 确认密码输入框
        TextInput({ placeholder: '请确认密码' })
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
            this.confirmPassword = value;
          })

        // 错误信息
        if (this.errorMessage) {
          Text(this.errorMessage)
            .fontSize(14)
            .fontColor('#E92F4F')
            .margin({ bottom: 20 })
        }

        // 注册按钮
        Button(this.isLoading ? '注册中...' : '注册')
          .width('90%')
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .borderRadius(8)
          .enabled(!this.isLoading)
          .onClick(() => {
            this.handleRegister();
          })

        // 返回登录链接
        Text('已有账号？点击登录')
          .fontSize(16)
          .fontColor('#007DFF')
          .margin({ top: 20 })
          .onClick(() => {
            router.back();
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }

  private async handleRegister() {
    if (!this.username || !this.password || !this.confirmPassword) {
      this.errorMessage = '请填写所有必填项';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = '两次输入的密码不一致';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const apiService = ApiService.getInstance();
      const success = await apiService.register(this.username, this.password);

      if (success) {
        // 注册成功，返回登录页面
        router.back();
      } else {
        this.errorMessage = '注册失败，请稍后重试';
      }
    } catch (err) {
      console.error(`注册错误: ${err}`);
      this.errorMessage = '注册失败，请稍后重试';
    } finally {
      this.isLoading = false;
    }
  }
} 