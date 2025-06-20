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

import { promptAction } from '@kit.ArkUI';
import { ITaskItem } from '../../model/TaskInitList';
import { frequencyRange } from '../../common/utils/Utils';
//引用了新的4函数
import { returnTimeStamp, createAppleRange, createDrinkRange, createSmileRange, createTeethRange, createRunRange, createCustom2Range, formatTime } from '../../viewmodel/TaskViewModel';
import { taskType } from '../../viewmodel/TaskInfo';
import { CommonConstants as Const } from '../..//common/constants/CommonConstants';
import { FrequencyContentType } from '../../model/TaskInitList';
import Logger from '../../common/utils/Logger';
@CustomDialog
export struct TargetSettingDialog {
  @Consume settingParams: ITaskItem;
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  drinkRange: string[] = createDrinkRange();
  appleRange: string[] = createAppleRange();
  smileRange: string[] = createSmileRange();    //新增笑次数
  teethRange: string[] = createTeethRange();    //新增刷牙次数
  runRange: string[] = createRunRange(); //新增跑步范围
  custom2Range: string[] = createCustom2Range(); //自定义次数类
  currentValue: string = this.settingParams.targetValue;
  currentTime: string = Const.DEFAULT_TIME;


  compareTime(startTime: string, endTime: string) {
    if (returnTimeStamp(this.currentTime) < returnTimeStamp(startTime) ||
      returnTimeStamp(this.currentTime) > returnTimeStamp(endTime)) {
      promptAction.showToast({
        message: Const.CHOOSE_TIME_OUT_RANGE
      })
      return false;
    }
    return true;
  }

  setTargetValue() {
    //Logger.info('current中', `${this.currentTime}`);
    if (this.settingParams?.taskID === taskType.getup) {
      if (!this.compareTime(Const.GET_UP_EARLY_TIME, Const.GET_UP_LATE_TIME)) {
        return;
      }
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    if (this.settingParams?.taskID === taskType.sleepEarly) {
      if (!this.compareTime(Const.SLEEP_EARLY_TIME, Const.SLEEP_LATE_TIME)) {
        return;
      }
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    //新增自定义类型逻辑
    if (this.settingParams?.taskID === taskType.custom) {
      this.settingParams.targetValue = this.currentTime;
      return;
    }
    //Logger.info('为什么设置不成功！', `${this.settingParams?.taskID}`);
    this.settingParams.targetValue = this.currentValue;
    //Logger.info('为什么设置不成功！', `${this.currentValue}`);
    //Logger.info('为什么设置不成功！', `${this.settingParams.targetValue}`);
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.target_setting')).fontSize(Const.DEFAULT_20).margin({ right: Const.DEFAULT_12 })
        Text(this.settingParams?.taskID === taskType.getup ?
        Const.GET_UP_TIME_RANGE :
          this.settingParams?.taskID === taskType.sleepEarly ?
          Const.SLEEP_TIME_RANGE : '')
          .fontSize(Const.DEFAULT_16)
      }
      .width(Const.THOUSANDTH_1000)
      .justifyContent(FlexAlign.Start)

      //新增自定义类型
      //if ([taskType.getup, taskType.sleepEarly].indexOf(this.settingParams?.taskID) > Const.HAS_NO_INDEX) {
      if ([taskType.getup, taskType.sleepEarly, taskType.custom].indexOf(this.settingParams?.taskID) > Const.HAS_NO_INDEX) {
        TimePicker({
          selected: new Date(`${new Date().toDateString()} 8:00:00`),
        })
          .height(Const.THOUSANDTH_800)
          .useMilitaryTime(true)
          .onChange((value: TimePickerResult) => {
            this.currentTime = formatTime(value);
            //Logger.info('currentTimeasdaad', `${this.currentTime}`);
          })
      } else {
      //新增修改
        //TextPicker({ range: this.settingParams?.taskID === taskType.drinkWater ? this.drinkRange : this.appleRange })
        TextPicker({
          range: this.settingParams?.taskID === taskType.drinkWater
            ? this.drinkRange
            : this.settingParams?.taskID === taskType.eatApple
              ? this.appleRange
                : this.settingParams?.taskID === taskType.smile
                  ? this.smileRange
                  : this.settingParams?.taskID === taskType.brushTeeth
                    ? this.teethRange
                    : this.settingParams?.taskID === taskType.run
                      ? this.runRange
                      : this.settingParams?.taskID === taskType.custom2
                        ? this.custom2Range
                        : []
        })
          .width(Const.THOUSANDTH_900,)
          .height(Const.THOUSANDTH_800,)
          .onChange((value: string | string[]) => {
            this.currentValue = (value as string)?.split(' ')[0];
          })
      }

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.currentTime = Const.DEFAULT_TIME;
            this.currentValue = '';
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            //Logger.info('current前', `${this.currentTime}`);
            this.setTargetValue();
            //Logger.info('current后', `${this.currentTime}`);
            this.controller.close();

          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(Const.THOUSANDTH_1000)
      .height(Const.DEFAULT_28)
      .margin({ bottom: Const.DEFAULT_20 })
    }
    .justifyContent(FlexAlign.Center)
    .height(Const.THOUSANDTH_560)
    .padding(Const.DEFAULT_12)
  }
}

