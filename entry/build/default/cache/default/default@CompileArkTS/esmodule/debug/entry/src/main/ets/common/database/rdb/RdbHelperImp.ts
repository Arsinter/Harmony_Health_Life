import relationalStore from "@ohos:data.relationalStore";
import tableHelper from "@bundle:com.example.healthy_life/entry/ets/common/database/rdb/TableHelper";
import type { RdbHelper } from './RdbHelper';
import type ColumnInfo from '../../../viewmodel/ColumnInfo';
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
export class RdbHelperImp implements RdbHelper {
    private mDatabaseName: string;
    private rdbStore: relationalStore.RdbStore = {} as relationalStore.RdbStore;
    private storeConfig: relationalStore.StoreConfig = {
        name: '',
        securityLevel: relationalStore.SecurityLevel.S1
    } as relationalStore.StoreConfig;
    constructor(databaseName: string) {
        this.mDatabaseName = databaseName;
    }
    getDbName(): string {
        return this.mDatabaseName;
    }
    getRdb(context: Context): Promise<RdbHelper> {
        this.storeConfig = {
            name: this.mDatabaseName, securityLevel: relationalStore.SecurityLevel.S1
        };
        return new Promise<RdbHelper>((success, error) => {
            relationalStore.getRdbStore(context, this.storeConfig).then(dbStore => {
                this.rdbStore = dbStore;
                success(this);
            }).catch((err: Error) => {
                Logger.error(`initRdb err : ${JSON.stringify(err)}`);
                error(err);
            });
        });
    }
    executeSql(sql: string): Promise<void> {
        Logger.info(`executeSql sql试一下 : ${sql}`);
        return this.rdbStore.executeSql(sql);
    }
    createTable(tableName: string, columns: Array<ColumnInfo>): Promise<void> {
        Logger.info(`createTable tableName : ${tableName}, columns : ${JSON.stringify(columns)}`);
        let createTableSql = tableHelper.createTableSql(tableName, columns);
        Logger.info(`createTable tableName3164 : ${createTableSql}`);
        return this.executeSql(createTableSql);
    }
    deleteTable(tableName: string): Promise<void> {
        Logger.info(`deleteTable tableName : ${tableName}`);
        let deleteTableSql = tableHelper.deleteTableSql(tableName);
        return this.executeSql(deleteTableSql);
    }
    addTableColumn(tableName: string, column: ColumnInfo): Promise<void> {
        Logger.info(`addTableColumn tableName : ${tableName}, column : ${JSON.stringify(column)}`);
        let addTableColumnSql = tableHelper.addTableColumnSql(tableName, column);
        return this.executeSql(addTableColumnSql);
    }
    insert(tableName: string, values: relationalStore.ValuesBucket | Array<relationalStore.ValuesBucket>): Promise<number> {
        return new Promise<number>((success, error) => {
            Logger.info(`insert tableName : ${tableName}, values : ${JSON.stringify(values)}`);
            if (!values) {
                Logger.info(`insert failed, values is undefined`);
                error(0);
                return;
            }
            if (values instanceof Array) {
                Logger.info(`insert values isArray = ${values.length}`);
                this.rdbStore.beginTransaction();
                this.saveArray(tableName, values).then(data => {
                    Logger.info(`insert success, data : ${JSON.stringify(data)}`);
                    success(data);
                    this.rdbStore.commit();
                }).catch((err: Error) => {
                    Logger.error(`insert failed, err : ${err}`);
                    error(err);
                    this.rdbStore.commit();
                });
            }
            else {
                this.rdbStore.insert(tableName, values).then(data => {
                    Logger.info(`insert success id : ${data}`);
                    success(data);
                    this.rdbStore.commit();
                }).catch((err: Error) => {
                    Logger.error(`insert failed, err : ${JSON.stringify(err)}`);
                    error(err);
                    this.rdbStore.commit();
                });
            }
        });
    }
    private saveArray(tableName: string, values: Array<relationalStore.ValuesBucket>): Promise<number> {
        return new Promise<number>((success, error) => {
            if (!values || values.length === 0) {
                error(0);
                return;
            }
            let index = 0;
            let callback = (data: number, err: Error) => {
                if (err) {
                    Logger.info(`saveArray failed, err : ${err}`);
                    error(err);
                    return;
                }
                if (data) {
                    if (index < values.length - 1) {
                        this.saveData(tableName, values, ++index, callback);
                    }
                    else {
                        success(data);
                    }
                }
            };
            this.saveData(tableName, values, index, callback);
        });
    }
    private saveData(tableName: string, values: Array<relationalStore.ValuesBucket>, index: number, callback: Function): void {
        Logger.info(`saveData tableName : ${tableName}, index : ${JSON.stringify(index)}`);
        this.rdbStore.insert(tableName, values[index]).then((data: number) => {
            Logger.info(`saveData success id : ${data}`);
            callback(data);
        }).catch((err: Error) => {
            Logger.error(`saveData failed, err : ${err}`);
            callback(err);
        });
    }
    update(values: relationalStore.ValuesBucket, rdbPredicates: relationalStore.RdbPredicates): Promise<number> {
        return this.rdbStore.update(values, rdbPredicates);
    }
    query(rdbPredicates: relationalStore.RdbPredicates, columns?: Array<string>): Promise<relationalStore.ResultSet> {
        Logger.info(`query rdbPredicates : ${JSON.stringify(rdbPredicates)}`);
        return this.rdbStore.query(rdbPredicates, columns);
    }
    queryAll(tableName: string): Promise<relationalStore.ResultSet> {
        Logger.info(`queryAllSize tableName : ${tableName}`);
        return this.rdbStore.querySql(`select * from ${tableName}`);
    }
    queryBySql(sql: string, bindArgs?: Array<relationalStore.ValueType>): Promise<relationalStore.ResultSet> {
        Logger.info(`queryBySql sql : ${sql}`);
        return this.rdbStore.querySql(sql, bindArgs);
    }
    delete(rdbPredicates: relationalStore.RdbPredicates): Promise<number> {
        Logger.info(`delete rdbPredicates : ${JSON.stringify(rdbPredicates)}`);
        return this.rdbStore.delete(rdbPredicates);
    }
}
