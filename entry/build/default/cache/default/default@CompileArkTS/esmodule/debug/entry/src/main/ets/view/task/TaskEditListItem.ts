if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FrequencyItem_Params {
    settingParams?: ITaskItem;
    frequency?: string;
}
interface RemindTimeItem_Params {
    settingParams?: ITaskItem;
}
interface OpenRemindItem_Params {
    settingParams?: ITaskItem;
}
interface TargetSetItem_Params {
    settingParams?: ITaskItem;
}
interface TaskChooseItem_Params {
    settingParams?: ITaskItem;
    CustomTaskTable?;
    customTaskInfo?: TaskData[];
    customtaskname?: string;
    custom2TaskInfo?: TaskData[];
    custom2taskname?: string;
    inputTaskName?: string;
}
import type { ITaskItem } from '../../model/TaskInitList';
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import CustomTaskApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/CustomTaskApi";
import type TaskData from '../../viewmodel/TaskData';
import emitter from "@ohos:events.emitter";
import router from "@ohos:router";
function __Text__targetSetCommon(): void {
    Text.fontSize(Const.DEFAULT_16);
    Text.flexGrow(1);
    Text.margin({ right: Const.DEFAULT_8 });
    Text.align(Alignment.End);
}
function __Text__targetSettingStyle(isOpen: boolean, taskID: number): void {
    Text.fontColor(isOpen ? { "id": 16777297, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__remindTimeStyle(isOpen: boolean, isAlarm: boolean): void {
    Text.fontColor(isOpen && isAlarm ? { "id": 16777297, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
function __Text__frequencyStyle(isOpen: boolean, isAlarm: boolean): void {
    Text.fontSize(Const.DEFAULT_12);
    Text.flexGrow(1);
    Text.margin({ right: Const.DEFAULT_8 });
    Text.textAlign(TextAlign.End);
    Text.fontColor(isOpen && isAlarm ? { "id": 16777297, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } : { "id": 16777280, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
}
export class TaskChooseItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.CustomTaskTable = new CustomTaskApi(() => {
        });
        this.__customTaskInfo = this.initializeConsume("customTaskInfo", "customTaskInfo");
        this.__customtaskname = this.initializeConsume("customtaskname", "customtaskname");
        this.__custom2TaskInfo = this.initializeConsume("custom2TaskInfo", "custom2TaskInfo");
        this.__custom2taskname = this.initializeConsume("custom2taskname", "custom2taskname");
        this.inputTaskName = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskChooseItem_Params) {
        if (params.CustomTaskTable !== undefined) {
            this.CustomTaskTable = params.CustomTaskTable;
        }
        if (params.inputTaskName !== undefined) {
            this.inputTaskName = params.inputTaskName;
        }
    }
    updateStateVars(params: TaskChooseItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
        this.__customTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customtaskname.purgeDependencyOnElmtId(rmElmtId);
        this.__custom2TaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__custom2taskname.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        this.__customTaskInfo.aboutToBeDeleted();
        this.__customtaskname.aboutToBeDeleted();
        this.__custom2TaskInfo.aboutToBeDeleted();
        this.__custom2taskname.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    /*新增自定义任务相关*/
    private CustomTaskTable;
    private __customTaskInfo: ObservedPropertyAbstractPU<TaskData[]>;
    get customTaskInfo() {
        return this.__customTaskInfo.get();
    }
    set customTaskInfo(newValue: TaskData[]) {
        this.__customTaskInfo.set(newValue);
    }
    private __customtaskname: ObservedPropertyAbstractPU<string>;
    get customtaskname() {
        return this.__customtaskname.get();
    }
    set customtaskname(newValue: string) {
        this.__customtaskname.set(newValue);
    }
    //次数类
    private __custom2TaskInfo: ObservedPropertyAbstractPU<TaskData[]>;
    get custom2TaskInfo() {
        return this.__custom2TaskInfo.get();
    }
    set custom2TaskInfo(newValue: TaskData[]) {
        this.__custom2TaskInfo.set(newValue);
    }
    private __custom2taskname: ObservedPropertyAbstractPU<string>;
    get custom2taskname() {
        return this.__custom2taskname.get();
    }
    set custom2taskname(newValue: string) {
        this.__custom2taskname.set(newValue);
    }
    private inputTaskName: string;
    /*--------------------------------------*/
    //aboutToAppear是完全新增的,用于获取订阅的事件，来修改任务名称
    async aboutToAppear() {
        Logger.info('custom2taskname孩子' + JSON.stringify(this.custom2taskname));
        const TAG: string = 'ThreadModel';
        // 定义一个eventId为2的事件
        let event: emitter.InnerEvent = {
            eventId: 2
        };
        // 收到eventId为2的事件后执行该回调
        let callback = (eventData: emitter.EventData): void => {
            // 更新用户信息
            let taskName = eventData.data?.taskName as string;
            if (this.settingParams.taskID === 8) {
                this.customTaskInfo[0].name = taskName;
                this.customtaskname = this.customTaskInfo[0].name;
            }
            else if (this.settingParams.taskID === 9) {
                this.custom2TaskInfo[0].name = taskName;
                this.custom2taskname = this.custom2TaskInfo[0].name;
            }
            Logger.info(TAG, 'event2 callback:' + JSON.stringify(eventData.data?.taskName));
        };
        // 订阅eventId为2的事件
        emitter.on(event, callback);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            //Text(this.settingParams.taskName).fontSize(Const.DEFAULT_20).fontWeight(FontWeight.Medium)
            //ID为8/9时可编辑
            /*---------------------------*/
            if (this.settingParams.taskID === 8 || this.settingParams.taskID === 9) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        //Text(this.settingParams.taskName)
                        //Text(this.customtaskname)
                        Text.create(this.settingParams.taskID === 8 ? this.customtaskname : this.custom2taskname);
                        //Text(this.settingParams.taskName)
                        //Text(this.customtaskname)
                        Text.fontSize(Const.DEFAULT_20);
                        //Text(this.settingParams.taskName)
                        //Text(this.customtaskname)
                        Text.fontWeight(FontWeight.Medium);
                        //Text(this.settingParams.taskName)
                        //Text(this.customtaskname)
                        Text.onClick(() => {
                            router.pushUrl({
                                url: 'pages/CustomTaskEDit',
                                params: {
                                    taskID: Number(this.settingParams.taskID)
                                }
                            });
                        });
                    }, Text);
                    //Text(this.settingParams.taskName)
                    //Text(this.customtaskname)
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.settingParams.taskName);
                        Text.fontSize(Const.DEFAULT_20);
                        Text.fontWeight(FontWeight.Medium);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            /*-------------------------*/
            Toggle.create({ type: ToggleType.Switch, isOn: this.settingParams.isOpen });
            /*-------------------------*/
            Toggle.width(Const.DEFAULT_56);
            /*-------------------------*/
            Toggle.height(Const.DEFAULT_32);
            /*-------------------------*/
            Toggle.selectedColor({ "id": 16777276, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            /*-------------------------*/
            Toggle.onChange((isOn) => {
                //让任务关闭时，提醒同步关即可
                this.settingParams.isOpen = isOn;
                //if语句新增
                if (this.settingParams.isOpen == false) {
                    this.settingParams.isAlarm = isOn;
                }
            });
        }, Toggle);
        /*-------------------------*/
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TargetSetItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TargetSetItem_Params) {
    }
    updateStateVars(params: TargetSetItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777261, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.settingParams?.unit === '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.settingParams?.targetValue}`);
                        __Text__targetSetCommon();
                        __Text__targetSettingStyle(this.settingParams?.isOpen, this.settingParams?.taskID);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.settingParams?.targetValue} ${this.settingParams?.unit} ${Const.PER_DAY}`);
                        __Text__targetSetCommon();
                        __Text__targetSettingStyle(this.settingParams?.isOpen, this.settingParams?.taskID);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.DEFAULT_8);
            Image.height(Const.DEFAULT_16);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class OpenRemindItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: OpenRemindItem_Params) {
    }
    updateStateVars(params: OpenRemindItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777251, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: this.settingParams?.isAlarm });
            Toggle.width(Const.DEFAULT_56);
            Toggle.height(Const.DEFAULT_32);
            Toggle.selectedColor({ "id": 16777276, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Toggle.onChange((isOn) => {
                this.settingParams.isAlarm = isOn;
            });
        }, Toggle);
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class RemindTimeItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RemindTimeItem_Params) {
    }
    updateStateVars(params: RemindTimeItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777254, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.settingParams?.startTime);
            __Text__targetSetCommon();
            __Text__remindTimeStyle(this.settingParams?.isOpen, this.settingParams?.isAlarm);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.DEFAULT_8);
            Image.height(Const.DEFAULT_16);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class FrequencyItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__settingParams = this.initializeConsume("settingParams", "settingParams");
        this.__frequency = this.initializeConsume("frequency", "frequency");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FrequencyItem_Params) {
    }
    updateStateVars(params: FrequencyItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
        this.__frequency.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __settingParams: ObservedPropertyAbstractPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    private __frequency: ObservedPropertyAbstractPU<string>;
    get frequency() {
        return this.__frequency.get();
    }
    set frequency(newValue: string) {
        this.__frequency.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(Const.THOUSANDTH_1000);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777238, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize(Const.DEFAULT_20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.frequency);
            __Text__targetSetCommon();
            __Text__frequencyStyle(this.settingParams?.isOpen, this.settingParams?.isAlarm);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Image.width(Const.DEFAULT_8);
            Image.height(Const.DEFAULT_16);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
