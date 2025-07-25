import { LunarMonth } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/LunarMonth";
import { ShouXingUtil } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/ShouXingUtil";
import { Solar } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/Solar";
import { LunarUtil } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/LunarUtil";
import { NineStar } from "@package:pkg_modules/.ohpm/lunar@1.0.0/pkg_modules/lunar/src/main/ets/NineStar";
export class LunarYear {
    private readonly _year: number;
    private readonly _ganIndex: number;
    private readonly _zhiIndex: number;
    private readonly _months: LunarMonth[];
    private readonly _jieQiJulianDays: number[];
    public static YUAN: string[] = ['下', '上', '中'];
    public static YUN: string[] = ['七', '八', '九', '一', '二', '三', '四', '五', '六'];
    private static _LEAP_11: number[] = [75, 94, 170, 265, 322, 398, 469, 553, 583, 610, 678, 735, 754, 773, 849, 887, 936, 1050, 1069, 1126, 1145, 1164, 1183, 1259, 1278, 1308, 1373, 1403, 1441, 1460, 1498, 1555, 1593, 1612, 1631, 1642, 2033, 2128, 2147, 2242, 2614, 2728, 2910, 3062, 3244, 3339, 3616, 3711, 3730, 3825, 4007, 4159, 4197, 4322, 4341, 4379, 4417, 4531, 4599, 4694, 4713, 4789, 4808, 4971, 5085, 5104, 5161, 5180, 5199, 5294, 5305, 5476, 5677, 5696, 5772, 5791, 5848, 5886, 6049, 6068, 6144, 6163, 6258, 6402, 6440, 6497, 6516, 6630, 6641, 6660, 6679, 6736, 6774, 6850, 6869, 6899, 6918, 6994, 7013, 7032, 7051, 7070, 7089, 7108, 7127, 7146, 7222, 7271, 7290, 7309, 7366, 7385, 7404, 7442, 7461, 7480, 7491, 7499, 7594, 7624, 7643, 7662, 7681, 7719, 7738, 7814, 7863, 7882, 7901, 7939, 7958, 7977, 7996, 8034, 8053, 8072, 8091, 8121, 8159, 8186, 8216, 8235, 8254, 8273, 8311, 8330, 8341, 8349, 8368, 8444, 8463, 8474, 8493, 8531, 8569, 8588, 8626, 8664, 8683, 8694, 8702, 8713, 8721, 8751, 8789, 8808, 8816, 8827, 8846, 8884, 8903, 8922, 8941, 8971, 9036, 9066, 9085, 9104, 9123, 9142, 9161, 9180, 9199, 9218, 9256, 9294, 9313, 9324, 9343, 9362, 9381, 9419, 9438, 9476, 9514, 9533, 9544, 9552, 9563, 9571, 9582, 9601, 9639, 9658, 9666, 9677, 9696, 9734, 9753, 9772, 9791, 9802, 9821, 9886, 9897, 9916, 9935, 9954, 9973, 9992];
    private static _LEAP_12: number[] = [37, 56, 113, 132, 151, 189, 208, 227, 246, 284, 303, 341, 360, 379, 417, 436, 458, 477, 496, 515, 534, 572, 591, 629, 648, 667, 697, 716, 792, 811, 830, 868, 906, 925, 944, 963, 982, 1001, 1020, 1039, 1058, 1088, 1153, 1202, 1221, 1240, 1297, 1335, 1392, 1411, 1422, 1430, 1517, 1525, 1536, 1574, 3358, 3472, 3806, 3988, 4751, 4941, 5066, 5123, 5275, 5343, 5438, 5457, 5495, 5533, 5552, 5715, 5810, 5829, 5905, 5924, 6421, 6535, 6793, 6812, 6888, 6907, 7002, 7184, 7260, 7279, 7374, 7556, 7746, 7757, 7776, 7833, 7852, 7871, 7966, 8015, 8110, 8129, 8148, 8224, 8243, 8338, 8406, 8425, 8482, 8501, 8520, 8558, 8596, 8607, 8615, 8645, 8740, 8778, 8835, 8865, 8930, 8960, 8979, 8998, 9017, 9055, 9074, 9093, 9112, 9150, 9188, 9237, 9275, 9332, 9351, 9370, 9408, 9427, 9446, 9457, 9465, 9495, 9560, 9590, 9628, 9647, 9685, 9715, 9742, 9780, 9810, 9818, 9829, 9848, 9867, 9905, 9924, 9943, 9962, 10000];
    private static _CACHE_YEAR: LunarYear | null = null;
    static fromYear(lunarYear: number): LunarYear {
        let y;
        if (!LunarYear._CACHE_YEAR || LunarYear._CACHE_YEAR.getYear() != lunarYear) {
            y = new LunarYear(lunarYear);
            LunarYear._CACHE_YEAR = y;
        }
        else {
            y = LunarYear._CACHE_YEAR;
        }
        return y;
    }
    constructor(lunarYear: number) {
        this._year = lunarYear;
        this._months = [];
        this._jieQiJulianDays = [];
        const offset = lunarYear - 4;
        let yearGanIndex = offset % 10;
        let yearZhiIndex = offset % 12;
        if (yearGanIndex < 0) {
            yearGanIndex += 10;
        }
        if (yearZhiIndex < 0) {
            yearZhiIndex += 12;
        }
        this._ganIndex = yearGanIndex;
        this._zhiIndex = yearZhiIndex;
        this.compute();
    }
    private compute(): void {
        // 节气
        const jq: number[] = [];
        // 合朔，即每月初一
        const hs: number[] = [];
        // 每月天数，长度15
        const dayCounts: number[] = [];
        const months: number[] = [];
        let i, j;
        const currentYear = this._year;
        let jd = Math.floor((currentYear - 2000) * 365.2422 + 180);
        // 355是2000.12冬至，得到较靠近jd的冬至估计值
        let w = Math.floor((jd - 355 + 183) / 365.2422) * 365.2422 + 355;
        if (ShouXingUtil.calcQi(w) > jd) {
            w -= 365.2422;
        }
        // 25个节气时刻(北京时间)，从冬至开始到下一个冬至以后
        for (i = 0; i < 26; i++) {
            jq.push(ShouXingUtil.calcQi(w + 15.2184 * i));
        }
        for (i = 0, j = LunarUtil.JIE_QI_IN_USE.length; i < j; i++) {
            if (i === 0) {
                jd = ShouXingUtil.qiAccurate2(jq[0] - 15.2184);
            }
            else if (i <= 26) {
                jd = ShouXingUtil.qiAccurate2(jq[i - 1]);
            }
            else {
                jd = ShouXingUtil.qiAccurate2(jq[25] + 15.2184 * (i - 26));
            }
            this._jieQiJulianDays.push(jd + Solar.J2000);
        }
        // 冬至前的初一，今年"首朔"的日月黄经差w
        w = ShouXingUtil.calcShuo(jq[0]);
        if (w > jq[0]) {
            w -= 29.53;
        }
        // 递推每月初一
        for (i = 0; i < 16; i++) {
            hs.push(ShouXingUtil.calcShuo(w + 29.5306 * i));
        }
        // 每月
        for (i = 0; i < 15; i++) {
            dayCounts.push(Math.floor(hs[i + 1] - hs[i]));
            months.push(i);
        }
        const prevYear = currentYear - 1;
        let leapIndex = 16;
        if (LunarYear._LEAP_11.indexOf(currentYear) > -1) {
            leapIndex = 13;
        }
        else if (LunarYear._LEAP_12.indexOf(currentYear) > -1) {
            leapIndex = 14;
        }
        else if (hs[13] <= jq[24]) {
            i = 1;
            while (hs[i + 1] > jq[2 * i] && i < 13) {
                i++;
            }
            leapIndex = i;
        }
        for (j = leapIndex; j < 15; j++) {
            months[j] -= 1;
        }
        const ymc = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let fm = -1;
        let index = -1;
        let y = prevYear;
        for (i = 0; i < 15; i++) {
            const dm = hs[i] + Solar.J2000;
            const v2 = months[i];
            let mc = ymc[v2 % 12];
            if (1724360 <= dm && dm < 1729794) {
                mc = ymc[(v2 + 1) % 12];
            }
            else if (1807724 <= dm && dm < 1808699) {
                mc = ymc[(v2 + 1) % 12];
            }
            else if (dm == 1729794 || dm == 1808699) {
                mc = 12;
            }
            if (fm == -1) {
                fm = mc;
                index = mc;
            }
            if (mc < fm) {
                y += 1;
                index = 1;
            }
            fm = mc;
            if (i == leapIndex) {
                mc = -mc;
            }
            else if (dm == 1729794 || dm == 1808699) {
                mc = -11;
            }
            this._months.push(new LunarMonth(y, mc, dayCounts[i], hs[i] + Solar.J2000, index));
            index++;
        }
    }
    getYear(): number {
        return this._year;
    }
    getGanIndex(): number {
        return this._ganIndex;
    }
    getZhiIndex(): number {
        return this._zhiIndex;
    }
    getGan(): string {
        return LunarUtil.GAN[this._ganIndex + 1];
    }
    getZhi(): string {
        return LunarUtil.ZHI[this._zhiIndex + 1];
    }
    getGanZhi(): string {
        return this.getGan() + this.getZhi();
    }
    getJieQiJulianDays(): number[] {
        return this._jieQiJulianDays;
    }
    getDayCount(): number {
        let n = 0;
        for (let i = 0, j = this._months.length; i < j; i++) {
            const m = this._months[i];
            if (m.getYear() == this._year) {
                n += m.getDayCount();
            }
        }
        return n;
    }
    getMonths(): LunarMonth[] {
        return this._months;
    }
    getMonthsInYear(): LunarMonth[] {
        const l: LunarMonth[] = [];
        for (let i = 0, j = this._months.length; i < j; i++) {
            const m = this._months[i];
            if (m.getYear() == this._year) {
                l.push(m);
            }
        }
        return l;
    }
    getMonth(lunarMonth: number): LunarMonth | null {
        for (let i = 0, j = this._months.length; i < j; i++) {
            const m = this._months[i];
            if (m.getYear() == this._year && m.getMonth() == lunarMonth) {
                return m;
            }
        }
        return null;
    }
    getLeapMonth(): number {
        for (let i = 0, j = this._months.length; i < j; i++) {
            const m = this._months[i];
            if (m.getYear() == this._year && m.isLeap()) {
                return Math.abs(m.getMonth());
            }
        }
        return 0;
    }
    toString(): string {
        return `${this.getYear()}`;
    }
    toFullString(): string {
        return `${this.getYear()}年`;
    }
    private _getZaoByGan(index: number, name: string): string {
        const month = this.getMonth(1);
        if (null == month) {
            return '';
        }
        let offset = index - Solar.fromJulianDay(month.getFirstJulianDay()).getLunar().getDayGanIndex();
        if (offset < 0) {
            offset += 10;
        }
        return name.replace('几', LunarUtil.NUMBER[offset + 1]);
    }
    private _getZaoByZhi(index: number, name: string): string {
        const month = this.getMonth(1);
        if (null == month) {
            return '';
        }
        let offset = index - Solar.fromJulianDay(month.getFirstJulianDay()).getLunar().getDayZhiIndex();
        if (offset < 0) {
            offset += 12;
        }
        return name.replace('几', LunarUtil.NUMBER[offset + 1]);
    }
    getTouLiang(): string {
        return this._getZaoByZhi(0, '几鼠偷粮');
    }
    getCaoZi(): string {
        return this._getZaoByZhi(0, '草子几分');
    }
    getGengTian(): string {
        return this._getZaoByZhi(1, '几牛耕田');
    }
    getHuaShou(): string {
        return this._getZaoByZhi(3, '花收几分');
    }
    getZhiShui(): string {
        return this._getZaoByZhi(4, '几龙治水');
    }
    getTuoGu(): string {
        return this._getZaoByZhi(6, '几马驮谷');
    }
    getQiangMi(): string {
        return this._getZaoByZhi(9, '几鸡抢米');
    }
    getKanCan(): string {
        return this._getZaoByZhi(9, '几姑看蚕');
    }
    getGongZhu(): string {
        return this._getZaoByZhi(11, '几屠共猪');
    }
    getJiaTian(): string {
        return this._getZaoByGan(0, '甲田几分');
    }
    getFenBing(): string {
        return this._getZaoByGan(2, '几人分饼');
    }
    getDeJin(): string {
        return this._getZaoByGan(7, '几日得金');
    }
    getRenBing(): string {
        return this._getZaoByGan(2, this._getZaoByZhi(2, '几人几丙'));
    }
    getRenChu(): string {
        return this._getZaoByGan(3, this._getZaoByZhi(2, '几人几锄'));
    }
    getYuan(): string {
        return LunarYear.YUAN[Math.floor((this._year + 2696) / 60) % 3] + '元';
    }
    getYun(): string {
        return LunarYear.YUN[Math.floor((this._year + 2696) / 20) % 9] + '运';
    }
    getNineStar(): NineStar {
        const index = LunarUtil.getJiaZiIndex(this.getGanZhi()) + 1;
        const yuan = (Math.floor(this._year + 2696) / 60) % 3;
        let offset = (62 + yuan * 3 - index) % 9;
        if (0 == offset) {
            offset = 9;
        }
        return NineStar.fromIndex(offset - 1);
    }
    getPositionXi(): string {
        return LunarUtil.POSITION_XI[this._ganIndex + 1];
    }
    getPositionXiDesc(): string {
        return LunarUtil.POSITION_DESC[this.getPositionXi()];
    }
    getPositionYangGui(): string {
        return LunarUtil.POSITION_YANG_GUI[this._ganIndex + 1];
    }
    getPositionYangGuiDesc(): string {
        return LunarUtil.POSITION_DESC[this.getPositionYangGui()];
    }
    getPositionYinGui(): string {
        return LunarUtil.POSITION_YIN_GUI[this._ganIndex + 1];
    }
    getPositionYinGuiDesc(): string {
        return LunarUtil.POSITION_DESC[this.getPositionYinGui()];
    }
    getPositionFu(sect: number = 2): string {
        return (1 == sect ? LunarUtil.POSITION_FU : LunarUtil.POSITION_FU_2)[this._ganIndex + 1];
    }
    getPositionFuDesc(sect: number = 2): string {
        return LunarUtil.POSITION_DESC[this.getPositionFu(sect)];
    }
    getPositionCai(): string {
        return LunarUtil.POSITION_CAI[this._ganIndex + 1];
    }
    getPositionCaiDesc(): string {
        return LunarUtil.POSITION_DESC[this.getPositionCai()];
    }
    getPositionTaiSui(): string {
        return LunarUtil.POSITION_TAI_SUI_YEAR[this._zhiIndex];
    }
    getPositionTaiSuiDesc(): string {
        return LunarUtil.POSITION_DESC[this.getPositionTaiSui()];
    }
    next(n: number): LunarYear {
        return LunarYear.fromYear(this._year + n);
    }
}
