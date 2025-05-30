if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ListInfo_Params {
    nickname?: string;
    PersonalInfo?;
    personalInfo?: PersonalInfo[];
    selectName?: string;
    selectGender?: string;
    selectBirthday?: string;
    selectWeight?: string;
    selectHeight?: string;
}
import { MineInfoList } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import type { InfoItem } from "@bundle:com.example.healthy_life/entry/ets/model/Mine";
import type PersonalInfo from '../viewmodel/PersonalInfo';
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import emitter from "@ohos:events.emitter";
import PersonalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/PersonalInfoApi";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
export class ListInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new ObservedPropertySimplePU(Const.NICK_NAME, this, "nickname");
        this.PersonalInfo = new PersonalInfoApi(() => {
        });
        this.__personalInfo = new ObservedPropertyObjectPU([], this, "personalInfo");
        this.__selectName = new SynchedPropertySimpleOneWayPU(params.selectName, this, "selectName");
        this.__selectGender = new SynchedPropertySimpleOneWayPU(params.selectGender, this, "selectGender");
        this.__selectBirthday = new SynchedPropertySimpleOneWayPU(params.selectBirthday, this, "selectBirthday");
        this.__selectWeight = new SynchedPropertySimpleOneWayPU(params.selectWeight, this, "selectWeight");
        this.__selectHeight = new SynchedPropertySimpleOneWayPU(params.selectHeight, this, "selectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ListInfo_Params) {
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.PersonalInfo !== undefined) {
            this.PersonalInfo = params.PersonalInfo;
        }
        if (params.personalInfo !== undefined) {
            this.personalInfo = params.personalInfo;
        }
        if (params.selectName === undefined) {
            this.__selectName.set('');
        }
        if (params.selectGender === undefined) {
            this.__selectGender.set('');
        }
        if (params.selectBirthday === undefined) {
            this.__selectBirthday.set('');
        }
        if (params.selectWeight === undefined) {
            this.__selectWeight.set('');
        }
        if (params.selectHeight === undefined) {
            this.__selectHeight.set('');
        }
    }
    updateStateVars(params: ListInfo_Params) {
        this.__selectName.reset(params.selectName);
        this.__selectGender.reset(params.selectGender);
        this.__selectBirthday.reset(params.selectBirthday);
        this.__selectWeight.reset(params.selectWeight);
        this.__selectHeight.reset(params.selectHeight);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__personalInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__selectName.purgeDependencyOnElmtId(rmElmtId);
        this.__selectGender.purgeDependencyOnElmtId(rmElmtId);
        this.__selectBirthday.purgeDependencyOnElmtId(rmElmtId);
        this.__selectWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__selectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__personalInfo.aboutToBeDeleted();
        this.__selectName.aboutToBeDeleted();
        this.__selectGender.aboutToBeDeleted();
        this.__selectBirthday.aboutToBeDeleted();
        this.__selectWeight.aboutToBeDeleted();
        this.__selectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private PersonalInfo;
    private __personalInfo: ObservedPropertyObjectPU<PersonalInfo[]>;
    get personalInfo() {
        return this.__personalInfo.get();
    }
    set personalInfo(newValue: PersonalInfo[]) {
        this.__personalInfo.set(newValue);
    }
    private __selectName: SynchedPropertySimpleOneWayPU<string>;
    get selectName() {
        return this.__selectName.get();
    }
    set selectName(newValue: string) {
        this.__selectName.set(newValue);
    }
    private __selectGender: SynchedPropertySimpleOneWayPU<string>;
    get selectGender() {
        return this.__selectGender.get();
    }
    set selectGender(newValue: string) {
        this.__selectGender.set(newValue);
    }
    private __selectBirthday: SynchedPropertySimpleOneWayPU<string>;
    get selectBirthday() {
        return this.__selectBirthday.get();
    }
    set selectBirthday(newValue: string) {
        this.__selectBirthday.set(newValue);
    }
    private __selectWeight: SynchedPropertySimpleOneWayPU<string>;
    get selectWeight() {
        return this.__selectWeight.get();
    }
    set selectWeight(newValue: string) {
        this.__selectWeight.set(newValue);
    }
    private __selectHeight: SynchedPropertySimpleOneWayPU<string>;
    get selectHeight() {
        return this.__selectHeight.get();
    }
    set selectHeight(newValue: string) {
        this.__selectHeight.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.border({
                radius: {
                    topLeft: { "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                    topRight: { "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                }
            });
            List.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            List.margin({ top: { "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.padding({ top: { "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            List.flexGrow(1);
            List.clip(true);
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
                        ListItem.backgroundColor({ "id": 16777298, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.margin({
                            left: { "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
                            right: { "id": 16777321, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                        ListItem.height({ "id": 16777332, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        ListItem.border({
                            width: { bottom: { "id": 16777308, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } },
                            color: { "id": 16777277, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" }
                        });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
                        }, Flex);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                            Text.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                            Text.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (item.id == '1') {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        TextInput.create({ text: this.selectName });
                                        TextInput.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.onChange((value: string) => {
                                            console.info(value);
                                            this.selectName = value;
                                            this.PersonalInfo.getRdbStore(() => {
                                                this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                                                    this.personalInfo.push(result[0]);
                                                    this.personalInfo[0].username = this.selectName;
                                                    Logger.info('ListInfo', `${this.selectName}`);
                                                    this.PersonalInfo.updateData(this.personalInfo[0], () => {
                                                    });
                                                    let event: emitter.InnerEvent = {
                                                        eventId: 1,
                                                        priority: emitter.EventPriority.LOW
                                                    };
                                                    let eventData: emitter.EventData = {
                                                        data: {
                                                            content: this.selectName,
                                                            id: 1,
                                                            isEmpty: false
                                                        }
                                                    };
                                                    emitter.emit(event, eventData);
                                                }, false);
                                            });
                                        });
                                        TextInput.onFocus(() => {
                                            console.info('获取');
                                        });
                                    }, TextInput);
                                });
                            }
                            else if (item.id == '2') {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        TextInput.create({ text: this.selectGender });
                                        TextInput.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.onChange((value: string) => {
                                            console.info(value);
                                            this.selectGender = value;
                                            this.PersonalInfo.getRdbStore(() => {
                                                this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                                                    this.personalInfo.push(result[0]);
                                                    this.personalInfo[0].gender = this.selectGender;
                                                    Logger.info('ListInfo', `${this.selectGender}`);
                                                    this.PersonalInfo.updateData(this.personalInfo[0], () => {
                                                    });
                                                    let event: emitter.InnerEvent = {
                                                        eventId: 1,
                                                        priority: emitter.EventPriority.LOW
                                                    };
                                                    let eventData: emitter.EventData = {
                                                        data: {
                                                            content: this.selectName,
                                                            id: 1,
                                                            isEmpty: false
                                                        }
                                                    };
                                                    emitter.emit(event, eventData);
                                                }, false);
                                            });
                                        });
                                        TextInput.onFocus(() => {
                                            console.info('获取');
                                        });
                                    }, TextInput);
                                });
                            }
                            else if (item.id == '3') {
                                this.ifElseBranchUpdateFunction(2, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        TextInput.create({ text: this.selectBirthday });
                                        TextInput.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.onChange((value: string) => {
                                            console.info(value);
                                            this.selectBirthday = value;
                                            this.PersonalInfo.getRdbStore(() => {
                                                this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                                                    this.personalInfo.push(result[0]);
                                                    this.personalInfo[0].birthday = this.selectBirthday;
                                                    Logger.info('ListInfo', `${this.selectBirthday}`);
                                                    this.PersonalInfo.updateData(this.personalInfo[0], () => {
                                                    });
                                                    let event: emitter.InnerEvent = {
                                                        eventId: 1,
                                                        priority: emitter.EventPriority.LOW
                                                    };
                                                    let eventData: emitter.EventData = {
                                                        data: {
                                                            content: this.selectName,
                                                            id: 1,
                                                            isEmpty: false
                                                        }
                                                    };
                                                    emitter.emit(event, eventData);
                                                }, false);
                                            });
                                        });
                                        TextInput.onFocus(() => {
                                            console.info('获取');
                                        });
                                    }, TextInput);
                                });
                            }
                            else if (item.id == '4') {
                                this.ifElseBranchUpdateFunction(3, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        TextInput.create({ text: this.selectHeight });
                                        TextInput.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.onChange((value: string) => {
                                            console.info(value);
                                            this.selectHeight = value;
                                            this.PersonalInfo.getRdbStore(() => {
                                                this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                                                    this.personalInfo.push(result[0]);
                                                    this.personalInfo[0].height = this.selectHeight;
                                                    Logger.info('ListInfo', `${this.selectHeight}`);
                                                    this.PersonalInfo.updateData(this.personalInfo[0], () => {
                                                    });
                                                    let event: emitter.InnerEvent = {
                                                        eventId: 1,
                                                        priority: emitter.EventPriority.LOW
                                                    };
                                                    let eventData: emitter.EventData = {
                                                        data: {
                                                            content: this.selectName,
                                                            id: 1,
                                                            isEmpty: false
                                                        }
                                                    };
                                                    emitter.emit(event, eventData);
                                                }, false);
                                            });
                                        });
                                        TextInput.onFocus(() => {
                                            console.info('获取');
                                        });
                                    }, TextInput);
                                });
                            }
                            else if (item.id == '5') {
                                this.ifElseBranchUpdateFunction(4, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        TextInput.create({ text: this.selectWeight });
                                        TextInput.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.height({ "id": 16777328, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.width({ "id": 16777318, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        TextInput.onChange((value: string) => {
                                            console.info(value);
                                            this.selectWeight = value;
                                            this.PersonalInfo.getRdbStore(() => {
                                                this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                                                    this.personalInfo.push(result[0]);
                                                    this.personalInfo[0].weight = this.selectWeight;
                                                    Logger.info('ListInfo', `${this.selectWeight}`);
                                                    this.PersonalInfo.updateData(this.personalInfo[0], () => {
                                                    });
                                                    let event: emitter.InnerEvent = {
                                                        eventId: 1,
                                                        priority: emitter.EventPriority.LOW
                                                    };
                                                    let eventData: emitter.EventData = {
                                                        data: {
                                                            content: this.selectName,
                                                            id: 1,
                                                            isEmpty: false
                                                        }
                                                    };
                                                    emitter.emit(event, eventData);
                                                }, false);
                                            });
                                        });
                                        TextInput.onFocus(() => {
                                            console.info('获取');
                                        });
                                    }, TextInput);
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(5, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create({ "id": 16777400, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        Image.objectFit(ImageFit.Contain);
                                        Image.height({ "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                        Image.width({ "id": 16777338, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                                    }, Image);
                                });
                            }
                        }, If);
                        If.pop();
                        Flex.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, MineInfoList, forEachItemGenFunction, (item: InfoItem) => JSON.stringify(item), false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
