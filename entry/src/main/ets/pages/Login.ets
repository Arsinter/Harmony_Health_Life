import { User } from '../model/User';
import { UserManager } from '../model/UserManager';
import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { BusinessError } from '@ohos.base';

@Entry
@Component
struct Login {
  @State username: string = '';
  @State password: string = '';
  @State errorMessage: string = '';

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
        Button('登录')
          .width('90%')
          .height(50)
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
          .backgroundColor('#007DFF')
          .borderRadius(8)
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

        // 提示信息
        Text('预设账号：admin/test/user1\n密码：123456')
          .fontSize(14)
          .fontColor('#666666')
          .margin({ top: 40 })
          .textAlign(TextAlign.Center)
      }
      .width('100%')
      .padding({ left: 20, right: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F3F5')
  }

  private handleLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = '请输入用户名和密码';
      return;
    }

    const userManager = UserManager.getInstance();
    if (userManager.login(this.username, this.password)) {
      // 登录成功，跳转到主页
      try {
        router.pushUrl({
          url: 'pages/MainPage',
          params: {
            username: this.username
          }
        }).then(() => {
          promptAction.showToast({ message: '登录成功' });
        }).catch((err: BusinessError) => {
          console.error(`跳转失败: ${err.message}`);
          promptAction.showToast({ message: '跳转失败，请重试' });
        });
      } catch (err) {
        console.error(`路由错误: ${err.message}`);
        promptAction.showToast({ message: '系统错误，请重试' });
      }
    } else {
      this.errorMessage = '用户名或密码错误';
    }
  }
} 