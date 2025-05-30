import { relationalStore } from '@kit.ArkData';
import TaskData from '../../../viewmodel/TaskData';
import { CommonConstants } from '../../constants/TaskConstants';
import CustomTaskHelper from '../rdb/CustomTaskHelper';

export default class CustomTaskApi {
  private taskTable = new CustomTaskHelper(CommonConstants.CUSTOMTASK_TABLE.tableName, CommonConstants.CUSTOMTASK_TABLE.sqlCreate, CommonConstants.CUSTOMTASK_TABLE.columns);

  constructor(callback: Function = () => {}) {
    this.taskTable.getRdbStore(callback);
  }

  getRdbStore(callback: Function = () => {}) {
    this.taskTable.getRdbStore(callback);
  }

  insertData(task: TaskData, callback: Function) {
    const valueBucket: relationalStore.ValuesBucket = generateBucket(task);
    this.taskTable.insertData(valueBucket, callback);
  }

  deleteData(task: TaskData, callback: Function) {
    let predicates = new relationalStore.RdbPredicates(CommonConstants.CUSTOMTASK_TABLE.tableName);
    predicates.equalTo('id', task.id);
    this.taskTable.deleteData(predicates, callback);
  }

  updateData(task: TaskData, callback: Function) {
    const valueBucket: relationalStore.ValuesBucket = generateBucket(task);
    let predicates = new relationalStore.RdbPredicates(CommonConstants.CUSTOMTASK_TABLE.tableName);
    predicates.equalTo('id', task.id);
    this.taskTable.updateData(predicates, valueBucket, callback);
  }

  query(id: number, callback: Function, isAll: boolean = true) {
    let predicates = new relationalStore.RdbPredicates(CommonConstants.CUSTOMTASK_TABLE.tableName);
    if (!isAll) {
      predicates.equalTo('id', id);
    }
    this.taskTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
      let count: number = resultSet.rowCount;
      if (count === 0 || typeof count === 'string') {
        console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
        callback([]);
      } else {
        resultSet.goToFirstRow();
        const result: TaskData[] = [];
        for (let i = 0; i < count; i++) {
          let tmp: TaskData = {
            id: 8, // 恒为8
            name: '',
            type: 1, // 默认类型1
            reminder: ''
          };
          tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
          tmp.name = resultSet.getString(resultSet.getColumnIndex('name'));
          tmp.type = resultSet.getDouble(resultSet.getColumnIndex('type'));
          tmp.reminder = resultSet.getString(resultSet.getColumnIndex('reminder'));
          result[i] = tmp;
          resultSet.goToNextRow();
        }
        callback(result);
      }
    });
  }
}

function generateBucket(task: TaskData): relationalStore.ValuesBucket {
  let obj: relationalStore.ValuesBucket = {};
  obj.id = task.id;
  obj.name = task.name;
  obj.type = task.type;
  obj.reminder = task.reminder;
  return obj;
}
