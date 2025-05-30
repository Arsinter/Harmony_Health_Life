import { relationalStore } from '@kit.ArkData';

export interface PersonalInfoTable {
  tableName: string;
  sqlCreate: string;
  columns: string[];
}

export class CommonConstants {

  static readonly GRID_COUNT: number = 2;
  static readonly STORE_CONFIG: relationalStore.StoreConfig = {
    name: 'database.db',
    securityLevel: relationalStore.SecurityLevel.S1
  };
  static readonly PERSONALINFO_TABLE: PersonalInfoTable = {
    tableName: 'PersonalInfoTable',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS PersonalInfoTable(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, ' +
      'birthday TEXT, gender TEXT, height TEXT, weight TEXT, icon TEXT)',
    columns: ['id', 'username', 'birthday', 'gender', 'height', 'weight', 'icon']
  };
  static readonly RDB_TAG = '[Debug.Rdb]';
  static readonly TABLE_TAG = '[Debug.AccountTable]';
  static readonly INDEX_TAG = '[Debug.Index]';
}

//personal