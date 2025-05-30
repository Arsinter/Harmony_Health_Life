if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Login_Params {
    username?: string;
    password?: string;
    errorMessage?: string;
}
import { UserManager } from "@bundle:com.example.healthy_life/entry/ets/model/UserManager";
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import type { BusinessError } from "@ohos:base";
class Login extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Login_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
    }
    updateStateVars(params: Login_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题
            Text.create('健康管理');
            // 顶部标题
            Text.fontSize(32);
            // 顶部标题
            Text.fontWeight(FontWeight.Bold);
            // 顶部标题
            Text.margin({ top: 80, bottom: 60 });
            // 顶部标题
            Text.fontColor('#182431');
        }, Text);
        // 顶部标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录表单
            Column.create();
            // 登录表单
            Column.width('100%');
            // 登录表单
            Column.padding({ left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名输入框
            TextInput.create({ placeholder: '请输入用户名' });
            // 用户名输入框
            TextInput.width('90%');
            // 用户名输入框
            TextInput.height(50);
            // 用户名输入框
            TextInput.margin({ bottom: 20 });
            // 用户名输入框
            TextInput.backgroundColor(Color.White);
            // 用户名输入框
            TextInput.borderRadius(8);
            // 用户名输入框
            TextInput.padding({ left: 16, right: 16 });
            // 用户名输入框
            TextInput.placeholderColor('#999999');
            // 用户名输入框
            TextInput.placeholderFont({ size: 16 });
            // 用户名输入框
            TextInput.fontSize(16);
            // 用户名输入框
            TextInput.onChange((value: string) => {
                this.username = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 密码输入框
            TextInput.create({ placeholder: '请输入密码' });
            // 密码输入框
            TextInput.width('90%');
            // 密码输入框
            TextInput.height(50);
            // 密码输入框
            TextInput.margin({ bottom: 30 });
            // 密码输入框
            TextInput.backgroundColor(Color.White);
            // 密码输入框
            TextInput.borderRadius(8);
            // 密码输入框
            TextInput.padding({ left: 16, right: 16 });
            // 密码输入框
            TextInput.placeholderColor('#999999');
            // 密码输入框
            TextInput.placeholderFont({ size: 16 });
            // 密码输入框
            TextInput.fontSize(16);
            // 密码输入框
            TextInput.type(InputType.Password);
            // 密码输入框
            TextInput.onChange((value: string) => {
                this.password = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误信息
            if (this.errorMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(14);
                        Text.fontColor('#E92F4F');
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                });
            }
            // 登录按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录按钮
            Button.createWithLabel('登录');
            // 登录按钮
            Button.width('90%');
            // 登录按钮
            Button.height(50);
            // 登录按钮
            Button.fontSize(18);
            // 登录按钮
            Button.fontWeight(FontWeight.Medium);
            // 登录按钮
            Button.backgroundColor('#007DFF');
            // 登录按钮
            Button.borderRadius(8);
            // 登录按钮
            Button.onClick(() => {
                this.handleLogin();
            });
        }, Button);
        // 登录按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册链接
            Text.create('还没有账号？点击注册');
            // 注册链接
            Text.fontSize(16);
            // 注册链接
            Text.fontColor('#007DFF');
            // 注册链接
            Text.margin({ top: 20 });
            // 注册链接
            Text.onClick(() => {
                router.pushUrl({ url: 'pages/Register' });
            });
        }, Text);
        // 注册链接
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 提示信息
            Text.create('预设账号：admin/test/user1\n密码：123456');
            // 提示信息
            Text.fontSize(14);
            // 提示信息
            Text.fontColor('#666666');
            // 提示信息
            Text.margin({ top: 40 });
            // 提示信息
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 提示信息
        Text.pop();
        // 登录表单
        Column.pop();
        Column.pop();
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
            }
            catch (err) {
                console.error(`路由错误: ${err.message}`);
                promptAction.showToast({ message: '系统错误，请重试' });
            }
        }
        else {
            this.errorMessage = '用户名或密码错误';
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Login";
    }
}
registerNamedRoute(() => new Login(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/Login", pageFullPath: "entry/src/main/ets/pages/Login", integratedHsp: "false", moduleType: "followWithHap" });
