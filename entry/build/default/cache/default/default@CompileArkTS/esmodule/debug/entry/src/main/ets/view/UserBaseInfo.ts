if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UserBaseInfo_Params {
    nickname?: string;
    signature?: string;
    choose?: number;
    pixelmap?: PixelMap | undefined;
}
import picker from "@ohos:file.picker";
import type photoAccessHelper from "@ohos:file.photoAccessHelper";
import type { BusinessError as BusinessError } from "@ohos:base";
import type common from "@ohos:app.ability.common";
import fileIo from "@ohos:file.fs";
import image from "@ohos:multimedia.image";
const context = getContext(this) as common.UIAbilityContext;
export class UserBaseInfo extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__nickname = new SynchedPropertySimpleOneWayPU(params.nickname, this, "nickname");
        this.__signature = new SynchedPropertySimpleOneWayPU(params.signature, this, "signature");
        this.__choose = new ObservedPropertySimplePU(0, this, "choose");
        this.__pixelmap = new ObservedPropertyObjectPU(undefined, this, "pixelmap");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UserBaseInfo_Params) {
        if (params.nickname === undefined) {
            this.__nickname.set('');
        }
        if (params.signature === undefined) {
            this.__signature.set('');
        }
        if (params.choose !== undefined) {
            this.choose = params.choose;
        }
        if (params.pixelmap !== undefined) {
            this.pixelmap = params.pixelmap;
        }
    }
    updateStateVars(params: UserBaseInfo_Params) {
        this.__nickname.reset(params.nickname);
        this.__signature.reset(params.signature);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__signature.purgeDependencyOnElmtId(rmElmtId);
        this.__choose.purgeDependencyOnElmtId(rmElmtId);
        this.__pixelmap.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__nickname.aboutToBeDeleted();
        this.__signature.aboutToBeDeleted();
        this.__choose.aboutToBeDeleted();
        this.__pixelmap.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __nickname: SynchedPropertySimpleOneWayPU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __signature: SynchedPropertySimpleOneWayPU<string>;
    get signature() {
        return this.__signature.get();
    }
    set signature(newValue: string) {
        this.__signature.set(newValue);
    }
    private __choose: ObservedPropertySimplePU<number>;
    get choose() {
        return this.__choose.get();
    }
    set choose(newValue: number) {
        this.__choose.set(newValue);
    }
    private __pixelmap: ObservedPropertyObjectPU<PixelMap | undefined>;
    get pixelmap() {
        return this.__pixelmap.get();
    }
    set pixelmap(newValue: PixelMap | undefined) {
        this.__pixelmap.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // userIcon
            Image.create(this.choose ? this.pixelmap : { "id": 16777417, "type": 20000, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.objectFit(ImageFit.Contain);
            // userIcon
            Image.height({ "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.width({ "id": 16777337, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // userIcon
            Image.margin({ top: { "id": 16777339, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            // userIcon
            Image.onClick(() => {
                try {
                    let uris: Array<string> = [];
                    let PhotoSelectOptions = new picker.PhotoSelectOptions();
                    PhotoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
                    PhotoSelectOptions.maxSelectNumber = 1;
                    let photoPicker = new picker.PhotoViewPicker();
                    photoPicker.select(PhotoSelectOptions).then((PhotoSelectResult: photoAccessHelper.PhotoSelectResult) => {
                        uris = PhotoSelectResult.photoUris;
                        let file = fileIo.openSync(uris[0], fileIo.OpenMode.READ_ONLY);
                        console.info('file fd: ' + file.fd);
                        let buffer = new ArrayBuffer(4096);
                        let readLen = fileIo.readSync(file.fd, buffer);
                        console.info('readSync data to file succeed and buffer size is:' + readLen);
                        const imageSource: image.ImageSource = image.createImageSource(file.fd);
                        let decodingOptions: image.DecodingOptions = {
                            editable: true,
                            desiredPixelFormat: 3,
                        };
                        imageSource.createPixelMap(decodingOptions, (err: BusinessError, pixelMap: image.PixelMap) => {
                            this.pixelmap = pixelMap;
                            this.choose = 1;
                            if (err !== undefined) {
                                console.error(`Failed to create pixelMap.code is ${err.code},message is ${err.message}`);
                            }
                            else {
                                console.info('Succeeded in creating pixelMap object.');
                            }
                        });
                    }).catch((err: BusinessError) => {
                        console.error(`Invoke photoPicker.select failed, code is ${err.code}, message is ${err.message}`);
                    });
                }
                catch (error) {
                    let err: BusinessError = error as BusinessError;
                    console.error('photoPicker failed with err: ' + JSON.stringify(err));
                }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width({ "id": 16777330, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.height({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.margin({ top: { "id": 16777342, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.border({ radius: { "id": 16777333, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777283, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('LV.7');
            Text.fontSize({ "id": 16777311, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bolder);
            Text.fontColor({ "id": 16777284, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // nickname
            Text.create(this.nickname);
            // nickname
            Text.fontSize({ "id": 16777317, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.fontFamily({ "id": 16777225, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // nickname
            Text.margin({ bottom: { "id": 16777335, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } });
            // nickname
            Text.fontWeight(FontWeight.Normal);
            // nickname
            Text.fontColor({ "id": 16777275, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        // nickname
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // signature
            Text.create(this.signature);
            // signature
            Text.fontSize({ "id": 16777315, "type": 10002, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontWeight(FontWeight.Normal);
            // signature
            Text.fontFamily({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
            // signature
            Text.fontColor({ "id": 16777293, "type": 10001, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" });
        }, Text);
        // signature
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
