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

import { MineInfoList, InfoItem } from '../model/Mine';
import PersonalInfo from '../viewmodel/PersonalInfo';
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import emitter from '@ohos.events.emitter';
import PersonalInfoApi from '../common/database/tables/PersonalInfoApi';
import Logger from '../common/utils/Logger';


@Component
export struct ListInfo {

  @State nickname: string = Const.NICK_NAME;
  private PersonalInfo = new PersonalInfoApi(() => {
  });
  @State personalInfo: PersonalInfo[] = [];

  @Prop selectName: string = ''
  @Prop selectGender: string = ''
  @Prop selectBirthday: string = ''
  @Prop selectWeight: string = ''
  @Prop selectHeight: string = ''

  build() {
    List() {
      ForEach(MineInfoList, (item: InfoItem) => {
        ListItem() {
          Flex({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center }) {
            Text(item.title)
              .fontSize($r('app.float.default_16'))
              .height($r('app.float.default_40'))
            if (item.id == '1') {
              TextInput({ text:this.selectName})
                .fontSize($r('app.float.default_16'))
                .height($r('app.float.default_40'))
                .width($r('app.float.default_200'))
                .onChange((value: string) => {
                  console.info(value);
                  this.selectName = value;
                  this.PersonalInfo.getRdbStore(() => {
                    this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                      this.personalInfo.push(result[0]);
                      this.personalInfo[0].username = this.selectName
                      Logger.info('ListInfo', `${this.selectName}`);
                      this.PersonalInfo.updateData(this.personalInfo[0], () => {
                      });
                      let event: emitter.InnerEvent = {
                        eventId: 1,
                        priority: emitter.EventPriority.LOW
                      }
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

                })
                .onFocus(() => {
                  console.info('获取');
                })
            }
            else if (item.id == '2') {
              TextInput({ text: this.selectGender })
                .fontSize($r('app.float.default_16'))
                .height($r('app.float.default_40'))
                .width($r('app.float.default_200'))
                .onChange((value: string) => {
                  console.info(value);
                  this.selectGender = value;
                  this.PersonalInfo.getRdbStore(() => {
                    this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                      this.personalInfo.push(result[0]);
                      this.personalInfo[0].gender = this.selectGender
                      Logger.info('ListInfo', `${this.selectGender}`);
                      this.PersonalInfo.updateData(this.personalInfo[0], () => {
                      });
                      let event: emitter.InnerEvent = {
                        eventId: 1,
                        priority: emitter.EventPriority.LOW
                      }
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
                })
                .onFocus(() => {
                  console.info('获取');
                })
            }
            else if (item.id == '3') {
              TextInput({ text: this.selectBirthday })
                .fontSize($r('app.float.default_16'))
                .height($r('app.float.default_40'))
                .width($r('app.float.default_200'))
                .onChange((value: string) => {
                  console.info(value);
                  this.selectBirthday = value;
                  this.PersonalInfo.getRdbStore(() => {
                    this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                      this.personalInfo.push(result[0]);
                      this.personalInfo[0].birthday = this.selectBirthday
                      Logger.info('ListInfo', `${this.selectBirthday}`);
                      this.PersonalInfo.updateData(this.personalInfo[0], () => {
                      });
                      let event: emitter.InnerEvent = {
                        eventId: 1,
                        priority: emitter.EventPriority.LOW
                      }
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
                })
                .onFocus(() => {
                  console.info('获取');
                })
            }
            else if (item.id == '4') {
              TextInput({ text: this.selectHeight })
                .fontSize($r('app.float.default_16'))
                .height($r('app.float.default_40'))
                .width($r('app.float.default_200'))
                .onChange((value: string) => {
                  console.info(value);
                  this.selectHeight = value;
                  this.PersonalInfo.getRdbStore(() => {
                    this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                      this.personalInfo.push(result[0]);
                      this.personalInfo[0].height = this.selectHeight
                      Logger.info('ListInfo', `${this.selectHeight}`);
                      this.PersonalInfo.updateData(this.personalInfo[0], () => {
                      });
                      let event: emitter.InnerEvent = {
                        eventId: 1,
                        priority: emitter.EventPriority.LOW
                      }
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
                })
                .onFocus(() => {
                  console.info('获取');
                })
            }
            else if (item.id == '5') {
              TextInput({ text: this.selectWeight })
                .fontSize($r('app.float.default_16'))
                .height($r('app.float.default_40'))
                .width($r('app.float.default_200'))
                .onChange((value: string) => {
                  console.info(value);
                  this.selectWeight = value;
                  this.PersonalInfo.getRdbStore(() => {
                    this.PersonalInfo.query(1, (result: PersonalInfo[]) => {
                      this.personalInfo.push(result[0]);
                      this.personalInfo[0].weight = this.selectWeight
                      Logger.info('ListInfo', `${this.selectWeight}`);
                      this.PersonalInfo.updateData(this.personalInfo[0], () => {
                      });
                      let event: emitter.InnerEvent = {
                        eventId: 1,
                        priority: emitter.EventPriority.LOW
                      }
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
                })
                .onFocus(() => {
                  console.info('获取');
                })
            }
            else{
              Image($r('app.media.ic_right_grey'))
                .objectFit(ImageFit.Contain)
                .height($r('app.float.default_12'))
                .width($r('app.float.default_7'))
            }
          }
        }
        .backgroundColor($r('app.color.white'))
        .margin({
          left: $r('app.float.default_24'),
          right: $r('app.float.default_24')
        })
        .height($r('app.float.default_48'))
        .border({
          width: { bottom: $r('app.float.default_1') },
          color: $r('app.color.borderColor')
        })

      }, (item: InfoItem) => JSON.stringify(item));
    }
    .border({
      radius: {
        topLeft: $r('app.float.default_24'),
        topRight: $r('app.float.default_24')
      }
    })
    .backgroundColor($r('app.color.white'))
    .margin({ top: $r('app.float.default_24') })
    .padding({ top: $r('app.float.default_16') })
    .flexGrow(1)
    .clip(true)
  }
}