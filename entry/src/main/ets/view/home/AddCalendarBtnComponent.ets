import { CommonConstants as Const } from '../../common/constants/CommonConstants';

@Styles
function allSize() {
  .width(Const.THOUSANDTH_560)
  .height(Const.THOUSANDTH_560)
}

@Component
export default struct AddCalendarBtn {
  clickAction: Function = () => {
  };

  build() {
    Button({ type: ButtonType.Normal, stateEffect: false }) {
      Image($r('app.media.calendar_month'))
        .allSize()
        .borderRadius(Const.BORDER_RADIUS_PERCENT_50)
    }
    .backgroundColor('#00ffffff')

    .onClick(() => this.clickAction())
    .zIndex(Const.HOME_BTN_Z)
    .width($r('app.float.default_36'))
    .height($r('app.float.default_36'))
  }
}