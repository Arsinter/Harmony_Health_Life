import relationalStore from "@ohos:data.relationalStore";
import GlobalInfo from "@bundle:com.example.healthy_life/entry/ets/viewmodel/GlobalInfo";
import { CommonConstants as Const } from "@bundle:com.example.healthy_life/entry/ets/common/constants/CommonConstants";
import RdbUtils from "@bundle:com.example.healthy_life/entry/ets/common/database/rdb/RdbUtils";
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
class GlobalInfoApi {
    async queryInstant(id: number = 0): Promise<GlobalInfo> {
        let predicates = new relationalStore.RdbPredicates(Const.GLOBAL_INFO.tableName ? Const.GLOBAL_INFO.tableName : '');
        predicates.equalTo('id', Number(id));
        let resultSet = await RdbUtils.query(predicates);
        let count = resultSet.rowCount;
        if (count === 0) {
            Logger.info('GlobalInfoTable', 'query no results!');
            let result = new GlobalInfo('', '', 0, '');
            return result;
        }
        else {
            let result = new GlobalInfo('', '', 0, '');
            resultSet.goToFirstRow();
            result.firstDate = resultSet.getString(resultSet.getColumnIndex('firstDate'));
            result.lastDate = resultSet.getString(resultSet.getColumnIndex('lastDate'));
            result.checkInDays = resultSet.getDouble(resultSet.getColumnIndex('checkInDays'));
            result.achievements = resultSet.getString(resultSet.getColumnIndex('achievements'));
            return result;
        }
    }
    /**
     * Insert globalInfo.
     *
     * @param globalInfo
     * @param callback
     */
    insertData(globalInfo: GlobalInfo, callback: Function, id: number = 0): void {
        const valueBucket = generateBucket(globalInfo);
        if (id) {
            valueBucket['id'] = id;
        }
        RdbUtils.insert('GlobalInfo', valueBucket).then(result => {
            callback(result);
        });
        Logger.info('GlobalInfoTable', 'Insert globalInfo finished.');
    }
    /**
     * Update globalInfo.
     *
     * @param globalInfo
     * @param callback
     */
    updateData(globalInfo: GlobalInfo, callback: Function): void {
        const valueBucket = generateBucket(globalInfo);
        let predicates = new relationalStore.RdbPredicates(Const.GLOBAL_INFO.tableName ? Const.GLOBAL_INFO.tableName : '');
        predicates.equalTo('id', 0);
        RdbUtils.update(valueBucket, predicates).then((result: number) => {
            callback(result);
        });
        Logger.info('GlobalInfoTable', 'Update globalInfo finished.');
    }
    /**
     * Query globalInfo.
     *
     * @param callback
     */
    query(callback: Function, id: number = 0): void {
        let predicates = new relationalStore.RdbPredicates(Const.GLOBAL_INFO.tableName ? Const.GLOBAL_INFO.tableName : '');
        predicates.equalTo('id', Number(id));
        RdbUtils.query(predicates).then(resultSet => {
            let count = resultSet.rowCount;
            if (count === 0) {
                Logger.info('GlobalInfoTable', 'query no results!');
                let result = new GlobalInfo('', '', 0, '');
                callback(result);
            }
            else {
                let result = new GlobalInfo('', '', 0, '');
                resultSet.goToFirstRow();
                result.firstDate = resultSet.getString(resultSet.getColumnIndex('firstDate'));
                result.lastDate = resultSet.getString(resultSet.getColumnIndex('lastDate'));
                result.checkInDays = resultSet.getDouble(resultSet.getColumnIndex('checkInDays'));
                result.achievements = resultSet.getString(resultSet.getColumnIndex('achievements'));
                callback(result);
            }
        });
    }
}
function generateBucket(globalInfo: GlobalInfo): relationalStore.ValuesBucket {
    let valueBucket = {} as relationalStore.ValuesBucket;
    Const.GLOBAL_INFO.columns?.forEach((item: string) => {
        if (item === 'id') {
            valueBucket[item] = 0;
        }
        else {
            switch (item) {
                case 'firstDate':
                    valueBucket[item] = globalInfo.firstDate;
                    break;
                case 'lastDate':
                    valueBucket[item] = globalInfo.lastDate;
                    break;
                case 'checkInDays':
                    valueBucket[item] = globalInfo.checkInDays;
                    break;
                case 'achievements':
                    valueBucket[item] = globalInfo.achievements;
                    break;
                default:
                    break;
            }
        }
    });
    return valueBucket;
}
let globalInfoApi = new GlobalInfoApi();
export default globalInfoApi as GlobalInfoApi;
