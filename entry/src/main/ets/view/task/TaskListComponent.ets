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
import { CommonConstants as Const } from '../../common/constants/CommonConstants';
import { formatParams } from '../../viewmodel/TaskViewModel';
import { ITaskItem } from '../../model/TaskInitList';

/*用户自定义名称*/
//新增引用custom task相关的
import CustomTaskApi from '../../common/database/tables/CustomTaskApi';  //数据库接口
import TaskData from '../../viewmodel/TaskData';                       //自定义任务数据类型
import emitter from '@ohos.events.emitter';                            //订阅相关
import { util } from '@kit.ArkTS';
import Logger from '../../common/utils/Logger';


@Component
export default struct TaskList {
  /*新增，读数据库获得用户自定义数据*/
  //时间类任务和次数类任务
  private CustomTaskTable = new CustomTaskApi(() => {
  });
  @State customTaskInfo: TaskData[] = [];
  @State customtaskname: string = '--';
  @State custom2TaskInfo: TaskData[] = [];
  @State custom2taskname: string = '--';
  /*----------*/
  @Consume taskList: ITaskItem[];

  /*新增读取用户自定义的*/
  async aboutToAppear() {
    //数据库中取出用户自定义时间类数据
    this.CustomTaskTable.getRdbStore(() => { // 获取数据库
      this.CustomTaskTable.query(8, (result: TaskData[]) => { // 查询数据库中的用户自定义名称
        if (result && result.length > 0) {
          this.customTaskInfo.push(result[0]);
          this.customtaskname = this.customTaskInfo[0].name;
          Logger.info('DetailCustomInfo查到了', `${this.customTaskInfo[0].name}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newCustomInfo = new TaskData();
          this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
            newCustomInfo.id = id;
            this.customTaskInfo.push(newCustomInfo);
            this.customtaskname = this.customTaskInfo[0].name;
            Logger.info('DetailCustomInfo没有新建的自定义任务1id', `${this.customTaskInfo[0].id}`);
          });
        }
      }, false);
    });
    //获取次数类任务
    this.CustomTaskTable.getRdbStore(() => { // 获取数据库
      this.CustomTaskTable.query(9, (result: TaskData[]) => { // 查询数据库中的用户自定义名称
        if (result && result.length > 0) {
          this.custom2TaskInfo.push(result[0]);
          this.custom2taskname = this.custom2TaskInfo[0].name;
          Logger.info('DetailCustomInfo查到了任务2', `${this.custom2TaskInfo[0].name}`);
          Logger.info('DetailCustomInfo查到了任务2', `${this.custom2TaskInfo[0].id}`);
        } else {
          // 如果没有查询到数据，插入新数据
          let newCustomInfo = new TaskData();
          newCustomInfo.id = 9;
          this.CustomTaskTable.insertData(newCustomInfo, (id: number) => {
            newCustomInfo.id = id;
            this.custom2TaskInfo.push(newCustomInfo);
            this.custom2taskname = this.custom2TaskInfo[0].name;
            Logger.info('DetailCustomInfo没有新建的自定义2id', `${this.custom2TaskInfo[0].id}`);
          });
        }
      }, false);
    });
    //Logger.info('custom2taskname父' + JSON.stringify(this.custom2taskname));
  }


  build() {
    List({ space: Const.LIST_ITEM_SPACE }) {
      ForEach(this.taskList, (item: ITaskItem) => {
        ListItem() {
          Row() {
            Row() {
              Image(item?.icon)
                .width(Const.DEFAULT_24)
                .height(Const.DEFAULT_24)
                .margin({ right: Const.DEFAULT_8 })
              /*改成taskID == 8 时 还要显示出用户自定义的任务名称*/
              //Text(item?.taskName)
              //这种写法有错会[object Object : customname]。。。。
              //Text(item?.taskID === 8 ? (item?.taskName + `: ${this.customtaskname}`) : item?.taskName)
              Text(item?.taskID === 8 ? ('时间类' + `: ${this.customtaskname}`) : (item?.taskID === 9 ? ('次数类' + `: ${this.custom2taskname}`) : item?.taskName))
                .fontSize(Const.DEFAULT_20)
                .fontColor($r('app.color.titleColor'))
            }
            .width(Const.THOUSANDTH_500)

            Blank()
              .layoutWeight(1)
            if (item?.isOpen) {
              Text($r('app.string.already_open'))
                .fontSize(Const.DEFAULT_16)
                .flexGrow(1)
                .align(Alignment.End)
                .margin({ right: Const.DEFAULT_8 })
                .fontColor($r('app.color.titleColor'))
            }
            Image($r('app.media.ic_right_grey'))
              .width(Const.DEFAULT_8)
              .height(Const.DEFAULT_16)
          }
          .width(Const.THOUSANDTH_1000)
          .justifyContent(FlexAlign.SpaceBetween)
          .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
        }
        .height(Const.THOUSANDTH_80)
        .borderRadius(Const.DEFAULT_12)
        .onClick(() => {
          router.pushUrl({
            url: 'pages/TaskEditPage',
            params: {
              params: formatParams(item)
            }
          })
        })
        .backgroundColor($r('app.color.white'))
      }, (item: ITaskItem) => JSON.stringify(item))
    }
    .height(Const.THOUSANDTH_1000)
    .width(Const.THOUSANDTH_940)
  }
}