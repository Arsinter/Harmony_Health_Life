if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MineIndex_Params {
    name?: string;
    Personaltable?;
    personalInfo?: PersonalInfo[];
    nickname?: string;
    signature?: string;
    icon?: string | PixelMap | undefined;
    selectName?: string;
    selectGender?: string;
    selectBirthday?: string;
    provideWeight?: string[];
    provideHeight?: string[];
    selectWeight?: string;
    selectHeight?: string;
}
import { ListInfo } from "@bundle:com.example.healthy_life/entry/ets/view/ListInfo";
import { UserBaseInfo } from "@bundle:com.example.healthy_life/entry/ets/view/UserBaseInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import PersonalInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/PersonalInfoApi";
import PersonalInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/PersonalInfo";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import emitter from "@ohos:events.emitter";
import util from "@ohos:util";
import image from "@ohos:multimedia.image";
export class MineIndex extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__name = new ObservedPropertySimplePU(Const.NICK_NAME, this, "name");
        this.Personaltable = new PersonalInfoApi(() => {
        });
        this.__personalInfo = new ObservedPropertyObjectPU([], this, "personalInfo");
        this.__nickname = new ObservedPropertySimplePU(Const.NICK_NAME, this, "nickname");
        this.__signature = new ObservedPropertySimplePU(Const.SIGNATURE, this, "signature");
        this.__icon = new ObservedPropertyObjectPU("", this, "icon");
        this.__selectName = new ObservedPropertySimplePU('', this, "selectName");
        this.__selectGender = new ObservedPropertySimplePU('', this, "selectGender");
        this.__selectBirthday = new ObservedPropertySimplePU('', this, "selectBirthday");
        this.provideWeight = [];
        this.provideHeight = [];
        this.__selectWeight = new ObservedPropertySimplePU('', this, "selectWeight");
        this.__selectHeight = new ObservedPropertySimplePU('', this, "selectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MineIndex_Params) {
        if (params.name !== undefined) {
            this.name = params.name;
        }
        if (params.Personaltable !== undefined) {
            this.Personaltable = params.Personaltable;
        }
        if (params.personalInfo !== undefined) {
            this.personalInfo = params.personalInfo;
        }
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.signature !== undefined) {
            this.signature = params.signature;
        }
        if (params.icon !== undefined) {
            this.icon = params.icon;
        }
        if (params.selectName !== undefined) {
            this.selectName = params.selectName;
        }
        if (params.selectGender !== undefined) {
            this.selectGender = params.selectGender;
        }
        if (params.selectBirthday !== undefined) {
            this.selectBirthday = params.selectBirthday;
        }
        if (params.provideWeight !== undefined) {
            this.provideWeight = params.provideWeight;
        }
        if (params.provideHeight !== undefined) {
            this.provideHeight = params.provideHeight;
        }
        if (params.selectWeight !== undefined) {
            this.selectWeight = params.selectWeight;
        }
        if (params.selectHeight !== undefined) {
            this.selectHeight = params.selectHeight;
        }
    }
    updateStateVars(params: MineIndex_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__personalInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
        this.__selectName.purgeDependencyOnElmtId(rmElmtId);
        this.__selectGender.purgeDependencyOnElmtId(rmElmtId);
        this.__selectBirthday.purgeDependencyOnElmtId(rmElmtId);
        this.__selectWeight.purgeDependencyOnElmtId(rmElmtId);
        this.__selectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__personalInfo.aboutToBeDeleted();
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__icon.aboutToBeDeleted();
        this.__selectName.aboutToBeDeleted();
        this.__selectGender.aboutToBeDeleted();
        this.__selectBirthday.aboutToBeDeleted();
        this.__selectWeight.aboutToBeDeleted();
        this.__selectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __name: ObservedPropertySimplePU<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private Personaltable;
    private __personalInfo: ObservedPropertyObjectPU<PersonalInfo[]>;
    get personalInfo() {
        return this.__personalInfo.get();
    }
    set personalInfo(newValue: PersonalInfo[]) {
        this.__personalInfo.set(newValue);
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __signature: ObservedPropertySimplePU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __icon: ObservedPropertyObjectPU<string | PixelMap | undefined>;
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: string | PixelMap | undefined) {
        this.__icon.set(newValue);
    }
    private __selectName: ObservedPropertySimplePU<string>;
    get selectName() {
        return this.__selectName.get();
    }
    set selectName(newValue: string) {
        this.__selectName.set(newValue);
    }
    private __selectGender: ObservedPropertySimplePU<string>;
    get selectGender() {
        return this.__selectGender.get();
    }
    set selectGender(newValue: string) {
        this.__selectGender.set(newValue);
    }
    private __selectBirthday: ObservedPropertySimplePU<string>;
    get selectBirthday() {
        return this.__selectBirthday.get();
    }
    set selectBirthday(newValue: string) {
        this.__selectBirthday.set(newValue);
    }
    private provideWeight: string[];
    private provideHeight: string[];
    private __selectWeight: ObservedPropertySimplePU<string>;
    get selectWeight() {
        return this.__selectWeight.get();
    }
    set selectWeight(newValue: string) {
        this.__selectWeight.set(newValue);
    }
    private __selectHeight: ObservedPropertySimplePU<string>;
    get selectHeight() {
        return this.__selectHeight.get();
    }
    set selectHeight(newValue: string) {
        this.__selectHeight.set(newValue);
    }
    onCancel() {
    }
    async aboutToAppear() {
        this.Personaltable.getRdbStore(() => {
            this.Personaltable.query(1, (result: PersonalInfo[]) => {
                if (result && result.length > 0) {
                    this.personalInfo.push(result[0]);
                    this.nickname = this.personalInfo[0]?.username;
                    this.selectName = this.personalInfo[0].username;
                    // 初始身高体重
                    this.selectWeight = this.personalInfo[0].weight;
                    this.selectHeight = this.personalInfo[0].height;
                    // 初始性别
                    this.selectGender = this.personalInfo[0].gender;
                    //初始化生日
                    this.selectBirthday = this.personalInfo[0].birthday;
                    this.icon = this.personalInfo[0].icon;
                    Logger.info('MinePage', `${this.nickname}`);
                    Logger.info('MinePage', `${this.selectName}`);
                    Logger.info('MinePage', `${this.selectBirthday}`);
                    Logger.info('MinePage', `${this.selectGender}`);
                    Logger.info('MinePage', `${this.selectHeight}`);
                    Logger.info('MinePage', `${this.selectWeight}`);
                }
                else {
                    let newPersonalInfo = new PersonalInfo();
                    this.Personaltable.insertData(newPersonalInfo, (id: number) => {
                        newPersonalInfo.id = id;
                        this.personalInfo.push(newPersonalInfo);
                        this.nickname = this.personalInfo[0].username;
                        this.selectName = this.personalInfo[0].username;
                        // 初始身高体重
                        this.selectWeight = this.personalInfo[0].weight;
                        this.selectHeight = this.personalInfo[0].height;
                        // 初始性别
                        this.selectGender = this.personalInfo[0].gender;
                        //初始化生日
                        this.selectBirthday = this.personalInfo[0].birthday;
                        Logger.info('MinePage', `${this.nickname}`);
                        Logger.info('MinePage', `${this.selectName}`);
                        Logger.info('MinePage', `${this.selectBirthday}`);
                        Logger.info('MinePage', `${this.selectGender}`);
                        Logger.info('MinePage', `${this.selectHeight}`);
                        Logger.info('MinePage', `${this.selectWeight}`);
                    });
                }
                this.personalInfo.push(result[0]);
            }, false);
        });
        const TAG: string = 'ThreadModel';
        let event: emitter.InnerEvent = {
            eventId: 1
        };
        let callback = (eventData: emitter.EventData): void => {
            let userName = eventData.data?.content as string;
            this.personalInfo[0].username = userName;
            this.nickname = this.personalInfo[0].username;
            Logger.info(TAG, 'event callback:' + JSON.stringify(eventData.data?.content));
        };
        emitter.on(event, callback);
        await this.getIcon();
    }
    private async getIcon() {
        if (this.icon == '') {
            this.icon = undefined;
            return;
        }
        let helper = new util.Base64Helper();
        let buffer: ArrayBuffer = helper.decodeSync(this.icon as string, util.Type.MIME).buffer as ArrayBuffer;
        let imageSource = image.createImageSource(buffer);
        let opts: image.DecodingOptions = { editable: true };
        let pixelMap = await imageSource.createPixelMap(opts);
        this.icon = pixelMap;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(Const.FULL_HEIGHT);
            Column.backgroundColor({ "id": 16777286, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new UserBaseInfo(this, {
                        nickname: this.nickname,
                        signature: this.signature
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 126, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            nickname: this.nickname,
                            signature: this.signature
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        nickname: this.nickname,
                        signature: this.signature
                    });
                }
            }, { name: "UserBaseInfo" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ListInfo(this, {
                        selectName: this.selectName,
                        selectGender: this.selectGender,
                        selectBirthday: this.selectBirthday,
                        selectWeight: this.selectWeight,
                        selectHeight: this.selectHeight
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MinePage.ets", line: 130, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            selectName: this.selectName,
                            selectGender: this.selectGender,
                            selectBirthday: this.selectBirthday,
                            selectWeight: this.selectWeight,
                            selectHeight: this.selectHeight
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        selectName: this.selectName,
                        selectGender: this.selectGender,
                        selectBirthday: this.selectBirthday,
                        selectWeight: this.selectWeight,
                        selectHeight: this.selectHeight
                    });
                }
            }, { name: "ListInfo" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
