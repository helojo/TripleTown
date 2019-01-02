import DContainer from "./Data/Container";
import Floor, { DFloor } from "./Floor";
import DGrid from "./Data/Grid";
import { DTile } from "./Tile";
import DPosition from "./Data/Position";
import DExist from "./Data/Exist";

export class DLevel extends DContainer {
    /**
     * 地板数据
     */
    public floor:DFloor;

    public constructor(){
        super(DLevel.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    
    /**
     * 边长
     */
    public static Side:number = 80;

    @property({
        type:cc.Component,
        tooltip:"地板"
    })
    /**
     * 地板
     */
    private floor:Floor = null;

    /**
     * 关卡数据
     */
    private data:DLevel;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let width = 9;
        let height = 9;

        let level = new DLevel();

        let floor = new DFloor();
        level.floor = floor;

        let grid = new DGrid<DTile>(width, height);
        floor.grid = grid;

        for (let x = 0; x < width; x++) {
            let floorRow = new Array<DTile>();
            for (let y = 0; y < height; y++) {
                let tile = new DTile();
                tile.position = new DPosition(x, y);
                tile.exist = new DExist(true);
                floorRow[y] = tile;
            }
            grid.Grid[x] = floorRow;
        }

        this.data = level;
    }

    start () {
        //设置地板数据
         this.floor.Data = this.data.floor;
    }

    // update (dt) {}
}
