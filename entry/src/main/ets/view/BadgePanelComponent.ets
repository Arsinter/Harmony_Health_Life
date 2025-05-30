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

import { BadgeCard } from './BadgeCardComponent'
import {
  DEGREE_LEVEL_KEY_LIST,
  getAchievementLevel,
  getSingleDegree,
  getSingleLevel, SINGLE_LEVEL_KEY_LIST } from '../model/AchieveModel'
import { getBadgeCardItems, getContinueCardItems, getDegreeCardItems } from '../viewmodel/AchievementViewModel'
import Logger from '../common/utils/Logger'
import { ACHIEVEMENT_LEVEL_KEY } from '../model/AchieveModel'
import { CommonConstants as Const } from '../common/constants/CommonConstants';
import CardInfo from '../viewmodel/CardInfo'

let achievementDebug = true;

// 连续打卡全部代办天数
let DebugDays: number = 99;
// 连续早起打卡天数，连续喝水打卡天数，连续吃苹果打卡天数，连续每日微笑打卡天数，连续刷牙打卡天数，连续早睡打卡天数，连续跑步打卡天数，
let DebugSingleCont: Array<number> = [3,7,30,3,7,30,3];
// 喝水最高完成度，吃苹果最高完成度，每日微笑最高完成度，刷牙最高完成度，跑步最高完成度(n表示n倍完成任务）
let DebugDegree: Array<number> = [2,3,4,1,2];

@Component
export struct BadgePanel {
  @StorageProp(ACHIEVEMENT_LEVEL_KEY) successiveDays: number = 0;//自动同步登陆日期与ALK

  aboutToAppear() {
    Logger.debug('BadgePanel', 'aboutToAppear');
    getAchievementLevel();//获取活跃天数
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      if(achievementDebug){
        ForEach(getBadgeCardItems(DebugDays), (item: CardInfo) => {
          BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
        })
      }else{
        ForEach(getBadgeCardItems(this.successiveDays), (item: CardInfo) => {
          BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
        })
      }

    }
    .width(Const.FULL_WIDTH)
  }
}

@Preview
@Component
export struct SingleBadgePanel {
  @StorageProp(SINGLE_LEVEL_KEY_LIST) successiveDays: Array<number> = [];

  aboutToAppear() {
    Logger.debug('SingleBadgePanel', 'aboutToAppear');
    getSingleLevel();
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      if(achievementDebug){
        ForEach(getContinueCardItems(DebugSingleCont), (item: CardInfo) => {
          BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
        })
      }else{
        ForEach(getContinueCardItems(this.successiveDays), (item: CardInfo) => {
          BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
        })
      }
    }
    .width(Const.FULL_WIDTH)
  }
}

@Component
export struct DegreeBadgePanel {
  @StorageProp(DEGREE_LEVEL_KEY_LIST) degrees: Array<number> = [];

  aboutToAppear() {
    Logger.debug('DegreeBadgePanel', 'aboutToAppear');
    getSingleDegree();
  }

  build() {
    Flex({ direction: FlexDirection.Row, wrap: FlexWrap.Wrap }) {
      if(achievementDebug){
        ForEach(getDegreeCardItems(DebugDegree), (item: CardInfo) => {
          BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
        })
      }else{
        ForEach(getDegreeCardItems(this.degrees), (item: CardInfo) => {
          BadgeCard({ content: item.titleContent, imgSrc: item.achievement })
        })
      }
    }
    .width(Const.FULL_WIDTH)
  }
}
