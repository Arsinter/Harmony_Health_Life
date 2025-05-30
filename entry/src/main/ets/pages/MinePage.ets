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

import { ListInfo } from '../view/ListInfo';
import { UserBaseInfo } from '../view/UserBaseInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import PersonalInfoApi from '../common/database/tables/PersonalInfoApi';
import PersonalInfo from '../viewmodel/PersonalInfo';
import Logger from '../common/utils/Logger';
import emitter from '@ohos.events.emitter';
import { util } from '@kit.ArkTS';
import { image } from '@kit.ImageKit';

@Component
export struct MineIndex {
  @State name: string = Const.NICK_NAME;
  private Personaltable = new PersonalInfoApi(() => {
  });
  @State personalInfo: PersonalInfo[] = [];
  @State nickname: string = Const.NICK_NAME;
  @State signature: string = Const.SIGNATURE;
  @State icon: string | PixelMap | undefined = ""

  @State selectName: string = ''
  @State selectGender: string = ''
  @State selectBirthday: string = ''
  private provideWeight: string[] = []
  private provideHeight: string[] = []
  @State selectWeight: string = ''
  @State selectHeight: string = ''
  onCancel() {
  }


  async aboutToAppear() {
    this.Personaltable.getRdbStore(() => {
      this.Personaltable.query(1, (result: PersonalInfo[]) => {
        if (result && result.length > 0) {
          this.personalInfo.push(result[0]);
          this.nickname = this.personalInfo[0]?.username;
          this.selectName = this.personalInfo[0].username
          // 初始身高体重
          this.selectWeight = this.personalInfo[0].weight
          this.selectHeight = this.personalInfo[0].height
          // 初始性别
          this.selectGender = this.personalInfo[0].gender
          //初始化生日
          this.selectBirthday = this.personalInfo[0].birthday
          this.icon = this.personalInfo[0].icon;
          Logger.info('MinePage', `${this.nickname}`);
          Logger.info('MinePage', `${this.selectName}`);
          Logger.info('MinePage', `${this.selectBirthday}`);
          Logger.info('MinePage', `${this.selectGender}`);
          Logger.info('MinePage', `${this.selectHeight}`);
          Logger.info('MinePage', `${this.selectWeight}`);

        } else {
          let newPersonalInfo = new PersonalInfo();
          this.Personaltable.insertData(newPersonalInfo, (id: number) => {
            newPersonalInfo.id = id;
            this.personalInfo.push(newPersonalInfo);
            this.nickname = this.personalInfo[0].username;
            this.selectName = this.personalInfo[0].username
            // 初始身高体重
            this.selectWeight = this.personalInfo[0].weight
            this.selectHeight = this.personalInfo[0].height
            // 初始性别
            this.selectGender = this.personalInfo[0].gender
            //初始化生日
            this.selectBirthday = this.personalInfo[0].birthday
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
      let userName = eventData.data?.content as string
      this.personalInfo[0].username = userName;
      this.nickname = this.personalInfo[0].username
      Logger.info(TAG, 'event callback:' + JSON.stringify(eventData.data?.content));
    };
    emitter.on(event, callback);

    await this.getIcon()
  }

  private async getIcon() {
    if (this.icon == '') {
      this.icon = undefined
      return
    }
    let helper = new util.Base64Helper();
    let buffer: ArrayBuffer = helper.decodeSync(this.icon as string, util.Type.MIME).buffer as ArrayBuffer;
    let imageSource = image.createImageSource(buffer);
    let opts: image.DecodingOptions = { editable: true };
    let pixelMap = await imageSource.createPixelMap(opts);
    this.icon = pixelMap
  }
  build() {
    Column() {
      UserBaseInfo({
        nickname: this.nickname,
        signature: this.signature
      });
      ListInfo({
        selectName: this.selectName,
        selectGender: this.selectGender,
        selectBirthday: this.selectBirthday,
        selectWeight: this.selectWeight,
        selectHeight: this.selectHeight
      });
    }
    .height(Const.FULL_HEIGHT)
    .backgroundColor($r('app.color.mineBgColor'))
  }
}