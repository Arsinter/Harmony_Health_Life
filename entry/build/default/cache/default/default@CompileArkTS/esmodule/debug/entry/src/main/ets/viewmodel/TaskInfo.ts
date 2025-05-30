import { oneWeekDictFunc } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
/**
 * TaskInfo
 *
 * @param id
 * @param date
 * @param taskID
 * @param targetValue
 * @param isAlarm
 * @param startTime
 * @param endTime
 * @param frequency
 * @param isDone
 * @param doneValue
 * @param isOpen
 */
export default class TaskInfo {
    id: number;
    date: string;
    taskID: number;
    targetValue: string;
    isAlarm: boolean;
    startTime: string;
    endTime: string;
    frequency: string;
    isDone: boolean;
    finValue: string;
    isOpen: boolean;
    public isTargetReached: boolean;
    constructor(id: number, date: string, taskID: number, targetValue: string, isAlarm: boolean, startTime: string, endTime: string, frequency: string, isDone: boolean, finValue: string, isOpen = false, isTargetReached = false) {
        this.id = id;
        this.date = date;
        this.taskID = taskID;
        this.targetValue = targetValue;
        this.isAlarm = isAlarm;
        this.startTime = startTime;
        this.endTime = endTime;
        this.frequency = frequency;
        this.isDone = isDone;
        this.finValue = finValue;
        this.isOpen = isOpen;
        this.isTargetReached = isTargetReached;
    }
}
export enum taskType {
    'getup' = 1,
    'drinkWater' = 2,
    'eatApple' = 3,
    'smile' = 4,
    'brushTeeth' = 5,
    'sleepEarly' = 6,
    //新增跑步
    'run' = 7,
    //新增自定义时间类
    'custom' = 8,
    //新增自定义次数类
    'custom2' = 9
}
export const oneWeek = oneWeekDictFunc();
