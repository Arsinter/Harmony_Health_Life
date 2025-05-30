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

import { ITaskItem } from '../../model/TaskInitList';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { taskType } from '../../viewmodel/TaskInfo';
import Logger from '../../common/utils/Logger';

/*新增*/
import CustomTaskApi from '../../common/database/tables/CustomTaskApi';  //数据库接口
import TaskData from '../../viewmodel/TaskData';                       //自定义任务数据类型
import emitter from '@ohos.events.emitter';                            //订阅相关
import { util } from '@kit.ArkTS';
import { router } from '@kit.ArkUI';

@Extend(Text)
function targetSetCommon() {
  .fontSize(Const.DEFAULT_16)
  .flexGrow(1)
  .margin({ right: Const.DEFAULT_8 })
  .align(Alignment.End)
}

@Extend(Text)
function targetSettingStyle(isOpen: boolean, taskID: number) {
  //修改微笑、刷牙字体颜色
  /*.fontColor(isOpen && taskID !== taskType.smile && taskID !== taskType.brushTeeth ?
  $r('app.color.titleColor') :
  $r('app.color.disabledColor'))*/
  .fontColor(isOpen  ?
  $r('app.color.titleColor') :
  $r('app.color.disabledColor'))
}

@Extend(Text)
function remindTimeStyle(isOpen: boolean, isAlarm: boolean) {
  .fontColor(isOpen && isAlarm ? $r('app.color.titleColor') : $r('app.color.disabledColor'))
}

@Extend(Text)
function frequencyStyle(isOpen: boolean, isAlarm: boolean) {
  .fontSize(Const.DEFAULT_12)
  .flexGrow(1)
  .margin({ right: Const.DEFAULT_8 })
  .textAlign(TextAlign.End)
  .fontColor(isOpen && isAlarm ? $r('app.color.titleColor') : $r('app.color.disabledColor'))
}


@Component
export struct TaskChooseItem {
  @Consume settingParams: ITaskItem;
  /*新增自定义任务相关*/
  private CustomTaskTable = new CustomTaskApi(() => {
  });
  @Consume customTaskInfo: TaskData[];
  @Consume customtaskname: string;
  //次数类
  @Consume custom2TaskInfo: TaskData[];
  @Consume custom2taskname: string;
  inputTaskName: string = '';
  /*--------------------------------------*/
  //aboutToAppear是完全新增的,用于获取订阅的事件，来修改任务名称
  async aboutToAppear() {
    Logger.info('custom2taskname孩子' + JSON.stringify(this.custom2taskname));
    const TAG: string = 'ThreadModel';
    // 定义一个eventId为2的事件
    let event: emitter.InnerEvent = {
      eventId: 2
    };
    // 收到eventId为2的事件后执行该回调
    let callback = (eventData: emitter.EventData): void => {
      // 更新用户信息
      let taskName = eventData.data?.taskName as string
      if(this.settingParams.taskID === 8){
        this.customTaskInfo[0].name = taskName;
        this.customtaskname = this.customTaskInfo[0].name;
      }
      else if(this.settingParams.taskID === 9){
        this.custom2TaskInfo[0].name = taskName;
        this.custom2taskname = this.custom2TaskInfo[0].name;
      }
      Logger.info(TAG, 'event2 callback:' + JSON.stringify(eventData.data?.taskName));
    };
    // 订阅eventId为2的事件
    emitter.on(event, callback);
  }
  build() {
    Row() {
      //Text(this.settingParams.taskName).fontSize(Const.DEFAULT_20).fontWeight(FontWeight.Medium)
      //ID为8/9时可编辑
      /*---------------------------*/
      if (this.settingParams.taskID === 8 || this.settingParams.taskID === 9) {
        //Text(this.settingParams.taskName)
        //Text(this.customtaskname)
        Text(this.settingParams.taskID === 8 ? this.customtaskname : this.custom2taskname)
          .fontSize(Const.DEFAULT_20)
          .fontWeight(FontWeight.Medium)
        //新增
          .onClick(() => {
            router.pushUrl({
              url : 'pages/CustomTaskEDit',
              params: {
                taskID : Number(this.settingParams.taskID)
              }
            })
          })
        //用新页面了舍弃这里的
        /*TextInput({text:`${this.customtaskname}`})
          .fontSize(Const.DEFAULT_20)
          .fontWeight(FontWeight.Medium)
          .width(100)  // 设置宽度
          .onChange((value) => {
            this.inputTaskName = String(value);
            Logger.info('我是用户输入的自定义名称', JSON.stringify(this.inputTaskName));
          })*/
        /*Button('保存')
          //.fontColor("#FFFFFF")
          .width($r('app.float.default_10'))
          //.backgroundColor("#00FF00")
          // Write the information and clear the content so that the text box is cleared after you click Save.
          .onClick(() => {
            //保存用户输入逻辑
            this.customtaskname = this.inputTaskName;
            this.customTaskInfo[0].name = this.inputTaskName;
            this.CustomTaskTable.getRdbStore(() => { // 获取数据库
              this.CustomTaskTable.query(1, (result: TaskData[]) => { // 查询数据库中的用户
                this.customTaskInfo.push(result[0]);
                this.customTaskInfo[0].name = this.inputTaskName;
                Logger.info('inputCustomname我保存用户输入', `${this.inputTaskName}`);
                this.CustomTaskTable.updateData(this.customTaskInfo[0], () => {
                });
                //这里修改名称后，默认之前的任务被关闭，使得更新逻辑正常(也不太正常...)
                //让任务关闭时，提醒同步关即可
                this.settingParams.isOpen = false;
                //if语句新增
                if(this.settingParams.isOpen == false){
                  this.settingParams.isAlarm = false;
                }
                */
      } else {
        Text(this.settingParams.taskName)
          .fontSize(Const.DEFAULT_20)
          .fontWeight(FontWeight.Medium)
      }
      /*-------------------------*/
      Toggle({ type: ToggleType.Switch, isOn: this.settingParams.isOpen })
        .width(Const.DEFAULT_56)
        .height(Const.DEFAULT_32)
        .selectedColor($r('app.color.blueColor'))
        .onChange((isOn) => {
          //让任务关闭时，提醒同步关即可
          this.settingParams.isOpen = isOn;
          //if语句新增
          if(this.settingParams.isOpen == false){
            this.settingParams.isAlarm = isOn;
          }
        })
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.SpaceBetween)
  }
}

