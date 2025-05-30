if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskDetail_Params {
    CustomTaskTable?;
    customTaskInfo?: TaskData[];
    customtaskname?: string;
    custom2TaskInfo?: TaskData[];
    custom2taskname?: string;
    broadCast?: BroadCast;
    settingParams?: ITaskItem;
    frequency?: string;
    isChanged?: boolean;
}
import router from "@ohos:router";
import promptAction from "@ohos:promptAction";
import type common from "@ohos:app.ability.common";
import type { ITaskItem } from '../../model/TaskInitList';
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import { TaskChooseItem, TargetSetItem, OpenRemindItem, RemindTimeItem, FrequencyItem } from "@bundle:com.example.healthy_life/entry/ets/view/task/TaskEditListItem";
import { BroadCastType } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import type { BroadCast } from "@bundle:com.example.healthy_life/entry/ets/common/utils/BroadCast";
import { HealthDataSrcMgr } from "@bundle:com.example.healthy_life/entry/ets/common/utils/HealthDataSrcMgr";
import { initFrequencyString, addTask, formatParams } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel";
import { TaskDialogView } from "@bundle:com.example.healthy_life/entry/ets/view/dialog/TaskDialogView";
import { GlobalContext } from "@bundle:com.example.healthy_life/entry/ets/common/utils/GlobalContext";
import CustomTaskApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/CustomTaskApi";
import TaskData from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskData";
export default class TaskDetail extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.CustomTaskTable = new CustomTaskApi(() => {
        });
        this.__customTaskInfo = new ObservedPropertyObjectPU([], this, "customTaskInfo");
        this.addProvidedVar("customTaskInfo", this.__customTaskInfo, false);
        this.__customtaskname = new ObservedPropertySimplePU('--', this, "customtaskname");
        this.addProvidedVar("customtaskname", this.__customtaskname, false);
        this.__custom2TaskInfo = new ObservedPropertyObjectPU([], this, "custom2TaskInfo");
        this.addProvidedVar("custom2TaskInfo", this.__custom2TaskInfo, false);
        this.__custom2taskname = new ObservedPropertySimplePU('--', this, "custom2taskname");
        this.addProvidedVar("custom2taskname", this.__custom2taskname, false);
        this.__broadCast = new ObservedPropertyObjectPU(HealthDataSrcMgr.getInstance().getBroadCast(), this, "broadCast");
        this.addProvidedVar("broadCast", this.__broadCast, false);
        this.__settingParams = new ObservedPropertyObjectPU(this.parseRouterParams(), this, "settingParams");
        this.addProvidedVar("settingParams", this.__settingParams, false);
        this.__frequency = new ObservedPropertySimplePU(initFrequencyString(this.settingParams?.frequency), this, "frequency");
        this.addProvidedVar("frequency", this.__frequency, false);
        this.isChanged = false;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("settingParams", this.onParamsChanged);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskDetail_Params) {
        if (params.CustomTaskTable !== undefined) {
            this.CustomTaskTable = params.CustomTaskTable;
        }
        if (params.customTaskInfo !== undefined) {
            this.customTaskInfo = params.customTaskInfo;
        }
        if (params.customtaskname !== undefined) {
            this.customtaskname = params.customtaskname;
        }
        if (params.custom2TaskInfo !== undefined) {
            this.custom2TaskInfo = params.custom2TaskInfo;
        }
        if (params.custom2taskname !== undefined) {
            this.custom2taskname = params.custom2taskname;
        }
        if (params.broadCast !== undefined) {
            this.broadCast = params.broadCast;
        }
        if (params.settingParams !== undefined) {
            this.settingParams = params.settingParams;
        }
        if (params.frequency !== undefined) {
            this.frequency = params.frequency;
        }
        if (params.isChanged !== undefined) {
            this.isChanged = params.isChanged;
        }
    }
    updateStateVars(params: TaskDetail_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__customTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customtaskname.purgeDependencyOnElmtId(rmElmtId);
        this.__custom2TaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__custom2taskname.purgeDependencyOnElmtId(rmElmtId);
        this.__broadCast.purgeDependencyOnElmtId(rmElmtId);
        this.__settingParams.purgeDependencyOnElmtId(rmElmtId);
        this.__frequency.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__customTaskInfo.aboutToBeDeleted();
        this.__customtaskname.aboutToBeDeleted();
        this.__custom2TaskInfo.aboutToBeDeleted();
        this.__custom2taskname.aboutToBeDeleted();
        this.__broadCast.aboutToBeDeleted();
        this.__settingParams.aboutToBeDeleted();
        this.__frequency.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /*新增，读数据库获得用户自定义数据*/
    private CustomTaskTable;
    //时间类
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
    //次数类
    private __custom2TaskInfo: ObservedPropertyObjectPU<TaskData[]>;
    get custom2TaskInfo() {
        return this.__custom2TaskInfo.get();
    }
    set custom2TaskInfo(newValue: TaskData[]) {
        this.__custom2TaskInfo.set(newValue);
    }
    private __custom2taskname: ObservedPropertySimplePU<string>;
    get custom2taskname() {
        return this.__custom2taskname.get();
    }
    set custom2taskname(newValue: string) {
        this.__custom2taskname.set(newValue);
    }
    /*------------------------*/
    private __broadCast: ObservedPropertyObjectPU<BroadCast>;
    get broadCast() {
        return this.__broadCast.get();
    }
    set broadCast(newValue: BroadCast) {
        this.__broadCast.set(newValue);
    }
    private __settingParams: ObservedPropertyObjectPU<ITaskItem>;
    get settingParams() {
        return this.__settingParams.get();
    }
    set settingParams(newValue: ITaskItem) {
        this.__settingParams.set(newValue);
    }
    private __frequency: ObservedPropertySimplePU<string>;
    get frequency() {
        return this.__frequency.get();
    }
    set frequency(newValue: string) {
        this.__frequency.set(newValue);
    }
    private isChanged: boolean;
    parseRouterParams() {
        let params = router.getParams() as Record<string, Object>;
        const routerParams: ITaskItem = JSON.parse(params.params as string);
        return routerParams;
    }
    onParamsChanged() {
        this.isChanged = true;
    }
    backIndexParams(): string {
        return formatParams(this.settingParams);
    }
    finishTaskEdit() {
        if (this.isChanged) {
            let context: Context = getContext(this) as common.Context;
            let taskInfo: TaskInfo = new TaskInfo(Const.ZERO, Const.GLOBAL_KEY, this.settingParams.taskID, this.settingParams.targetValue, this.settingParams.isAlarm, this.settingParams.startTime, this.settingParams.endTime, this.settingParams.frequency, false, '', this.settingParams.isOpen);
            // 显示 taskInfo 的值
            Logger.info('taskInfo:', JSON.stringify(taskInfo));
            addTask(taskInfo, context).then((res: number) => {
                GlobalContext.getContext().setObject('taskListChange', true);
                router.back({
                    url: 'pages/MainPage',
                    params: {
                        editTask: this.backIndexParams(),
                        //新增返回用户自定义参数
                        //custoMtask: JSON.stringify(this.customTaskInfo)
                    }
                });
                //Logger.info('this.backIndexParams()', JSON.stringify(this.backIndexParams()));
                Logger.info('addTaskFinished', JSON.stringify(res));
            }).catch((error: Error) => {
                promptAction.showToast({
                    message: Const.SETTING_FINISH_FAILED_MESSAGE
                });
                Logger.error('addTaskFailed你是？', JSON.stringify(error));
            });
            return;
        }
        router.back({
            url: 'pages/MainPage',
        });
    }
    //添加async
    async aboutToAppear() {
        //aboutToAppear() {
        Logger.info('are you ok');
        this.broadCast.off(BroadCastType.SHOW_TARGET_SETTING_DIALOG, () => {
        });
        this.broadCast.off(BroadCastType.SHOW_REMIND_TIME_DIALOG, () => {
        });
        this.broadCast.off(BroadCastType.SHOW_FREQUENCY_DIALOG, () => {
        });
        //新增从customtask 数据库中取出用户自定义的数据
        this.CustomTaskTable.getRdbStore(() => {
            this.CustomTaskTable.query(8, (result: TaskData[]) => {
                if (result && result.length > 0) {
                    this.customTaskInfo.push(result[0]);
                    this.customtaskname = this.customTaskInfo[0].name;
                    Logger.info('DetailCustomInfo on taskdetailcomponent', `${this.customTaskInfo[0].name}`);
                }
                else {
                    // 如果没有查询到数据，插入新数据
                    let newCustomInfo = new TaskData();
                    this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
                        newCustomInfo.id = id;
                        this.customTaskInfo.push(newCustomInfo);
                        this.customtaskname = this.customTaskInfo[0].name;
                        Logger.info('DetailCustomInfo on taskdetailcomponent没有表', `${this.customTaskInfo[0].id}`);
                    });
                }
            }, false);
        });
        this.CustomTaskTable.getRdbStore(() => {
            this.CustomTaskTable.query(9, (result: TaskData[]) => {
                if (result && result.length > 0) {
                    this.custom2TaskInfo.push(result[0]);
                    this.custom2taskname = this.custom2TaskInfo[0].name;
                    Logger.info('DetailCustomInfo on taskdetailcomponent', `${this.custom2TaskInfo[0].name}`);
                }
                else {
                    // 如果没有查询到数据，插入新数据
                    let newCustomInfo = new TaskData();
                    this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
                        newCustomInfo.id = id;
                        this.custom2TaskInfo.push(newCustomInfo);
                        this.custom2taskname = this.custom2TaskInfo[0].name;
                        Logger.info('DetailCustomInfo on taskdetailcomponent没有表', `${this.custom2TaskInfo[0].id}`);
                    });
                }
            }, false);
        });
        /*----------------------------------------------*/
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(Const.THOUSANDTH_1000);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Const.LIST_ITEM_SPACE });
            List.width(Const.THOUSANDTH_940);
        }, List);
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TaskChooseItem(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/task/TaskDetailComponent.ets", line: 169, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TaskChooseItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(this.settingParams?.isOpen
                //&& this.settingParams?.taskID !== taskType.smile
                //&& this.settingParams?.taskID !== taskType.brushTeeth
                );
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_TARGET_SETTING_DIALOG);
                });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TargetSetItem(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/task/TaskDetailComponent.ets", line: 174, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "TargetSetItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(this.settingParams?.isOpen);
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new OpenRemindItem(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/task/TaskDetailComponent.ets", line: 188, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "OpenRemindItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm);
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_REMIND_TIME_DIALOG);
                });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RemindTimeItem(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/task/TaskDetailComponent.ets", line: 194, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "RemindTimeItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        {
            const itemCreation = (elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                itemCreation2(elmtId, isInitialRender);
                if (!isInitialRender) {
                    ListItem.pop();
                }
                ViewStackProcessor.StopGetAccessRecording();
            };
            const itemCreation2 = (elmtId, isInitialRender) => {
                ListItem.create(deepRenderFunction, true);
                ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                ListItem.height(Const.DEFAULT_56);
                ListItem.borderRadius(Const.DEFAULT_10);
                ListItem.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                ListItem.enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm);
                ListItem.onClick(() => {
                    this.broadCast.emit(BroadCastType.SHOW_FREQUENCY_DIALOG);
                });
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new FrequencyItem(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/task/TaskDetailComponent.ets", line: 203, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "FrequencyItem" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(Const.THOUSANDTH_800);
            Button.height(Const.DEFAULT_48);
            Button.backgroundColor({ "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Button.onClick(() => {
                this.finishTaskEdit();
            });
            Button.position({
                x: Const.THOUSANDTH_100,
                y: Const.THOUSANDTH_800
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontSize({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontColor({ "id": 16777276, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Button.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TaskDialogView(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/task/TaskDetailComponent.ets", line: 228, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TaskDialogView" });
        }
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
