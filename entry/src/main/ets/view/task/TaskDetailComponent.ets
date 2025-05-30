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


import { router } from '@kit.ArkUI';
import { promptAction } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { ITaskItem } from '../../model/TaskInitList';
import Logger from '../../common/utils/Logger';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import TaskInfo, { taskType } from '../../viewmodel/TaskInfo';
import {
  TaskChooseItem,
  TargetSetItem,
  OpenRemindItem,
  RemindTimeItem,
  FrequencyItem
} from './TaskEditListItem';
import { BroadCast, BroadCastType } from '../../common/utils/BroadCast';
import { HealthDataSrcMgr } from '../../common/utils/HealthDataSrcMgr';
import { initFrequencyString, addTask, formatParams } from '../../viewmodel/TaskViewModel';
import { TaskDialogView } from '../dialog/TaskDialogView';
import { GlobalContext } from '../../common/utils/GlobalContext';
//新增引用custom task相关的
import CustomTaskApi from '../../common/database/tables/CustomTaskApi';  //数据库接口
import TaskData from '../../viewmodel/TaskData';                       //自定义任务数据类型
import emitter from '@ohos.events.emitter';                            //订阅相关
import { util } from '@kit.ArkTS';

@Styles
function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}

@Component
export default struct TaskDetail {
  /*新增，读数据库获得用户自定义数据*/
  private CustomTaskTable = new CustomTaskApi(() => {
  });
  //时间类
  @Provide customTaskInfo: TaskData[] = [];
  @Provide customtaskname: string = '--';
  //次数类
  @Provide custom2TaskInfo: TaskData[] = [];
  @Provide custom2taskname: string = '--';
  /*------------------------*/
  @Provide broadCast: BroadCast = HealthDataSrcMgr.getInstance().getBroadCast();
  @Provide @Watch('onParamsChanged') settingParams: ITaskItem = this.parseRouterParams();
  @Provide frequency: string = initFrequencyString(this.settingParams?.frequency);

  private isChanged: boolean = false;

  parseRouterParams() {
    let params = router.getParams() as Record<string, Object>;
    const routerParams: ITaskItem = JSON.parse(params.params as string);
    return routerParams;
  }

  onParamsChanged() {
    this.isChanged = true;
  }

  backIndexParams(): string {
    return formatParams(this.settingParams);
  }

  finishTaskEdit() {
    if (this.isChanged) {
      let context: Context = getContext(this) as common.Context;
      let taskInfo: TaskInfo = new TaskInfo(Const.ZERO, Const.GLOBAL_KEY, this.settingParams.taskID,
        this.settingParams.targetValue, this.settingParams.isAlarm, this.settingParams.startTime,
        this.settingParams.endTime, this.settingParams.frequency, false, '', this.settingParams.isOpen);
      // 显示 taskInfo 的值
      Logger.info('taskInfo:', JSON.stringify(taskInfo));
      addTask(taskInfo, context).then((res: number) => {
        GlobalContext.getContext().setObject('taskListChange', true);
        router.back({
          url: 'pages/MainPage',
          params: {
            editTask: this.backIndexParams(),
            //新增返回用户自定义参数
            //custoMtask: JSON.stringify(this.customTaskInfo)
          }
        })
        //Logger.info('this.backIndexParams()', JSON.stringify(this.backIndexParams()));
        Logger.info('addTaskFinished', JSON.stringify(res));
      }).catch((error: Error) => {
        promptAction.showToast({
          message: Const.SETTING_FINISH_FAILED_MESSAGE
        })
        Logger.error('addTaskFailed你是？', JSON.stringify(error));
      })
      return;
    }
    router.back({
      url: 'pages/MainPage',
    });
  }
  //添加async
  async aboutToAppear() {
  //aboutToAppear() {
    Logger.info('are you ok');
    this.broadCast.off(BroadCastType.SHOW_TARGET_SETTING_DIALOG, () => {
    });
    this.broadCast.off(BroadCastType.SHOW_REMIND_TIME_DIALOG, () => {
    });
    this.broadCast.off(BroadCastType.SHOW_FREQUENCY_DIALOG, () => {
    });
    //新增从customtask 数据库中取出用户自定义的数据
    this.CustomTaskTable.getRdbStore(() => { // 获取数据库
      this.CustomTaskTable.query(8, (result: TaskData[]) => { // 查询数据库中的用户自定义名称
        if (result && result.length > 0) {
          this.customTaskInfo.push(result[0]);
          this.customtaskname = this.customTaskInfo[0].name;
          Logger.info('DetailCustomInfo on taskdetailcomponent', `${this.customTaskInfo[0].name}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newCustomInfo = new TaskData();
          this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
            newCustomInfo.id = id;
            this.customTaskInfo.push(newCustomInfo);
            this.customtaskname = this.customTaskInfo[0].name;
            Logger.info('DetailCustomInfo on taskdetailcomponent没有表', `${this.customTaskInfo[0].id}`);
          });
        }
      }, false);
    });
    this.CustomTaskTable.getRdbStore(() => { // 获取数据库
      this.CustomTaskTable.query(9, (result: TaskData[]) => { // 查询数据库中的用户自定义名称
        if (result && result.length > 0) {
          this.custom2TaskInfo.push(result[0]);
          this.custom2taskname = this.custom2TaskInfo[0].name;
          Logger.info('DetailCustomInfo on taskdetailcomponent', `${this.custom2TaskInfo[0].name}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newCustomInfo = new TaskData();
          this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
            newCustomInfo.id = id;
            this.custom2TaskInfo.push(newCustomInfo);
            this.custom2taskname = this.custom2TaskInfo[0].name;
            Logger.info('DetailCustomInfo on taskdetailcomponent没有表', `${this.custom2TaskInfo[0].id}`);
          });
        }
      }, false);
    });
    /*----------------------------------------------*/
  }

  build() {
    Row() {
      Column() {
        List({ space: Const.LIST_ITEM_SPACE }) {
          ListItem() {
            TaskChooseItem()
          }
          .listItemStyle()

          ListItem() {
            TargetSetItem()
          }
          .listItemStyle()
          .enabled(
            this.settingParams?.isOpen
              //&& this.settingParams?.taskID !== taskType.smile
              //&& this.settingParams?.taskID !== taskType.brushTeeth
          )
          .onClick(() => {
            this.broadCast.emit(
              BroadCastType.SHOW_TARGET_SETTING_DIALOG);
          })

          ListItem() {
            OpenRemindItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen)

          ListItem() {
            RemindTimeItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          .onClick(() => {
            this.broadCast.emit(BroadCastType.SHOW_REMIND_TIME_DIALOG);
          })

          ListItem() {
            FrequencyItem()
          }
          .listItemStyle()
          .enabled(this.settingParams?.isOpen && this.settingParams?.isAlarm)
          .onClick(() => {
            this.broadCast.emit(BroadCastType.SHOW_FREQUENCY_DIALOG);
          })

        }
        .width(Const.THOUSANDTH_940)

        Button() {
          Text($r('app.string.complete')).fontSize($r('app.float.default_20')).fontColor($r('app.color.blueColor'))
        }
        .width(Const.THOUSANDTH_800)
        .height(Const.DEFAULT_48)
        .backgroundColor($r('app.color.borderColor'))
        .onClick(() => {
          this.finishTaskEdit();
        })
        .position({
          x: Const.THOUSANDTH_100,
          y: Const.THOUSANDTH_800
        })

        TaskDialogView()
      }
      .width(Const.THOUSANDTH_1000)
    }
  }
}




