import relationalStore from "@ohos:data.relationalStore";
export interface TaskTable {
    tableName: string;
    sqlCreate: string;
    columns: string[];
}
export class CommonConstants {
    static readonly RDB_TAG = '[Debug.Rdb]';
    static readonly STORE_CONFIG: relationalStore.StoreConfig = {
        name: 'taskDatabase.db',
        securityLevel: relationalStore.SecurityLevel.S1
    };
    static readonly CUSTOMTASK_TABLE: TaskTable = {
        tableName: 'customtask',
        sqlCreate: 'CREATE TABLE IF NOT EXISTS customtask(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, ' +
            'type INTEGER, reminder TEXT)',
        columns: ['id', 'name', 'type', 'reminder']
    };
    static readonly TABLE_TAG = '[Debug.CustomTaskTable]';
}
