/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { picker } from '@kit.CoreFileKit';
import { photoAccessHelper } from '@kit.MediaLibraryKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { common } from '@kit.AbilityKit';
import { fileIo } from '@kit.CoreFileKit';
import { image } from '@kit.ImageKit';

const context = getContext(this) as common.UIAbilityContext;

@Component
export struct UserBaseInfo {
  @Prop nickname: string = '';
  @Prop signature: string = '';
  @State choose: number = 0;
  @State pixelmap: PixelMap |undefined= undefined;
  build() {
    Column() {
      // userIcon
      Image(this.choose?this.pixelmap:$r('app.media.ic_user'))
        .objectFit(ImageFit.Contain)
        .height($r('app.float.default_66'))
        .width($r('app.float.default_66'))
        .margin({ top: $r('app.float.default_71') })
        .onClick(() => {
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
              }
              imageSource.createPixelMap(decodingOptions, (err: BusinessError, pixelMap: image.PixelMap) => {
                this.pixelmap = pixelMap;
                this.choose = 1;
                if (err !== undefined) {
                  console.error(`Failed to create pixelMap.code is ${err.code},message is ${err.message}`);
                } else {
                  console.info('Succeeded in creating pixelMap object.');
                }
              })
            }).catch((err: BusinessError) => {
              console.error(`Invoke photoPicker.select failed, code is ${err.code}, message is ${err.message}`);
            })
          } catch (error) {
            let err: BusinessError = error as BusinessError;
            console.error('photoPicker failed with err: ' + JSON.stringify(err));
          }
        })
      Column() {
        Text('LV.7')
          .fontSize($r('app.float.default_12'))
          .fontWeight(FontWeight.Bolder)
          .fontColor($r('app.color.leveColor'))
      }
      .width($r('app.float.default_44'))
      .height($r('app.float.default_16'))
      .margin({ top: $r('app.float.default_n8') })
      .border({ radius: $r('app.float.default_5') })
      .backgroundColor($r('app.color.leveBgColor'))
      .justifyContent(FlexAlign.Center)

      // nickname
      Text(this.nickname)
        .fontSize($r('app.float.default_20'))
        .fontFamily($r('app.string.Helvetica'))
        .margin({ bottom: $r('app.float.default_6') })
        .fontWeight(FontWeight.Normal)
        .fontColor($r('app.color.black'))

      // signature
      Text(this.signature).fontSize($r('app.float.default_16')).fontWeight(FontWeight.Normal)
        .fontFamily($r('app.string.PingFangSC_Regular'))
        .fontColor($r('app.color.signatureColor'))
    }
  }
}