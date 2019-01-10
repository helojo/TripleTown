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
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let type = this.getRandomInt(1, 5);
                let pBlock = new PBlock(type);
                pBlock.Position = new SPosition(x, y);
                blockMap[x][y] = pBlock;
            }
        }

        return logic;
    }

    /**
     * 获取范围内随机整数
     * @param min 最小值
     * @param max 最大值
     */
    protected getRandomInt(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return(min + Math.round(Rand * Range));
    }
}
