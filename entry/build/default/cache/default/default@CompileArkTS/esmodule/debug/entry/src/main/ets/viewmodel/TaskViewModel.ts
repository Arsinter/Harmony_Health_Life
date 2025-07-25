import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
import reminder from "@bundle:com.example.healthy_life/entry/ets/service/ReminderAgent";
import TaskInfoApi from "@bundle:com.example.healthy_life/entry/ets/common/database/tables/TaskInfoApi";
import { padTo2Digits } from "@bundle:com.example.healthy_life/entry/ets/common/utils/Utils";
import { oneWeek } from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import type TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import { TaskMapById, RemindContentMap } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import type { ITaskItem } from "@bundle:com.example.healthy_life/entry/ets/model/TaskInitList";
import PublishReminderInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/PublishReminderInfo";
const publishReminder = reminder.publishReminder;
const cancelReminder = reminder.cancelReminder;
const hasNotificationId = reminder.hasNotificationId;
export const taskOriginData: ITaskItem[] = TaskMapById;
/**
 * @description Get all task status
 * @return object[] Database query results
 */
export const getAllTask = () => {
    return new Promise<TaskInfo[]>((resolve) => {
        TaskInfoApi.query(Const.GLOBAL_KEY, true, (res: TaskInfo[]) => {
            if (res?.length === 0) {
                Logger.warn('queryTaskList', 'has no data!!');
                resolve(res ?? []);
            }
            resolve(res);
        });
    });
};
/**
 * @description Call notification capability
 * @param params {
 *  hour: Hour
 *  minute: Minute
 *  daysOfWeek: Frequency of a week
 *  title: Notice Title
 *  content: Contents of notice
 *  notificationId: Notification ID
 */
const useReminder = (params: TaskInfo, context: Context) => {
    try {
        let publishReminderInfo = new PublishReminderInfo();
        publishReminderInfo.hour = Number(params?.startTime.split(':')[0]);
        publishReminderInfo.minute = Number(params?.startTime.split(':')[1]);
        publishReminderInfo.daysOfWeek = params?.frequency.split(',').map(item => Number(item));
        publishReminderInfo.title = RemindContentMap[params?.taskID - 1].title;
        publishReminderInfo.content = RemindContentMap[params?.taskID - 1].content;
        publishReminderInfo.notificationId = params?.taskID;
        publishReminder(publishReminderInfo, context);
    }
    catch (error) {
        Logger.error('publishReminder', JSON.stringify(error));
    }
};
/**
 * @description Call cancel notification capability
 * @param reminderId Notification ID
 */
const useCancelReminder = (reminderId: number, context: Context) => {
    try {
        cancelReminder(reminderId, context);
    }
    catch (error) {
        Logger.error('cancelReminder', JSON.stringify(error));
    }
};
/**
 * @description Determine whether there is a notification
 * @param notificationId Notification ID
 */
const isHasNotificationId = (notificationId: number) => {
    return new Promise<boolean>((resolve) => {
        resolve(hasNotificationId(notificationId));
    });
};
/**
 * @param params:TaskInfo
 */
export const addTask = (params: TaskInfo, context: Context) => {
    if (!params) {
        Logger.error('addTask', 'params is null!');
        return new Promise<number>((resolve) => {
            resolve(-1);
        });
    }
    return new Promise<number>(async (resolve, reject) => {
        Logger.info('TaskViewModel', 'addTask');
        if (params?.isOpen) {
            if (params?.isAlarm) {
                useReminder(params, context);
            }
            else {
                isHasNotificationId(params?.taskID).then((flag: boolean) => {
                    if (flag) {
                        useCancelReminder(params.taskID, context);
                    }
                });
            }
        }
        else {
            isHasNotificationId(params?.taskID).then((flag: boolean) => {
                if (flag) {
                    useCancelReminder(params.taskID, context);
                }
            });
        }
        TaskInfoApi.updateDataByDate(params, (flag: number) => {
            if (!flag) {
                Logger.error('insertTaskSetting', 'updateTaskSetting Error!我是flag');
                reject(flag);
            }
            resolve(flag);
        });
        let taskInfoStr = JSON.stringify(params);
        let taskInfo: TaskInfo = JSON.parse(taskInfoStr);
        taskInfo.date = new Date().toDateString();
        //bug 第一次设置后为false表示没完成
        //taskInfo.isDone = true;
        taskInfo.isDone = false;
        //Logger.info('see_isdone', JSON.stringify(taskInfo));
        TaskInfoApi.updateDataByDate(taskInfo, (flag: number) => {
            if (!flag) {
                Logger.error('insertTaskSetting', 'updateTaskSetting Error!');
                reject(flag);
            }
            resolve(flag);
        });
    });
};
/**
 * @description Used to initialize task list data from database data
 * @param taskInitList Task list initial data
 * @param taskInfoData Database query data
 */
