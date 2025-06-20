import type { Lunar } from './Lunar';
import type { Yun } from './Yun';
import { LunarUtil } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/LunarUtil";
import { LiuNian } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/LiuNian";
import { XiaoYun } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/XiaoYun";
export class DaYun {
    private readonly _startYear: number;
    private readonly _endYear: number;
    private readonly _startAge: number;
    private readonly _endAge: number;
    private readonly _index: number;
    private _yun: Yun;
    private readonly _lunar: Lunar;
    constructor(yun: Yun, index: number) {
        const lunar = yun.getLunar();
        const birthYear = lunar.getSolar().getYear();
        const year = yun.getStartSolar().getYear();
        let startYear, startAge, endYear, endAge;
        if (index < 1) {
            startYear = birthYear;
            startAge = 1;
            endYear = year - 1;
            endAge = year - birthYear;
        }
        else {
            startYear = year + (index - 1) * 10;
            startAge = startYear - birthYear + 1;
            endYear = startYear + 9;
            endAge = startAge + 9;
        }
        this._startYear = startYear;
        this._endYear = endYear;
        this._startAge = startAge;
        this._endAge = endAge;
        this._index = index;
        this._yun = yun;
        this._lunar = lunar;
    }
    getStartYear(): number {
        return this._startYear;
    }
    getEndYear(): number {
        return this._endYear;
    }
    getStartAge(): number {
        return this._startAge;
    }
    getEndAge(): number {
        return this._endAge;
    }
    getIndex(): number {
        return this._index;
    }
    getLunar(): Lunar {
        return this._lunar;
    }
    getGanZhi(): string {
        if (this._index < 1) {
            return '';
        }
        let offset = LunarUtil.getJiaZiIndex(this._lunar.getMonthInGanZhiExact());
        offset += this._yun.isForward() ? this._index : -this._index;
        const size = LunarUtil.JIA_ZI.length;
        if (offset >= size) {
            offset -= size;
        }
        if (offset < 0) {
            offset += size;
        }
        return LunarUtil.JIA_ZI[offset];
    }
    getXun(): string {
        return LunarUtil.getXun(this.getGanZhi());
    }
    getXunKong(): string {
        return LunarUtil.getXunKong(this.getGanZhi());
    }
    getLiuNian(n: number = 10): LiuNian[] {
        if (this._index < 1) {
            n = this._endYear - this._startYear + 1;
        }
        const l: LiuNian[] = [];
        for (let i = 0; i < n; i++) {
            l.push(new LiuNian(this, i));
        }
        return l;
    }
    getXiaoYun(n: number = 10): XiaoYun[] {
        if (this._index < 1) {
            n = this._endYear - this._startYear + 1;
        }
        const l: XiaoYun[] = [];
        for (let i = 0; i < n; i++) {
            l.push(new XiaoYun(this, i, this._yun.isForward()));
        }
        return l;
    }
}