@Component
export struct TargetSetItem {
  @Consume settingParams: ITaskItem;

  build() {
    Row() {
      Text($r('app.string.target_setting'))
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)

      Blank()
        .layoutWeight(1)
      if (this.settingParams?.unit === '') {
        Text(`${this.settingParams?.targetValue}`)
          .targetSetCommon()
          .targetSettingStyle(this.settingParams?.isOpen, this.settingParams?.taskID)
      } else {
        Text(`${this.settingParams?.targetValue} ${this.settingParams?.unit} ${Const.PER_DAY}`)
          .targetSetCommon()
          .targetSettingStyle(this.settingParams?.isOpen, this.settingParams?.taskID)
      }
      Image($r('app.media.ic_right_grey')).width(Const.DEFAULT_8).height(Const.DEFAULT_16);
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.SpaceBetween)
  }
}

@Component
export struct OpenRemindItem {
  @Consume settingParams: ITaskItem;

  build() {
    Row() {
      Text($r('app.string.open_reminder'))
        .fontSize(Const.DEFAULT_20)
        .fontWeight(FontWeight.Medium)

      Toggle({ type: ToggleType.Switch, isOn: this.settingParams?.isAlarm })
        .width(Const.DEFAULT_56)
        .height(Const.DEFAULT_32)
        .selectedColor($r('app.color.blueColor'))
        .onChange((isOn) => {
          this.settingParams.isAlarm = isOn;
        })
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.SpaceBetween)
  }
}

@Component
export struct RemindTimeItem {
  @Consume settingParams: ITaskItem;

  build() {
    Row() {
      Text($r('app.string.remind_time')).fontSize(Const.DEFAULT_20).fontWeight(FontWeight.Medium)
      Blank()
        .layoutWeight(1)
      Text(this.settingParams?.startTime)
        .targetSetCommon()
        .remindTimeStyle(this.settingParams?.isOpen, this.settingParams?.isAlarm)
      Image($r('app.media.ic_right_grey')).width(Const.DEFAULT_8).height(Const.DEFAULT_16)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.SpaceBetween)
  }
}

@Component
export struct FrequencyItem {
  @Consume settingParams: ITaskItem;
  @Consume frequency: string;

  build() {
    Row() {
      Text($r('app.string.frequency')).fontSize(Const.DEFAULT_20).fontWeight(FontWeight.Medium)
      Text(this.frequency)
        .targetSetCommon()
        .frequencyStyle(this.settingParams?.isOpen, this.settingParams?.isAlarm)
      Image($r('app.media.ic_right_grey')).width(Const.DEFAULT_8).height(Const.DEFAULT_16)
    }
    .width(Const.THOUSANDTH_1000)
    .justifyContent(FlexAlign.SpaceBetween)
  }
}