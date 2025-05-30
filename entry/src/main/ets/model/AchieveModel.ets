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

import { ACHIEVEMENT_LEVEL_LIST, DEGREE_LEVEL_LIST, TaskMapById } from './TaskInitList';
import GlobalInfo from '../viewmodel/GlobalInfo';
import GlobalInfoApi from '../common/database/tables/GlobalInfoApi';
import { relationalStore } from '@kit.ArkData';
import RdbUtils from '../common/database/rdb/RdbUtils';
import TaskInfo from '../viewmodel/TaskInfo';

export const ACHIEVEMENT_LEVEL_KEY = 'AchievementLevelKey';

export const SINGLE_LEVEL_KEYS = ['AchievementGetEarly','AchievementDrink','AchievementApple',
  'AchievementSmile','AchievementBrush','AchievementSleepEarly','AchievementRun'];
export const SINGLE_LEVEL_KEY_LIST = 'SingleLevelKeyList'

export const DEGREE_LEVEL_KEY_LIST = 'DegreeLevelKeyList'
export const SINGLE_DEGREE_KEYS = ['DegreeGetEarly','DegreeDrink','DegreeApple',
  'DegreeSmile','DegreeBrush','DegreeSleepEarly','DegreeRun'];

export function getAchievementLevel() {
  GlobalInfoApi.query((res: GlobalInfo) => {
    let globalInfo: GlobalInfo = res;
    let achievementStr = globalInfo.achievements ?? '';
    let achievements = achievementStr.split(',');
    if (achievements.length > 0) {
      AppStorage.set<Number>(ACHIEVEMENT_LEVEL_KEY, Number(achievements[achievements.length - 1]));
    }
  })
}

export function getSingleLevel() {
  let successiveDays: Array<number> = [];
  for(let i = 1; i <= 7; i++){
    GlobalInfoApi.query((res: GlobalInfo) => {
      let globalInfo: GlobalInfo = res;
      let achievementStr = globalInfo.achievements ?? '';
      let achievements = achievementStr.split(',');
      if (achievements.length > 0) {
        AppStorage.set<Number>(SINGLE_LEVEL_KEYS[i-1], Number(achievements[achievements.length - 1]));
      }
      if (achievements.length > 1) {
        successiveDays.push(Number(achievements[achievements.length - 1]));
      }
      else successiveDays.push(0);
    }, i)
  }
  AppStorage.set<Array<number>>(SINGLE_LEVEL_KEY_LIST, successiveDays);

}

export async function getSingleDegree() {
  let degrees: Array<number> = [];
  let targets: Array<number> = [];
  let badgeMileStones = DEGREE_LEVEL_LIST;   // 百分比成就标准
  //获取target
  for(let k = 0; k <= 6; k++){
    if(Number(TaskMapById[k].targetValue))
      targets.push(Number(TaskMapById[k].targetValue))
    else{
      targets.push(0)
    }
  }
  // 获取fin并算出degree

  // 方法1
  for(let k = 0; k <= 6; k++) {
    if(targets[k] == 0) continue;
    let predicates = new relationalStore.RdbPredicates('taskInfo');
    predicates.equalTo('id', k+1);
    let resultSet = await RdbUtils.query(predicates).then(resultSet => {
      if(!resultSet){
        degrees.push(2);
      }else{
        let fin = Number(resultSet.getString(resultSet.getColumnIndex('finValue')));
        degrees.push(fin/targets[k]);
      }
    });

  }

  // 方法2
  // for(let k = 0; k <= 6; k++){
  //   if(targets[k] == 0) continue;
  //   if(Number(TaskMapById[k].finValue))
  //     degrees.push(Number(TaskMapById[k].finValue)/targets[k])
  //   else{
  //     degrees.push(0)
  //   }
  // }


  AppStorage.set<Array<number>>(DEGREE_LEVEL_KEY_LIST, degrees);

}

export function isReachNewAchievement(globalInfo: GlobalInfo): boolean {
  let achievementStr = globalInfo.achievements ?? '';
  let achievements = achievementStr.split(',');
  if (ACHIEVEMENT_LEVEL_LIST.indexOf(globalInfo.checkInDays) >= 0 && achievements.indexOf(String(globalInfo.checkInDays)) < 0) {
    return true;
  }
  return false;
}



