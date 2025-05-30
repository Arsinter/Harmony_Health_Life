import CardInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/CardInfo";
import { ACHIEVEMENT_LEVEL_LIST, AchievementMap, CONTINUE_LEVEL_LIST, DEGREE_LEVEL_LIST } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
export function getBadgeCardItems(successiveDays: number): Array<CardInfo> {
    let badgeMileStones = ACHIEVEMENT_LEVEL_LIST;
    let cardItems: Array<CardInfo> = [];
    for (let i = 0; i < badgeMileStones.length; i++) {
        let onOrOff = successiveDays >= badgeMileStones[i] ? 'on' : 'off';
        let titleContent = String(badgeMileStones[i]);
        let cardInfo: CardInfo = new CardInfo();
        cardInfo.titleContent = titleContent;
        cardInfo.achievement = getAchievement(`${onOrOff}_${badgeMileStones[i]}`);
        cardItems.push(cardInfo);
    }
    return cardItems;
}
export function getContinueCardItems(successiveDays: Array<number>): Array<CardInfo> {
    let ContinueList: Array<string> = ['早起', '喝水', '吃苹果', '每日微笑', '每日刷牙', '早睡', '跑步'];
    let badgeMileStones = CONTINUE_LEVEL_LIST; // 单任务成就标准
    let cardItems: Array<CardInfo> = [];
    for (let k = 0; k < ContinueList.length; k++) {
        for (let i = 0; i < badgeMileStones.length; i++) {
            let onOrOff = successiveDays[k] >= badgeMileStones[i] ? 'on' : 'off';
            let titleContent = String(badgeMileStones[i]);
            let cardInfo: CardInfo = new CardInfo();
            cardInfo.titleContent = '连续' + titleContent + '天' + ContinueList[k];
            cardInfo.achievement = getAchievement(`${onOrOff}_${badgeMileStones[i]}`); // 复用图片
            cardItems.push(cardInfo);
        }
    }
    return cardItems;
}
export function getDegreeCardItems(degrees: Array<number>): Array<CardInfo> {
    // degrees = [];
    let targets: Array<number> = [];
    let badgeMileStones = DEGREE_LEVEL_LIST; // 百分比成就标准
    // //调试用
    // let tasksInfo :Array<ITaskItem> =  TaskMapById;
    // //获取target
    // for(let k = 0; k <= 6; k++){
    //   if(Number(TaskMapById[k].targetValue))
    //     targets.push(Number(TaskMapById[k].targetValue))
    //   else{
    //     targets.push(0)
    //   }
    // }
    // for(let k = 0; k <= 6; k++){
    //   if(targets[k] == 0) continue;
    //   if(Number(TaskMapById[k].finValue))
    //     degrees.push(Number(TaskMapById[k].finValue)/targets[k])
    //   else{
    //     degrees.push(0)
    //   }
    // }
    let ContinueList: Array<string> = ['喝水', '吃苹果', '每日微笑', '每日刷牙', '跑步'];
    let cardItems: Array<CardInfo> = [];
    // 经测试以下逻辑无误
    // degrees[0] = 2;
    // degrees[1] = 4;
    for (let k = 0; k < ContinueList.length; k++) {
        for (let i = 0; i < badgeMileStones.length; i++) {
            let onOrOff = degrees[k] >= badgeMileStones[i] ? 'on' : 'off';
            let titleContent = String(badgeMileStones[i] * 100);
            let cardInfo: CardInfo = new CardInfo();
            cardInfo.titleContent = titleContent + '%完成' + ContinueList[k];
            cardInfo.achievement = getAchievement(`${onOrOff}__${badgeMileStones[i]}`); // on/off__2/3/4
            cardItems.push(cardInfo);
        }
    }
    return cardItems;
}
function getAchievement(key: string) {
    let result = { "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" };
    switch (key) {
        case 'off_3':
            result = AchievementMap.off_3;
            break;
        case 'on_3':
            result = AchievementMap.on_3;
            break;
        case 'off_7':
            result = AchievementMap.off_7;
            break;
        case 'on_7':
            result = AchievementMap.on_7;
            break;
        case 'off_30':
            result = AchievementMap.off_30;
            break;
        case 'on_30':
            result = AchievementMap.on_30;
            break;
        case 'off_50':
            result = AchievementMap.off_50;
            break;
        case 'on_50':
            result = AchievementMap.on_50;
            break;
        case 'off_73':
            result = AchievementMap.off_73;
            break;
        case 'on_73':
            result = AchievementMap.on_73;
            break;
        case 'off_99':
            result = AchievementMap.off_99;
            break;
        case 'on_99':
            result = AchievementMap.on_99;
            break;
        case 'on__2':
            result = AchievementMap.on__2;
            break;
        case 'off__2':
            result = AchievementMap.off__2;
            break;
        case 'on__3':
            result = AchievementMap.on__3;
            break;
        case 'off__3':
            result = AchievementMap.off__3;
            break;
        case 'on__4':
            result = AchievementMap.on__4;
            break;
        case 'off__4':
            result = AchievementMap.off__4;
            break;
        default:
            break;
    }
    return result;
}
