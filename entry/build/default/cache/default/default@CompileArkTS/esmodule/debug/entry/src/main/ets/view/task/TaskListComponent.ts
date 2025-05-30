if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskList_Params {
    CustomTaskTable?;
    customTaskInfo?: TaskData[];
    customtaskname?: string;
    custom2TaskInfo?: TaskData[];
    custom2taskname?: string;
    taskList?: ITaskItem[];
}
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import { formatParams } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskViewModel";
import type { ITaskItem } from '../../model/TaskInitList';
import CustomTaskApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/CustomTaskApi";
import TaskData from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskData";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
export default class TaskList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.CustomTaskTable = new CustomTaskApi(() => {
        });
        this.__customTaskInfo = new ObservedPropertyObjectPU([], this, "customTaskInfo");
        this.__customtaskname = new ObservedPropertySimplePU('--', this, "customtaskname");
        this.__custom2TaskInfo = new ObservedPropertyObjectPU([], this, "custom2TaskInfo");
        this.__custom2taskname = new ObservedPropertySimplePU('--', this, "custom2taskname");
        this.__taskList = this.initializeConsume("taskList", "taskList");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskList_Params) {
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
    }
    updateStateVars(params: TaskList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__customTaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__customtaskname.purgeDependencyOnElmtId(rmElmtId);
        this.__custom2TaskInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__custom2taskname.purgeDependencyOnElmtId(rmElmtId);
        this.__taskList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__customTaskInfo.aboutToBeDeleted();
        this.__customtaskname.aboutToBeDeleted();
        this.__custom2TaskInfo.aboutToBeDeleted();
        this.__custom2taskname.aboutToBeDeleted();
        this.__taskList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /*新增，读数据库获得用户自定义数据*/
    //时间类任务和次数类任务
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
    /*----------*/
    private __taskList: ObservedPropertyAbstractPU<ITaskItem[]>;
    get taskList() {
        return this.__taskList.get();
    }
    set taskList(newValue: ITaskItem[]) {
        this.__taskList.set(newValue);
    }
    /*新增读取用户自定义的*/
    async aboutToAppear() {
        //数据库中取出用户自定义时间类数据
        this.CustomTaskTable.getRdbStore(() => {
            this.CustomTaskTable.query(8, (result: TaskData[]) => {
                if (result && result.length > 0) {
                    this.customTaskInfo.push(result[0]);
                    this.customtaskname = this.customTaskInfo[0].name;
                    Logger.info('DetailCustomInfo查到了', `${this.customTaskInfo[0].name}`);
                }
                else {
                    // 如果没有查询到数据，插入新数据
                    let newCustomInfo = new TaskData();
                    this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
                        newCustomInfo.id = id;
                        this.customTaskInfo.push(newCustomInfo);
                        this.customtaskname = this.customTaskInfo[0].name;
                        Logger.info('DetailCustomInfo没有新建的自定义任务1id', `${this.customTaskInfo[0].id}`);
                    });
                }
            }, false);
        });
        //获取次数类任务
        this.CustomTaskTable.getRdbStore(() => {
            this.CustomTaskTable.query(9, (result: TaskData[]) => {
                if (result && result.length > 0) {
                    this.custom2TaskInfo.push(result[0]);
                    this.custom2taskname = this.custom2TaskInfo[0].name;
                    Logger.info('DetailCustomInfo查到了任务2', `${this.custom2TaskInfo[0].name}`);
                    Logger.info('DetailCustomInfo查到了任务2', `${this.custom2TaskInfo[0].id}`);
                }
                else {
                    // 如果没有查询到数据，插入新数据
                    let newCustomInfo = new TaskData();
                    newCustomInfo.id = 9;
                    this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
                        newCustomInfo.id = id;
                        this.custom2TaskInfo.push(newCustomInfo);
                        this.custom2taskname = this.custom2TaskInfo[0].name;
                        Logger.info('DetailCustomInfo没有新建的自定义2id', `${this.custom2TaskInfo[0].id}`);
                    });
                }
            }, false);
        });
        //Logger.info('custom2taskname父' + JSON.stringify(this.custom2taskname));
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create({ space: Const.LIST_ITEM_SPACE });
            List.height(Const.THOUSANDTH_1000);
            List.width(Const.THOUSANDTH_940);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
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
                        ListItem.height(Const.THOUSANDTH_80);
                        ListItem.borderRadius(Const.DEFAULT_12);
                        ListItem.onClick(() => {
                            router.pushUrl({
                                url: 'pages/TaskEditPage',
                                params: {
                                    params: formatParams(item)
                                }
                            });
                        });
                        ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width(Const.THOUSANDTH_1000);
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width(Const.THOUSANDTH_500);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item?.icon);
                            Image.width(Const.DEFAULT_24);
                            Image.height(Const.DEFAULT_24);
                            Image.margin({ right: Const.DEFAULT_8 });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            /*改成taskID == 8 时 还要显示出用户自定义的任务名称*/
                            //Text(item?.taskName)
                            //这种写法有错会[object Object : customname]。。。。
                            //Text(item?.taskID === 8 ? (item?.taskName + `: ${this.customtaskname}`) : item?.taskName)
                            Text.create(item?.taskID === 8 ? ('时间类' + `: ${this.customtaskname}`) : (item?.taskID === 9 ? ('次数类' + `: ${this.custom2taskname}`) : item?.taskName));
                            /*改成taskID == 8 时 还要显示出用户自定义的任务名称*/
                            //Text(item?.taskName)
                            //这种写法有错会[object Object : customname]。。。。
                            //Text(item?.taskID === 8 ? (item?.taskName + `: ${this.customtaskname}`) : item?.taskName)
                            Text.fontSize(Const.DEFAULT_20);
                            /*改成taskID == 8 时 还要显示出用户自定义的任务名称*/
                            //Text(item?.taskName)
                            //这种写法有错会[object Object : customname]。。。。
                            //Text(item?.taskID === 8 ? (item?.taskName + `: ${this.customtaskname}`) : item?.taskName)
                            Text.fontColor({ "id": 16777297, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Text);
                        /*改成taskID == 8 时 还要显示出用户自定义的任务名称*/
                        //Text(item?.taskName)
                        //这种写法有错会[object Object : customname]。。。。
                        //Text(item?.taskID === 8 ? (item?.taskName + `: ${this.customtaskname}`) : item?.taskName)
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Blank.create();
                            Blank.layoutWeight(1);
                        }, Blank);
                        Blank.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (item?.isOpen) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        Text.fontSize(Const.DEFAULT_16);
                                        Text.flexGrow(1);
                                        Text.align(Alignment.End);
                                        Text.margin({ right: Const.DEFAULT_8 });
                                        Text.fontColor({ "id": 16777297, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                    }, Text);
                                    Text.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
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
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.taskList, forEachItemGenFunction, (item: ITaskItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
