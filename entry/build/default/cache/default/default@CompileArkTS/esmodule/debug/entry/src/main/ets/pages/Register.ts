if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Register_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    errorMessage?: string;
    isLoading?: boolean;
}
import router from "@ohos:router";
import { ApiService } from "@bundle:com.example.healthy_life/entry/ets/services/ApiService";
class Register extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Register_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
    }
    updateStateVars(params: Register_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
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
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
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
            Text.create('注册账号');
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
            // 注册表单
            Column.create();
            // 注册表单
            Column.width('100%');
            // 注册表单
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
            TextInput.margin({ bottom: 20 });
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
            // 确认密码输入框
            TextInput.create({ placeholder: '请确认密码' });
            // 确认密码输入框
            TextInput.width('90%');
            // 确认密码输入框
            TextInput.height(50);
            // 确认密码输入框
            TextInput.margin({ bottom: 30 });
            // 确认密码输入框
            TextInput.backgroundColor(Color.White);
            // 确认密码输入框
            TextInput.borderRadius(8);
            // 确认密码输入框
            TextInput.padding({ left: 16, right: 16 });
            // 确认密码输入框
            TextInput.placeholderColor('#999999');
            // 确认密码输入框
            TextInput.placeholderFont({ size: 16 });
            // 确认密码输入框
            TextInput.fontSize(16);
            // 确认密码输入框
            TextInput.type(InputType.Password);
            // 确认密码输入框
            TextInput.onChange((value: string) => {
                this.confirmPassword = value;
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
            // 注册按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册按钮
            Button.createWithLabel(this.isLoading ? '注册中...' : '注册');
            // 注册按钮
            Button.width('90%');
            // 注册按钮
            Button.height(50);
            // 注册按钮
            Button.fontSize(18);
            // 注册按钮
            Button.fontWeight(FontWeight.Medium);
            // 注册按钮
            Button.backgroundColor('#007DFF');
            // 注册按钮
            Button.borderRadius(8);
            // 注册按钮
            Button.enabled(!this.isLoading);
            // 注册按钮
            Button.onClick(() => {
                this.handleRegister();
            });
        }, Button);
        // 注册按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回登录链接
            Text.create('已有账号？点击登录');
            // 返回登录链接
            Text.fontSize(16);
            // 返回登录链接
            Text.fontColor('#007DFF');
            // 返回登录链接
            Text.margin({ top: 20 });
            // 返回登录链接
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        // 返回登录链接
        Text.pop();
        // 注册表单
        Column.pop();
        Column.pop();
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
            }
            else {
                this.errorMessage = '注册失败，请稍后重试';
            }
        }
        catch (err) {
            console.error(`注册错误: ${err}`);
            this.errorMessage = '注册失败，请稍后重试';
        }
        finally {
            this.isLoading = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Register";
    }
}
registerNamedRoute(() => new Register(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/Register", pageFullPath: "entry/src/main/ets/pages/Register", integratedHsp: "false", moduleType: "followWithHap" });
