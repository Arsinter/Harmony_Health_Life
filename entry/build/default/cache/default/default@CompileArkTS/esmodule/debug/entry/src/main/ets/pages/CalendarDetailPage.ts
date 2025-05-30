if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CalendarDetailPage_Params {
    homeStore?: HomeStore;
    // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
    // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
    // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
    // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
    cjDataItem?: CJDateItem;
    cjCellStyle?: CJCellStyle;
    cjCellStatus?: CellStatus;
}
import { CellStatus, CJCellStyle, CJDateItem } from "@package:pkg_modules/.ohpm/cjcalendar@2.3.0/pkg_modules/cjcalendar/Index";
import router from "@ohos:router";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import type { HomeStore } from '../viewmodel/HomeViewModel';
import type { WeekDateModel } from '../model/WeekCalendarModel';
// class structofDayInfoMap {
//   dayInfoMap: HashMap<number, DayInfo> = new HashMap();
// }
// class structofDayInfoArr {
//   dayInfoArr: DayInfo[] = [];
// }
function checkValuesEqual(dateArr: Array<WeekDateModel>): boolean {
    let result = false;
    for (let item of dateArr) {
        if (item.dayInfo.finTaskNum === item.dayInfo.targetTaskNum) {
            result = true;
        }
    }
    return result;
}
function isAchieved(dateArr: Array<WeekDateModel>, cj: CJDateItem) {
    let result = false;
    for (let item of dateArr) {
        let dateStr_item_temp = String(item.date);
        let dateStr_item: string = `${dateStr_item_temp.toString()
            .substring(0, 4)}${Number(dateStr_item_temp.toString()
            .substring(5, 7))}${Number(dateStr_item_temp.toString()
            .substring(8, 10))}`;
        let dateStr: string = `${cj.fullYear}${(cj.month + 1) % 12}${cj.date}`;
        if (Number(dateStr_item) == Number(dateStr)) {
            if (item.dayInfo.targetTaskNum == item.dayInfo.finTaskNum && item.dayInfo.targetTaskNum != 0) {
                result = true;
            }
            else {
                result = false;
            }
        }
    }
    return result;
}
class CalendarDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__homeStore = new ObservedPropertyObjectPU(router.getParams() as HomeStore, this, "homeStore");
        this.cjDataItem = new CJDateItem(new Date());
        this.cjCellStyle = new CJCellStyle();
        this.cjCellStatus = new CellStatus();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CalendarDetailPage_Params) {
        if (params.homeStore !== undefined) {
            this.homeStore = params.homeStore;
        }
        if (params.cjDataItem !== undefined) {
            this.cjDataItem = params.cjDataItem;
        }
        if (params.cjCellStyle !== undefined) {
            this.cjCellStyle = params.cjCellStyle;
        }
        if (params.cjCellStatus !== undefined) {
            this.cjCellStatus = params.cjCellStatus;
        }
    }
    updateStateVars(params: CalendarDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__homeStore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__homeStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // @Link homeStore: HomeStore;
    // @Prop homeStore: HomeStore;
    private __homeStore: ObservedPropertyObjectPU<HomeStore>; // 获取传递过来的参数对象
    get homeStore() {
        return this.__homeStore.get();
    }
    set homeStore(newValue: HomeStore) {
        this.__homeStore.set(newValue);
    }
    // @State keyValueDayInfoMap: structofDayInfoMap= router.getParams() as structofDayInfoMap;
    // @State dayInfoMap: HashMap<number,DayInfo> = this.keyValueDayInfoMap.dayInfoMap;
    // @State keyValueDayInfoArr: structofDayInfoArr= router.getParams() as structofDayInfoArr;
    // @State dayInfoArr: DayInfo[] = this.keyValueDayInfoArr.dayInfoArr;
    private cjDataItem: CJDateItem;
    private cjCellStyle: CJCellStyle;
    private cjCellStatus: CellStatus;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(new NavPathStack(), { moduleName: "entry", pagePath: "entry/src/main/ets/pages/CalendarDetailPage", isUserCreateStack: false });
            Navigation.size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 });
            Navigation.title('日历');
            Navigation.titleMode(NavigationTitleMode.Mini);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        Column.pop();
        Navigation.pop();
        Row.pop();
    }
    BuildCellBackground(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // if (this.cjDataItem.date == Number((router.getParams() as HomeStore).dateArr[0].date)) { // 今天
            if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.create();
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.backgroundImage({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.renderFit(RenderFit.RESIZE_FILL);
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.backgroundColor(this.cjCellStatus.backgroundColor);
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.width('85%');
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.aspectRatio(1);
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.border({
                            width: this.cjCellStyle.borderWidth,
                            color: this.cjCellStyle.borderColor
                        });
                        //   if (this.cjDataItem.isToday) { // 今天
                        Column.borderRadius(this.cjCellStyle.borderRadius);
                    }, Column);
                    //   if (this.cjDataItem.isToday) { // 今天
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.backgroundColor(this.cjCellStatus.backgroundColor);
                        Column.width('85%');
                        Column.aspectRatio(1);
                        Column.border({
                            width: this.cjCellStyle.borderWidth,
                            color: this.cjCellStyle.borderColor
                        });
                        Column.borderRadius(this.cjCellStyle.borderRadius);
                    }, Column);
                    Column.pop();
                });
            }
        }, If);
        If.pop();
    }
    BuildCellBody(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cjDataItem.date + '');
            Text.fontColor(this.cjCellStatus.fontColor);
            Text.fontSize(this.cjCellStyle.fontSize);
            Text.fontWeight(this.cjCellStyle.fontFontWeight);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (isAchieved((router.getParams() as HomeStore).dateArr, this.cjDataItem)) { // 今天
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777394, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
                        Image.objectFit(ImageFit.Contain);
                        Image.height('20vp');
                        Image.width('20vp');
                        Image.margin({ top: '0vp' });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('');
                        Text.height('20vp');
                        Text.width('20vp');
                        Text.margin({ top: '0vp' });
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CalendarDetailPage";
    }
}
registerNamedRoute(() => new CalendarDetailPage(undefined, {}), "", { bundleName: "com.example.healthy_life", moduleName: "entry", pagePath: "pages/CalendarDetailPage", pageFullPath: "entry/src/main/ets/pages/CalendarDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
