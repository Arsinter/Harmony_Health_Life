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
        title: { "id": 16777246, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        content: 'nickname'
    },
    {
        id: '2',
        title: { "id": 16777244, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        content: 'gender' // 性别
    },
    {
        id: '3',
        title: { "id": 16777242, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        content: 'birthday' // 出生日期
    },
    {
        id: '4',
        title: { "id": 16777245, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        content: 'height' // 身高
    },
    {
        id: '5',
        title: { "id": 16777248, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" },
        content: 'weight' // 体重
    },
    {
        id: '6',
        title: { "id": 16777243, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } // 检查更新
    },
    {
        id: '7',
        title: { "id": 16777241, "type": 10003, params: [], "bundleName": "com.example.healthy_life", "moduleName": "entry" } // 关于
    }
];
