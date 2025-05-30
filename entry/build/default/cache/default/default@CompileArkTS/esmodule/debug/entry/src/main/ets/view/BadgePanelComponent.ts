if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DegreeBadgePanel_Params {
    degrees?: Array<number>;
}
interface SingleBadgePanel_Params {
    successiveDays?: Array<number>;
}
interface BadgePanel_Params {
    successiveDays?: number;
}
import { BadgeCard } from "@bundle:com.example.healthy_life/entry/ets/view/BadgeCardComponent";
import { DEGREE_LEVEL_KEY_LIST, getAchievementLevel, getSingleDegree, getSingleLevel, SINGLE_LEVEL_KEY_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { getBadgeCardItems, getContinueCardItems, getDegreeCardItems } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/AchievementViewModel";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import { ACHIEVEMENT_LEVEL_KEY } from "@bundle:com.example.healthy_life/entry/ets/model/AchieveModel";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type CardInfo from '../viewmodel/CardInfo';
let achievementDebug = true;
// 连续打卡全部代办天数
let DebugDays: number = 99;
// 连续早起打卡天数，连续喝水打卡天数，连续吃苹果打卡天数，连续每日微笑打卡天数，连续刷牙打卡天数，连续早睡打卡天数，连续跑步打卡天数，
let DebugSingleCont: Array<number> = [3, 7, 30, 3, 7, 30, 3];
// 喝水最高完成度，吃苹果最高完成度，每日微笑最高完成度，刷牙最高完成度，跑步最高完成度(n表示n倍完成任务）
let DebugDegree: Array<number> = [2, 3, 4, 1, 2];
export class BadgePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__successiveDays = this.createStorageProp(ACHIEVEMENT_LEVEL_KEY, 0, "successiveDays");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: BadgePanel_Params) {
    }
    updateStateVars(params: BadgePanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__successiveDays.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__successiveDays.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __successiveDays: ObservedPropertyAbstractPU<number>; //自动同步登陆日期与ALK
    get successiveDays() {
        return this.__successiveDays.get();
    }
    set successiveDays(newValue: number) {
        this.__successiveDays.set(newValue);
    }
    aboutToAppear() {
        Logger.debug('BadgePanel', 'aboutToAppear');
        getAchievementLevel(); //获取活跃天数
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            Flex.width(Const.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (achievementDebug) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 50, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                content: item.titleContent,
                                                imgSrc: item.achievement
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            content: item.titleContent
                                        });
                                    }
                                }, { name: "BadgeCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getBadgeCardItems(DebugDays), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 54, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                content: item.titleContent,
                                                imgSrc: item.achievement
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            content: item.titleContent
                                        });
                                    }
                                }, { name: "BadgeCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getBadgeCardItems(this.successiveDays), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class SingleBadgePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__successiveDays = this.createStorageProp(SINGLE_LEVEL_KEY_LIST, [], "successiveDays");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SingleBadgePanel_Params) {
    }
    updateStateVars(params: SingleBadgePanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__successiveDays.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__successiveDays.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __successiveDays: ObservedPropertyAbstractPU<Array<number>>;
    get successiveDays() {
        return this.__successiveDays.get();
    }
    set successiveDays(newValue: Array<number>) {
        this.__successiveDays.set(newValue);
    }
    aboutToAppear() {
        Logger.debug('SingleBadgePanel', 'aboutToAppear');
        getSingleLevel();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            Flex.width(Const.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (achievementDebug) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 77, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                content: item.titleContent,
                                                imgSrc: item.achievement
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            content: item.titleContent
                                        });
                                    }
                                }, { name: "BadgeCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getContinueCardItems(DebugSingleCont), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 81, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                content: item.titleContent,
                                                imgSrc: item.achievement
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            content: item.titleContent
                                        });
                                    }
                                }, { name: "BadgeCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getContinueCardItems(this.successiveDays), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class DegreeBadgePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__degrees = this.createStorageProp(DEGREE_LEVEL_KEY_LIST, [], "degrees");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DegreeBadgePanel_Params) {
    }
    updateStateVars(params: DegreeBadgePanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__degrees.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__degrees.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __degrees: ObservedPropertyAbstractPU<Array<number>>;
    get degrees() {
        return this.__degrees.get();
    }
    set degrees(newValue: Array<number>) {
        this.__degrees.set(newValue);
    }
    aboutToAppear() {
        Logger.debug('DegreeBadgePanel', 'aboutToAppear');
        getSingleDegree();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap });
            Flex.width(Const.FULL_WIDTH);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (achievementDebug) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 102, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                content: item.titleContent,
                                                imgSrc: item.achievement
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            content: item.titleContent
                                        });
                                    }
                                }, { name: "BadgeCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getDegreeCardItems(DebugDegree), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new BadgeCard(this, { content: item.titleContent, imgSrc: item.achievement }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/view/BadgePanelComponent.ets", line: 106, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                content: item.titleContent,
                                                imgSrc: item.achievement
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            content: item.titleContent
                                        });
                                    }
                                }, { name: "BadgeCard" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, getDegreeCardItems(this.degrees), forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
