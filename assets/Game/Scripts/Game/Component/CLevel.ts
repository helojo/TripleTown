import SLevel from "../Struct/SLevel";
import PLogic from "../Property/PLogic";
import PFloor from "../Property/Layer/PFloor";
import PMap from "../Property/Layer/PMap";
import SGrid from "../Struct/SGrid";
import PTile from "../Property/Node/PTile";
import SPosition from "../Struct/SPosition";

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

        let floor = new PFloor();
        logic.Floor = floor;
        let tileGrid = new SGrid<PTile>(9, 9);
        floor.Grid = tileGrid;
        const tileMap = tileGrid.Map;
        let tileWidth = tileGrid.Size.Width;
        let tileHeight = tileGrid.Size.Width;
        for (let x = 0; x < tileWidth; x++) {
            for (let y = 0; y < tileHeight; y++) {
                let pTile = new PTile();
                pTile.Position = new SPosition(x, y);
                tileMap[x][y] = pTile;
            }
        }

        let map = new PMap();
        logic.Map = map;

        return logic;
    }
}
