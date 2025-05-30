import { relationalStore } from '@kit.ArkData';
import PersonalInfo from '../../../viewmodel/PersonalInfo';
import { CommonConstants as Const } from '../../constants/CommonConstants'
import RdbUtils from '../rdb/RdbUtils';
import Logger from '../../utils/Logger';

import { CommonConstants } from '../../constants/PersonalConstants';
import Rdb from '../rdb/PersonalRdbHelper';

export default class PersonalInfoApi{
  private personalTable = new Rdb(CommonConstants.PERSONALINFO_TABLE.tableName, CommonConstants.PERSONALINFO_TABLE.sqlCreate,
    CommonConstants.PERSONALINFO_TABLE.columns);

  constructor(callback: Function = () => {
  }) {
    this.personalTable.getRdbStore(callback);
  }

  getRdbStore(callback: Function = () => {
  }) {
    this.personalTable.getRdbStore(callback);
  }

  insertData(personalInfo: PersonalInfo, callback: Function): void {
    const valueBucket: relationalStore.ValuesBucket = generateBucket(personalInfo);
    this.personalTable.insertData(valueBucket, callback);
  }

  deleteData(personalInfo: PersonalInfo, callback: Function) {
    let predicates = new relationalStore.RdbPredicates(CommonConstants.PERSONALINFO_TABLE.tableName);
    predicates.equalTo('id', personalInfo.id);
    this.personalTable.deleteData(predicates, callback);
  }

  updateData(personalInfo: PersonalInfo, callback: Function): void {
    const valueBucket: relationalStore.ValuesBucket = generateBucket(personalInfo);
    let predicates = new relationalStore.RdbPredicates(CommonConstants.PERSONALINFO_TABLE.tableName);
    predicates.equalTo('id', personalInfo.id);
    this.personalTable.updateData(predicates, valueBucket, callback);



    RdbUtils.update(valueBucket, predicates).then((result: number) => {
      callback(result);
    });
    Logger.info('PersonalInfoTable', 'Update personalInfo finished.');
  }

  query(id: number, callback: Function, isAll: boolean = true) {
    let predicates = new relationalStore.RdbPredicates(CommonConstants.PERSONALINFO_TABLE.tableName);
    if (!isAll) {
      predicates.equalTo('id', id);
    }
    this.personalTable.query(predicates, (resultSet: relationalStore.ResultSet) => {
      let count: number = resultSet.rowCount;
      if (count === 0 || typeof count === 'string') {
        console.log(`${CommonConstants.TABLE_TAG}` + 'Query no results!');
        callback([]);
      } else {
        resultSet.goToFirstRow();
        const result: PersonalInfo[] = [];
        for (let i = 0; i < count; i++) {
          let tmp: PersonalInfo = {
            id: 0,
            username: 'Jolin',
            birthday: '2003-10-10',
            gender: 'male',
            height: '175',
            weight: '70kg',
            icon: '',
          };
          tmp.id = resultSet.getDouble(resultSet.getColumnIndex('id'));
          tmp.username = resultSet.getString(resultSet.getColumnIndex('username'));
          tmp.birthday = resultSet.getString(resultSet.getColumnIndex('birthday'));
          tmp.gender = resultSet.getString(resultSet.getColumnIndex('gender'));
          tmp.height = resultSet.getString(resultSet.getColumnIndex('height'));
          tmp.weight = resultSet.getString(resultSet.getColumnIndex('weight'));
          tmp.icon = resultSet.getString(resultSet.getColumnIndex('icon'));
          result[i] = tmp;
          resultSet.goToNextRow();
        }
        callback(result);
      }
    });
  }

}

function generateBucket(personal: PersonalInfo): relationalStore.ValuesBucket {
  let obj: relationalStore.ValuesBucket = {};
  obj.username = personal.username;
  obj.birthday = personal.birthday
  obj.gender = personal.gender;
  obj.height = personal.height;
  obj.weight = personal.weight;
  obj.icon = personal.icon;
  return obj;
}