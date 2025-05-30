import { User } from '../model/User';
import { UserManager } from '../model/UserManager';
import router from '@ohos.router';

@Entry
@Component
struct Register {
  @State username: string = '';
  @State password: string = '';
  @State confirmPassword: string = '';
  @State email: string = '';
  @State errorMessage: string = '';

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

        // 邮箱输入框
        TextInput({ placeholder: '请输入邮箱' })
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
            this.email = value;
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
        Button('注册')
          .width('90%')
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .borderRadius(8)
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

  private handleRegister() {
    if (!this.username || !this.password || !this.confirmPassword || !this.email) {
      this.errorMessage = '请填写所有必填项';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = '两次输入的密码不一致';
      return;
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = '请输入有效的邮箱地址';
      return;
    }

    const userManager = UserManager.getInstance();
    if (userManager.isUserExists(this.username)) {
      this.errorMessage = '用户名已存在';
      return;
    }

    if (userManager.register(this.username, this.password, this.email)) {
      // 注册成功，返回登录页面
      router.back();
    } else {
      this.errorMessage = '注册失败，请稍后重试';
    }
  }
} 