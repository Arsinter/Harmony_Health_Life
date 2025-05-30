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

import { TaskMapById } from '../../model/TaskInitList';
import HealthText from '../../view/HealthTextComponent';
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import TaskInfo from '../../viewmodel/TaskInfo';
//新增引用custom task相关的
import CustomTaskApi from '../../common/database/tables/CustomTaskApi';  //数据库接口
import TaskData from '../../viewmodel/TaskData';                       //自定义任务数据类型
import Logger from '../../common/utils/Logger'

@Styles
function allSize() {
  .width(Const.THOUSANDTH_1000)
  .height(Const.THOUSANDTH_1000)
}

@Extend(Text)
function labelTextStyle() {
  .fontSize($r('app.float.default_16'))
  .fontWeight(Const.FONT_WEIGHT_500)
  .opacity(Const.OPACITY_6)
  .fontFamily($r('app.string.HarmonyHeiTi'))
}

@Component
export struct TaskCard {
  @Prop taskInfoStr: string = '';
  clickAction: Function = (isClick: boolean) => {
  };
  @State taskInfo: TaskInfo = new TaskInfo(-1, '', -1, '', false, '', '', '', false, '', false);
  /*新增，读数据库获得用户自定义数据*/
  private CustomTaskTable = new CustomTaskApi(() => {
  });
  @State customTaskInfo: TaskData[] = [];
  @State customtaskname: string = '--';
  //自定义次数类
  @State custom2TaskInfo: TaskData[] = [];
  @State custom2taskname: string = '--';
  /*----------*/

  aboutToAppear() {
    this.taskInfo = JSON.parse(this.taskInfoStr);
    //为了自定义任务新增
    //数据库中取出用户自定义的数据
    this.CustomTaskTable.getRdbStore(() => { // 获取数据库
      this.CustomTaskTable.query(8, (result: TaskData[]) => { // 查询数据库中的用户自定义名称
        if (result && result.length > 0) {
          this.customTaskInfo.push(result[0]);
          this.customtaskname = this.customTaskInfo[0].name;
          Logger.info('CustomInfo查到了', `${this.customTaskInfo[0].name}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newCustomInfo = new TaskData();
          this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
            newCustomInfo.id = id;
            this.customTaskInfo.push(newCustomInfo);
            this.customtaskname = this.customTaskInfo[0].name;
            Logger.info('CustomInfo没有新建的', `${this.customTaskInfo[0].id}`);
          });
        }
      }, false);
    });
    this.CustomTaskTable.getRdbStore(() => { // 获取数据库
      this.CustomTaskTable.query(9, (result: TaskData[]) => { // 查询数据库中的用户自定义名称
        if (result && result.length > 0) {
          this.custom2TaskInfo.push(result[0]);
          this.custom2taskname = this.custom2TaskInfo[0].name;
          Logger.info('CustomInfo查到了', `${this.custom2TaskInfo[0].name}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newCustomInfo = new TaskData();
          this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
            newCustomInfo.id = id;
            this.custom2TaskInfo.push(newCustomInfo);
            this.custom2taskname = this.custom2TaskInfo[0].name;
            Logger.info('CustomInfo没有新建的', `${this.custom2TaskInfo[0].id}`);
          });
        }
      }, false);
    });
    /*-----------------------------*/
  }

  // @Builder
  // targetValueBuilder() {
  //   if (this.taskInfo.isDone) {
  //     HealthText({ title: '', titleResource: $r('app.string.task_done') })
  //     //调试用
  //     /*Text(`Status: ${this.taskInfoStr}`)
  //       .fontSize($r('app.float.default_24'))
  //       .fontWeight(Const.FONT_WEIGHT_400);*/
  //   } else {
  //     Row() {
  //       HealthText({
  //         title: this.taskInfo.finValue || `--`,
  //         fontSize: $r('app.float.default_24')
  //       })
  //       Text(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`)
  //         .labelTextStyle()
  //         .fontWeight(Const.FONT_WEIGHT_400)
  //     }
  //   }
  // }
  @Builder
  targetValueBuilder() {
    Row() {
      HealthText({
        title: this.taskInfo.finValue || `--`,
        fontSize: $r('app.float.default_24')
      })
      Text(` / ${this.taskInfo.targetValue} ${TaskMapById[this.taskInfo.taskID - 1].unit}`)
        .labelTextStyle()
        .fontWeight(Const.FONT_WEIGHT_400)
    }
  }

  build() {
    Row() {
      Row({ space: Const.DEFAULT_6 }) {
        Image(TaskMapById[this.taskInfo.taskID - 1].icon)
          .width($r('app.float.default_36')).height($r('app.float.default_36'))
          .objectFit(ImageFit.Contain)
        HealthText({
          //修改title发过去的任务名称不为空，就可以显示出自定义名字
          //title: '',
          title : this.taskInfo.taskID === 8 ? this.customtaskname : this.taskInfo.taskID === 9 ? this.custom2taskname : '',//this.customtaskname
          titleResource: TaskMapById[this.taskInfo.taskID - 1].taskName,
          fontFamily: $r('app.string.HarmonyHeiTi')
        })
      }

      this.targetValueBuilder();
    }
    .allSize()
    .justifyContent(FlexAlign.SpaceBetween)
    .borderRadius($r('app.float.default_24'))
    .padding({ left: Const.THOUSANDTH_50, right: Const.THOUSANDTH_33 })
    .backgroundColor($r('app.color.white'))
    .onClick(() => this.clickAction(true))
    .gesture(LongPressGesture().onAction(() => this.clickAction(false)))
  }
}