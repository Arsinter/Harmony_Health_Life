import { router } from '@kit.ArkUI';

import { CommonConstants as Const } from '../common/constants/CommonConstants';
import { CommonConstants } from '../common/constants/CommonConstants';
import CustomTaskApi from '../common/database/tables/CustomTaskApi';
import Logger from '../common/utils/Logger';
import TaskData from '../viewmodel/TaskData';

import emitter from '@ohos.events.emitter';

@Styles
function listItemStyle() {
  .backgroundColor($r('app.color.white'))
  .height(Const.DEFAULT_56)
  .borderRadius(Const.DEFAULT_10)
  .padding({ left: Const.DEFAULT_12, right: Const.DEFAULT_12 })
}


@CustomDialog
struct CustomDialogExample {
  controller?: CustomDialogController;

  build() {
    Column() {
      Text("任务名不规范！")
        .fontSize('16fp')
        .fontColor(Color.Black)
        .height("36vp")
    }
    .backgroundColor($r('app.color.white'))
    .borderRadius('18vp')
    .width(('120vp'))
  }
}

@CustomDialog
struct CustomDialogExample2 {
  controller?: CustomDialogController;

  build() {
    Column() {
      Text("保存成功")
        .fontSize('16fp')
        .fontColor(Color.Black)
        .height("36vp")
    }
    .backgroundColor($r('app.color.white'))
    .borderRadius('18vp')
    .width(('120vp'))
  }
}


@Entry
@Component
struct Index {
  dialogController: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample(),
    openAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: 500,
      playMode: PlayMode.Alternate
    },
    closeAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: 500,
      playMode: PlayMode.Alternate
    },
    alignment: DialogAlignment.Bottom,
    offset: { dx: CommonConstants.ZERO, dy: "-80vp" },
    customStyle: true,
    cornerRadius: "24vp",
    isModal: false
  })
  dialogController2: CustomDialogController | null = new CustomDialogController({
    builder: CustomDialogExample2(),
    openAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: 500,
      playMode: PlayMode.Alternate
    },
    closeAnimation: {
      duration: 300,
      curve: Curve.Friction,
      delay: 500,
      playMode: PlayMode.Alternate
    },
    alignment: DialogAlignment.Bottom,
    offset: { dx: CommonConstants.ZERO, dy: "-80vp" },
    customStyle: true,
    cornerRadius: "24vp",
    isModal: false
  })

  @State name: string = ''
  @State customTaskInfo: TaskData[] = []
  params = router.getParams() as Record<string, Object>
  taskID = this.params.taskID as number
  /*@State type : number = 0
  @State typeString : string = '时间类型'
  provideTargetType : string[] = ['时间类型','次数类型']*/
  private CustomTaskTable = new CustomTaskApi(() => {
  });

  build() {
    Row() {
      Navigation() {
        Column() {
          List({ space: Const.LIST_ITEM_SPACE }) {
            ListItem() {
              Row() {
                Text('任务名称 : ')
                  .fontSize(Const.DEFAULT_20)
                  .fontWeight(FontWeight.Medium)
                TextInput({ placeholder: "编辑任务名称" })
                  .fontSize(Const.DEFAULT_20)
                  .fontWeight(FontWeight.Medium)
                  .width(250) // 设置宽度
                  .onChange((value: string) => {
                    this.name = value
                  })
                  .enableKeyboardOnFocus(true)
              }.width('100%')
            }.listItemStyle()

            // 任务类型
            //
            /*ListItem() {
              Row() {
                Text('目标类型 : ')
                  .fontSize(Const.DEFAULT_20)
                  .fontWeight(FontWeight.Medium)
                Blank()
                  .layoutWeight(1)
                Text(this.typeString)
                  .fontSize(Const.DEFAULT_20)
                  .fontWeight(FontWeight.Medium)
                  .onClick(()=>
                  TextPickerDialog.show({
                    range: this.provideTargetType,
                    selected: 0,
                    backgroundColor: $r('app.color.white'),
                    onAccept: (value: TextPickerResult) => {
                      this.type = value.index as number;
                      this.typeString = value.value as string;
                      Logger.debug('编辑任务类型');
                    },
                    canLoop: false
                  })
                  )
              }.width('100%')
            }.listItemStyle()*/
          }.width(Const.THOUSANDTH_940)

          Button('保存')
            .width(Const.THOUSANDTH_800)
            .height(Const.DEFAULT_48)
            .backgroundColor($r('app.color.borderColor'))
            .position({
              x: Const.THOUSANDTH_100,
              y: Const.THOUSANDTH_800
            })
            .onClick(() => {
              if (this.name == '' || this.name.length > 30) {
                if (this.dialogController != null) {
                  this.dialogController.open();
                  setTimeout(() => {
                    this.dialogController?.close();
                  }, 1000)
                }
                return
              }
              // 保存成功

              this.CustomTaskTable.getRdbStore(() => { // 获取数据库
                this.CustomTaskTable.query(this.taskID, (result: TaskData[]) => { // 查询数据库中的用户
                  if(this.taskID === 8){
                    this.customTaskInfo.push(result[0]);
                    this.customTaskInfo[0].name = this.name
                    //this.customTaskInfo[0].type = this.type
                    Logger.info('CustomTaskEditNamePage', `${this.name}`);
                    this.CustomTaskTable.updateData(this.customTaskInfo[0], () => {
                    });
                  }
                  else if(this.taskID === 9){
                    this.customTaskInfo.push(result[0]);
                    this.customTaskInfo[0].name = this.name
                    //this.customTaskInfo[0].type = this.type
                    Logger.info('CustomTaskEditNamePagedddd', `${this.taskID}`, `${this.customTaskInfo[0].id}`);
                    this.CustomTaskTable.updateData(this.customTaskInfo[0], () => {
                    });
                  }
                }, false);
              });
              // 定义一个eventId为1的事件，事件优先级为Low
              let event: emitter.InnerEvent = {
                eventId: 2,
                priority: emitter.EventPriority.LOW
              }
              // 将修改后的名字发送出去
              let eventData: emitter.EventData = {
                data: {
                  taskName: this.name,
                  //targetType: this.type,
                  id: 8,
                  isEmpty: false
                }
              };
              // 发送eventId为2的事件，事件内容为eventData
              emitter.emit(event, eventData);

              if (this.dialogController2 != null) {
                this.dialogController2.open();
                setTimeout(() => {
                  this.dialogController2?.close();
                }, 1000)
              }
              // 返回上一级
              router.back()
            }).margin({ top: 50 })
        }
      }
      .size({ width: Const.THOUSANDTH_1000, height: Const.THOUSANDTH_1000 })
      .title('自定义任务编辑')
      .titleMode(NavigationTitleMode.Mini)
    }
    .height(Const.THOUSANDTH_1000)
    .backgroundColor($r('app.color.primaryBgColor'))
  }
}