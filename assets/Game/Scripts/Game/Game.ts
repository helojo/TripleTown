import Floor, { FloorData } from "./Floor";
import { TileData } from "./Tile";

export class LevelData {
    /**
     * 地板数据
     */
    public floor:FloorData;
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    
    /**
     * 边长
     */
    public static Side:number = 80;

    @property({
        type:Floor,
        tooltip:"地板"
    })
    /**
     * 地板
     */
    private floor:Floor = null;

    /**
     * 关卡数据
     */
    private data:LevelData;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let width = 9;
        let height = 9;

        let level = new LevelData();

        let floor = new FloorData();
        floor.width = width;
        floor.height = height;
        let floorGrid = new Array<Array<TileData>>();
        for (let x = 0; x < width; x++) {
            let floorRow = new Array<TileData>();
            for (let y = 0; y < height; y++) {
                let floor = new TileData();
                floor.x = x;
                floor.y = y;
                floor.enable = true;
                floorRow[y] = floor;
            }
            floorGrid[x] = floorRow;
        }
        floor.grid = floorGrid;
        level.floor = floor;

        this.data = level;
    }

    start () {
        //设置地板数据
        this.floor.Data = this.data.floor;
    }

    // update (dt) {}
}
