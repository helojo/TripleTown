import SLevel from "../Struct/SLevel";
import PLogic from "../Property/PLogic";
import PFloor from "../Property/Layer/PFloor";
import PMap from "../Property/Layer/PMap";
import SGrid from "../Struct/SGrid";
import PTile from "../Property/Node/PTile";
import SPosition from "../Struct/SPosition";
import PBlock from "../Property/Node/PBlock";
import PSelect from "../Property/Layer/PSelect";

const {ccclass, property} = cc._decorator;

/**
 * 关卡
 */
@ccclass
export default class CLevel extends cc.Component {
    
    /**
     * 生成
     * @param level 关卡数据
     */
    public generate(level:SLevel){
        let logic = new PLogic();

        let width = 9;
        let height = 9;

        let floor = new PFloor();
        logic.Layers.push(floor);
        let tileGrid = new SGrid<PTile>(width, height);
        floor.Grid = tileGrid;
        const tileMap = tileGrid.Map;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let pTile = new PTile();
                pTile.Position = new SPosition(x, y);
                tileMap[x][y] = pTile;
            }
        }

        let select = new PSelect();
        logic.Layers.push(select);

        let map = new PMap();
        logic.Layers.push(map);
        let blockGrid = new SGrid<PBlock>(width, height);
        map.Grid = blockGrid;
        const blockMap = blockGrid.Map;
        let typeMap = this.getRandomMap(width, height, 5);
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let type = typeMap[x][y];
                let pBlock = new PBlock(type);
                pBlock.Position = new SPosition(x, y);
                blockMap[x][y] = pBlock;
            }
        }

        return logic;
    }

    /**
     * 获取随机地图
     * @param width 宽
     * @param height 高
     * @param max 最大值
     */
    protected getRandomMap(width:number, height:number, max:number){
        let map = new Array<Array<number>>();
        for (let x = 0; x < width; x++) {
            let row = new Array<number>()
            for (let y = 0; y < height; y++) {
                let type = this.getRandomInt(0, max);
                row[y] = type;
            }
            map[x] = row;
        }

        //消除连续
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < width; y++) {
                let type = map[x][y];
                let sameArray = new Array<number>();
                //x
                if (x >= 2 && map[x-1][y] == map[x-2][y]) {
                    sameArray.push(map[x-1][y]);
                }
                //y
                if (y >= 2 && map[x][y-1] == map[x][y-2]) {
                    sameArray.push(map[x][y-1]);
                }
                //判断是否相同
                for (const sameType of sameArray) {
                    if (sameType == type) {
                        map[x][y] = this.getDifferentInt(sameArray, max);
                    }
                }
            }
        }

        return map;
    }


    /**
     * 获取范围内不同的数
     * @param nums 不同数组
     * @param max 最大值
     */
    private getDifferentInt(nums: Array<number>, max:number): number{
        let allNum = new Array<number>();
        for (let i = 1; i <= max; i++) {
            let isSame = false;
            for (const arrNum of nums) {
                if (arrNum == i) {
                    isSame = true;
                    break;
                }
            }
            if (!isSame) {
                allNum.push(i);
            }
        }
        let index = this.getRandomInt(1, allNum.length) - 1;
        return allNum[index];
    }

    /**
     * 获取范围内随机整数
     * @param min 最小值
     * @param max 最大值
     */
    private getRandomInt(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return(min + Math.round(Rand * Range));
    }
}