export const taskIndexDataInit = (taskInitList: ITaskItem[], taskInfoData: TaskInfo[]) => {
    const afterInitData = taskInitList.map((content) => {
        taskInfoData.forEach((item) => {
            if (item?.taskID === content?.taskID) {
                content.isOpen = item?.isOpen;
                content.targetValue = item?.targetValue;
                content.isAlarm = item?.isAlarm;
                content.startTime = item?.startTime;
                content.endTime = item?.endTime;
                content.frequency = item?.frequency;
            }
        });
        return content;
    });
    return afterInitData;
};
/**
 * @description format data as json string
 * @param params = {}
 */
export const formatParams = (params: ITaskItem) => {
    return JSON.stringify(params);
};
/**
 * @description Initialization frequency string
 * @param frequencyIdCollection
 * @return string Frequency string
 */
export const initFrequencyString = (frequencyIdCollection: string) => {
    if (frequencyIdCollection === '') {
        return Const.EVERYDAY;
    }
    const frequencyIdArray: Array<number> = frequencyIdCollection.split(',').map(item => Number(item) - 1);
    const length = frequencyIdArray.length;
    if (length === 7) {
        return Const.EVERYDAY;
    }
    const frequencyString = frequencyIdArray.reduce((pre, current) => {
        return pre + ' ' + oneWeek[current];
    }, '');
    return frequencyString;
};
/**
 * @description Returns the timestamp of today's selected time
 * @param currentTime
 * @return timestamp
 */
export function returnTimeStamp(currentTime: string) {
    const timeString = `${new Date().toDateString()} ${currentTime}`;
    return new Date(timeString).getTime();
}
/**
 * @description It is used for formatting time and displayed in the form of HH: mm
 * @param value
 */
export const formatTime = (value: TimePickerResult) => {
    let hour = value?.hour ? value?.hour : 8;
    let minute = value?.minute ? value?.minute : 0;
    return `${padTo2Digits(hour)}:${padTo2Digits(minute)}`;
};
/**
 * @description Generate the range of smiling 1 - 3
 * @return Array<string>
 */
export const createSmileRange = () => {
    const simleRangeArr: Array<string> = [];
    for (let i = 1; i <= Const.SMILE_MAX_RANGE; i++) {
        simleRangeArr.push(`${i} 次`);
    }
    return simleRangeArr;
};
/**
 * @description Generate the range of brushing teeth 1 - 3
 * @return Array<string>
 */
export const createTeethRange = () => {
    const teethRangeArr: Array<string> = [];
    for (let i = 1; i <= Const.BRUSH_TEETH_MAX_RANGE; i++) {
        teethRangeArr.push(`${i} 次`);
    }
    return teethRangeArr;
};
/**
 * @description Range of generated drinking water 0.25 - 5 L
 * @return Array<string>
 */
export const createDrinkRange = () => {
    const drinkRangeArr: Array<string> = [];
    for (let i = Const.DRINK_STEP; i <= Const.DRINK_MAX_RANGE; i += Const.DRINK_STEP) {
        drinkRangeArr.push(`${i / Const.TIMES_100} L`);
    }
    return drinkRangeArr;
};
/**
 * @description Generate the range of eating apples 1 - 100
 * @return Array<string>
 */
export const createAppleRange = () => {
    const appleRangeArr: Array<string> = [];
    for (let i = 1; i <= Const.EAT_APPLE_RANGE; i++) {
        appleRangeArr.push(`${i} 个`);
    }
    return appleRangeArr;
};
/**
 * @description Generate the range of running 1 - 20 km
 * @return Array<string>
 */
export const createRunRange = () => {
    const runRangeArr: Array<string> = [];
    for (let i = 1; i <= 20; i += 0.5) {
        runRangeArr.push(`${i} 公里`);
    }
    return runRangeArr;
};
/**
 * @description Generate the range of custom2  1 - 100
 * @return Array<string>
 */
export const createCustom2Range = () => {
    const custom2RangeArr: Array<string> = [];
    for (let i = 1; i <= 100; i++) {
        custom2RangeArr.push(`${i} 次`);
    }
    return custom2RangeArr;
};
