if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskClock_Params {
    confirm?: Function;
    cancel?: Function;
    showButton?: boolean;
}
interface TaskBaseInfo_Params {
    taskName?: string | Resource;
}
interface TaskDetailDialog_Params {
    controller?: CustomDialogController;
    currentTask?: TaskInfo;
    showButton?: boolean;
    dialogCallBack?: CustomDialogCallback;
    CustomTaskTable?;
    customTaskInfo?: TaskData[];
    customtaskname?: string;
}
import type { CustomDialogCallback } from './CustomDialogView';
import type TaskInfo from '../../viewmodel/TaskInfo';
import { TaskMapById } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { GlobalContext } from "@bundle:com.example.healthy_life/entry/ets/common/utils/GlobalContext";
import CustomTaskApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/CustomTaskApi";
import TaskData from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskData";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
function __Text__textStyle(): void {
    Text.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.fontFamily({ "id": 16777222, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__taskTextStyle(): void {
    Text.fontColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
    Text.width('100%');
}
export class TaskDetailDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new CustomDialogController({
            builder: ''
        }, this);
        this.__currentTask = this.initializeConsume("currentTask", "currentTask");
        this.__showButton = new ObservedPropertySimplePU(true, this, "showButton");
        this.__dialogCallBack = this.initializeConsume("dialogCallBack", "dialogCallBack");
        this.CustomTaskTable = new CustomTaskApi(() => {
        });
        this.__customTaskInfo = new ObservedPropertyObjectPU([], this, "customTaskInfo");
        this.__customtaskname = new ObservedPropertySimplePU('', this, "customtaskname");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskDetailDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.showButton !== undefined) {
            this.showButton = params.showButton;
        }
        if (params.CustomTaskTable !== undefined) {
            this.CustomTaskTable = params.CustomTaskTable;
        }
        if (params.customTaskInfo !== undefined) {
            this.customTaskInfo = params.customTaskInfo;
        }
        if (params.customtaskname !== undefined) {
            this.customtaskname = params.customtaskname;
        }
    }
    updateStateVars(params: TaskDetailDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTask.purgeDependencyOnElmtId(rmElmtId);
        this.__showButton.purgeDependencyOnElmtId(rmElmtId);
        this.__dialogCallBack.purgeDependencyOnElmtId(rmElmtId);
        this.__customTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customtaskname.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTask.aboutToBeDeleted();
        this.__showButton.aboutToBeDeleted();
        this.__dialogCallBack.aboutToBeDeleted();
        this.__customTaskInfo.aboutToBeDeleted();
        this.__customtaskname.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private __currentTask: ObservedPropertyAbstractPU<TaskInfo>;
    get currentTask() {
        return this.__currentTask.get();
    }
    set currentTask(newValue: TaskInfo) {
        this.__currentTask.set(newValue);
    }
    private __showButton: ObservedPropertySimplePU<boolean>;
    get showButton() {
        return this.__showButton.get();
    }
    set showButton(newValue: boolean) {
        this.__showButton.set(newValue);
    }
    private __dialogCallBack: ObservedPropertyAbstractPU<CustomDialogCallback>;
    get dialogCallBack() {
        return this.__dialogCallBack.get();
    }
    set dialogCallBack(newValue: CustomDialogCallback) {
        this.__dialogCallBack.set(newValue);
    }
    /*新增，读数据库获得用户自定义数据*/
    private CustomTaskTable;
    private __customTaskInfo: ObservedPropertyObjectPU<TaskData[]>;
    get customTaskInfo() {
        return this.__customTaskInfo.get();
    }
    set customTaskInfo(newValue: TaskData[]) {
        this.__customTaskInfo.set(newValue);
    }
    private __customtaskname: ObservedPropertySimplePU<string>;
    get customtaskname() {
        return this.__customtaskname.get();
    }
    set customtaskname(newValue: string) {
        this.__customtaskname.set(newValue);
    }
    async aboutToAppear() {
        //数据库中取出用户自定义的数据
        this.CustomTaskTable.getRdbStore(() => {
            this.CustomTaskTable.query(8, (result: TaskData[]) => {
                if (result && result.length > 0) {
                    this.customTaskInfo.push(result[0]);
                    this.customtaskname = this.customTaskInfo[0].name;
                    Logger.info('taskdetaildialogxxx', `${this.customTaskInfo[0].name}`);
                }
                else {
                    // 如果没有查询到数据，插入新数据
                    let newCustomInfo = new TaskData();
                    this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
                        newCustomInfo.id = id;
                        this.customTaskInfo.push(newCustomInfo);
                        this.customtaskname = this.customTaskInfo[0].name;
                        Logger.info('taskdetaildialogxxx', `${this.customTaskInfo[0].id}`);
                    });
                }
            }, false);
        });
    }
    /*--------------新增结束---------------*/
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height({ "id": 16777331, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.width({ "id": 16777325, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.backgroundImage(TaskMapById[this.currentTask?.taskID - 1].dialogBg, ImageRepeat.NoRepeat);
            Column.backgroundImageSize({
                width: '100%',
                height: '100%'
            });
            Column.justifyContent(FlexAlign.End);
            Column.padding({
                bottom: { "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                left: { "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
            });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TaskBaseInfo(this, {
                        //自定义任务时传递数据库里的参数
                        //taskName: TaskMapById[this.currentTask?.taskID - 1].taskName
                        taskName: this.currentTask?.taskID === 8 ? this.customtaskname : TaskMapById[this.currentTask?.taskID - 1].taskName
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/dialog/TaskDetailDialog.ets", line: 78, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            //自定义任务时传递数据库里的参数
                            //taskName: TaskMapById[this.currentTask?.taskID - 1].taskName
                            taskName: this.currentTask?.taskID === 8 ? this.customtaskname : TaskMapById[this.currentTask?.taskID - 1].taskName
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TaskBaseInfo" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TaskClock(this, {
                        confirm: () => {
                            this.dialogCallBack.confirmCallback(ObservedObject.GetRawObject(this.currentTask));
                            this.controller.close();
                        },
                        cancel: () => {
                            this.controller.close();
                            Logger.info('build比toappear快！');
                        },
                        showButton: this.showButton
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/dialog/TaskDetailDialog.ets", line: 84, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            confirm: () => {
                                this.dialogCallBack.confirmCallback(ObservedObject.GetRawObject(this.currentTask));
                                this.controller.close();
                            },
                            cancel: () => {
                                this.controller.close();
                                Logger.info('build比toappear快！');
                            },
                            showButton: this.showButton
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TaskClock" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class TaskBaseInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.taskName = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskBaseInfo_Params) {
        if (params.taskName !== undefined) {
            this.taskName = params.taskName;
        }
    }
    updateStateVars(params: TaskBaseInfo_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private taskName: string | Resource;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: Const.DEFAULT_8 });
            Column.position({ y: { "id": 16777323, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.taskName);
            Text.fontSize({ "id": 16777319, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontFamily({ "id": 16777223, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            __Text__taskTextStyle();
            Text.margin({ left: { "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class TaskClock extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.confirm = () => {
        };
        this.cancel = () => {
        };
        this.showButton = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskClock_Params) {
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.showButton !== undefined) {
            this.showButton = params.showButton;
        }
    }
    updateStateVars(params: TaskClock_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private confirm: Function;
    private cancel: Function;
    private showButton: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: Const.DEFAULT_12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width({ "id": 16777320, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.backgroundColor('rgba(255,255,255,0.40)');
            Button.onClick(() => {
                GlobalContext.getContext().setObject('taskListChange', true);
                this.confirm();
            });
            Button.visibility(!this.showButton ? Visibility.None : Visibility.Visible);
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.height({ "id": 16777329, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Normal);
            __Text__textStyle();
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777239, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777314, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Regular);
            __Text__textStyle();
            Text.onClick(() => {
                this.cancel();
            });
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
