import relationalStore from "@ohos:data.relationalStore";
import TaskInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/TaskInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import RdbUtils from "@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
class TaskInfoApi {
    /**
     * insert taskInfo
     *
     * @param taskInfo
     * @param callback
     */
    insertData(taskInfo: TaskInfo, callback: Function): void {
        const valueBucket = generateBucket(taskInfo);
        RdbUtils.insert('taskInfo', valueBucket).then(result => {
            callback(result);
        });
        Logger.info('TaskInfoTable', `Insert taskInfo {${taskInfo.date}:${taskInfo.taskID}} finished.`);
    }
    /**
     * delete taskInfo
     *
     * @param taskInfo
     * @param callback
     */
    deleteDataByID(taskInfo: TaskInfo, callback: Function): void {
        let tableName = Const.TASK_INFO.tableName;
        if (!tableName) {
            return;
        }
        let predicates = new relationalStore.RdbPredicates(tableName);
        predicates.equalTo('date', taskInfo.date).and().equalTo('taskID', taskInfo.taskID);
        RdbUtils.del(predicates).then(result => {
            callback(result);
        });
        Logger.info('TaskInfoTable', `Delete taskInfo {${taskInfo.date}:${taskInfo.taskID}} finished.`);
    }
    /**
     * update taskInfo
     *
     * @param taskInfo
     * @param callback
     */
    updateDataByDate(taskInfo: TaskInfo, callback: Function): void {
        const valueBucket = generateBucket(taskInfo);
        let tableName = Const.TASK_INFO.tableName;
        if (!tableName) {
            return;
        }
        //Logger.info('我是tablename',JSON.stringify(tableName));
        let predicates = new relationalStore.RdbPredicates(tableName);
        predicates.equalTo('date', taskInfo.date).and().equalTo('taskID', taskInfo.taskID);
        RdbUtils.update(valueBucket, predicates).then((result: number) => {
            callback(result);
        });
        Logger.info('TaskInfoTable', `Update data {${taskInfo.date}:${taskInfo.taskID}} finished.`);
    }
    /**
     * query taskInfo
     *
     * @param date
     * @param callback
     */
    query(date: string, isOpen: boolean = true, callback: Function): void {
        let tableName = Const.TASK_INFO.tableName;
        if (!tableName) {
            return;
        }
        let predicates = new relationalStore.RdbPredicates(tableName);
        predicates.equalTo('date', date);
        if (isOpen) {
            predicates.equalTo('isOpen', true);
        }
        predicates.orderByAsc('taskID');
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0 || typeof count === 'string') {
                Logger.error('TaskInfoTable', `${date} query no results!`);
                const result: TaskInfo[] = [];
                callback(result);
            }
            else {
                resultSet.goToFirstRow();
                const result: TaskInfo[] = [];
                for (let i = 0; i < count; i++) {
                    let tmp = new TaskInfo(0, '', 0, '', false, '', '', '', false, '');
                    tmp.isOpen = resultSet.getDouble(resultSet.getColumnIndex('isOpen')) ? true : false;
                    tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
                    tmp.date = resultSet.getString(resultSet.getColumnIndex('date'));
                    tmp.taskID = resultSet.getDouble(resultSet.getColumnIndex('taskID'));
                    tmp.targetValue = resultSet.getString(resultSet.getColumnIndex('targetValue'));
                    tmp.isAlarm = resultSet.getDouble(resultSet.getColumnIndex('isAlarm')) ? true : false;
                    tmp.startTime = resultSet.getString(resultSet.getColumnIndex('startTime'));
                    tmp.endTime = resultSet.getString(resultSet.getColumnIndex('endTime'));
                    tmp.frequency = resultSet.getString(resultSet.getColumnIndex('frequency'));
                    tmp.isDone = resultSet.getDouble(resultSet.getColumnIndex('isDone')) ? true : false;
                    tmp.finValue = resultSet.getString(resultSet.getColumnIndex('finValue'));
                    result[i] = tmp;
                    resultSet.goToNextRow();
                }
                callback(result);
            }
        });
    }
}
function generateBucket(taskInfo: TaskInfo): relationalStore.ValuesBucket {
    let valueBucket = {} as relationalStore.ValuesBucket;
    Const.TASK_INFO.columns?.forEach((item: string) => {
        if (item !== 'id') {
            switch (item) {
                case 'date':
                    valueBucket[item] = taskInfo.date;
                    break;
                case 'taskID':
                    valueBucket[item] = taskInfo.taskID;
                    break;
                case 'targetValue':
                    valueBucket[item] = taskInfo.targetValue;
                    break;
                case 'isAlarm':
                    valueBucket[item] = taskInfo.isAlarm;
                    break;
                case 'startTime':
                    valueBucket[item] = taskInfo.startTime;
                    break;
                case 'endTime':
                    valueBucket[item] = taskInfo.endTime;
                    break;
                case 'frequency':
                    valueBucket[item] = taskInfo.frequency;
                    break;
                case 'isDone':
                    valueBucket[item] = taskInfo.isDone;
                    break;
                case 'finValue':
                    valueBucket[item] = taskInfo.finValue;
                    break;
                case 'isOpen':
                    valueBucket[item] = taskInfo.isOpen;
                    break;
                default:
                    break;
            }
        }
    });
    return valueBucket;
}
let taskInfoApi = new TaskInfoApi();
export default taskInfoApi as TaskInfoApi;
