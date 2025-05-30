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

export interface InfoItem {
  id: string;
  title: Resource;
  content?: string;
  icon?: Resource;
}

export const MineInfoList: InfoItem[] = [
  {
    id: '1',
    title:$r('app.string.mine_nickname'), // 昵称
    content:'nickname'
  },
  {
    id: '2',
    title:$r('app.string.mine_gender'), // 昵称
    content:'gender'   // 性别
  },
  {
    id: '3',
    title:$r('app.string.mine_birthday'), // 昵称
    content:'birthday'   // 出生日期
  },
  {
    id: '4',
    title:$r('app.string.mine_height'), // 昵称
    content:'height'   // 身高
  },
  {
    id: '5',
    title:$r('app.string.mine_weight'), // 昵称
    content:'weight'   // 体重
  },
  {
    id: '6',
    title: $r('app.string.mine_check_updates')  // 检查更新
  },
  {
    id: '7',
    title: $r('app.string.mine_about')  // 关于
  }
];