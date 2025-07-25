import type ColumnInfo from '../../../viewmodel/ColumnInfo';
import Logger from "@bundle:com.example.healthy_life/entry/ets/common/utils/Logger";
class TableHelper {
    createTableSql(tableName: string, columns: Array<ColumnInfo>): string {
        let sql = `create table if not exists ${tableName}(`;
        for (let column of columns) {
            //Logger.info(`我来看看column是什么 : ${JSON.stringify(columns)},kkkkkkk${JSON.stringify(tableName)}`);
            sql = sql.concat(`${column.name} ${column.type}`);
            sql = sql.concat(`${column.length && column.length > 0 ? `(${column.length})` : ''}`);
            sql = sql.concat(`${column.primary ? ' primary key' : ''}`);
            sql = sql.concat(`${column.autoincrement ? ' autoincrement' : ''}`);
            sql = sql.concat(`${column.nullable ? '' : ' not null'}`);
            sql = sql.concat(', ');
            Logger.info('sql是啥啊', sql);
        }
        sql = `${sql.substring(0, sql.length - 2)})`;
        return sql;
    }
    addTableColumnSql(tableName: string, column: ColumnInfo): string {
        Logger.info(`TableHelper updateTableSql : ${JSON.stringify(column)}`);
        let sql = `alter table ${tableName} add `;
        sql = sql.concat(`${column.name} ${column.type}`);
        sql = sql.concat(`${column.length && column.length > 0 ? `(${column.length})` : ''}`);
        Logger.info(`TableHelper updateTableSql : ` + sql);
        return sql;
    }
    deleteTableSql(tableName: string): string {
        Logger.info(`TableHelper deleteTableSql : ${JSON.stringify(tableName)}`);
        return `drop table if exists ${tableName}`;
    }
}
const tableHelper = new TableHelper();
export default tableHelper;