@CustomDialog
export struct RemindTimeDialog {
  @Consume settingParams: ITaskItem;
  controller: CustomDialogController = new CustomDialogController({ builder: '' });
  currentTime: string = Const.DEFAULT_TIME;

  build() {
    Column() {
      Column() {
        Text($r('app.string.remind_time'))
          .fontSize(Const.DEFAULT_20)
          .margin({ top: Const.DEFAULT_10 })
          .width(Const.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(Const.THOUSANDTH_900)

      TimePicker({
        selected: new Date(`${new Date().toDateString()} 8:00:00`),
      })
        .height(Const.THOUSANDTH_800)
        .useMilitaryTime(true)
        .onChange((value: TimePickerResult) => {
          this.currentTime = formatTime(value);
        })

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.currentTime = Const.DEFAULT_TIME;
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.settingParams.startTime = this.currentTime;
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(Const.THOUSANDTH_1000)
      .height(Const.DEFAULT_28)
      .margin({ bottom: Const.DEFAULT_20 })
    }
    .justifyContent(FlexAlign.Center)
    .height(Const.THOUSANDTH_560)
    .padding(Const.DEFAULT_12)
  }
}

@CustomDialog
export struct FrequencyDialog {
  @Consume settingParams: ITaskItem;
  @Consume frequency: string;
  private controller: CustomDialogController = new CustomDialogController({ builder: '' });
  private currentFrequency: string = Const.EVERYDAY;
  private frequencyChooseRange: FrequencyContentType[] = frequencyRange();

  setFrequency() {
    const checkedArr = this.frequencyChooseRange.filter((item) => item?.isChecked)
    if (checkedArr.length === this.frequencyChooseRange.length || checkedArr.length === Const.NO_LENGTH) {
      this.currentFrequency = Const.EVERYDAY;
      this.settingParams.frequency = Const.INIT_WEEK_IDS;
      return;
    }
    this.currentFrequency = checkedArr.reduce((sum, current) => {
      return sum + ' ' + current?.label;
    }, '')
    this.settingParams.frequency = checkedArr.reduce((sum, current) => {
      return sum === '' ? sum + current?.id : sum + ',' + current?.id;
    }, '')
  }

  build() {
    Column() {
      Column() {
        Text($r('app.string.set_your_frequency'))
          .fontSize(Const.DEFAULT_20)
          .margin({ top: Const.DEFAULT_10 })
          .width(Const.THOUSANDTH_1000)
          .textAlign(TextAlign.Start)
      }
      .width(Const.THOUSANDTH_900)

      List() {
        ForEach(this.frequencyChooseRange, (item: FrequencyContentType) => {
          ListItem() {
            Row() {
              Text(item?.label).fontSize(Const.DEFAULT_20)
              Toggle({ type: ToggleType.Checkbox })
                .onChange((isOn) => {
                  item.isChecked = isOn;
                })
            }
            .width(Const.THOUSANDTH_1000)
            .justifyContent(FlexAlign.SpaceBetween)
            .height(Const.DEFAULT_60)
          }
        }, (item: FrequencyContentType) => JSON.stringify(item))
      }
      .divider({
        strokeWidth: Const.DEFAULT_2,
        color: $r('app.color.btnBgColor')
      })
      .flexGrow(1)
      .padding(Const.DEFAULT_12)
      .width(Const.THOUSANDTH_1000)

      Row() {
        Text($r('app.string.cancel')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.controller.close();
          })

        Text($r('app.string.confirm')).fontSize(Const.DEFAULT_20).fontColor($r('app.color.blueColor'))
          .onClick(() => {
            this.setFrequency();
            this.frequency = this.currentFrequency;
            this.controller.close();
          })
      }
      .justifyContent(FlexAlign.SpaceAround)
      .width(Const.THOUSANDTH_900)
      .height(Const.DEFAULT_28)
      .margin({ bottom: Const.DEFAULT_16 })
    }
    .justifyContent(FlexAlign.Center)
    .height(Const.THOUSANDTH_900)
    .padding(Const.DEFAULT_12)
  }
}