import DContainer from "./Data/Container";
import Floor, { DFloor } from "./Floor/Floor";
import DGrid from "./Data/Grid";
import { DTile } from "./Floor/Tile";
import DPosition from "./Data/Position";
import DExist from "./Data/Exist";
import DataView from "./DataView";
import { DCell } from "./Map/Cell";
import Map, { DMap } from "./Map/Map";
import DDisplay from "./Map/Display";

export class DLevel extends DContainer {

    /**
     * 地板数据
     */
    public get Floor():DFloor{
        return <DFloor>this.getProperty(DFloor.name);
    }

    public set Floor(floor:DFloor){
        this.setProperty(floor);
    }

    /**
     * 地图数据
     */
    public get Map():DMap{
        return <DMap>this.getProperty(DMap.name);
    }

    public set Map(map:DMap){
        this.setProperty(map);
    }

    public constructor(){
        super(DLevel.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends DataView<DLevel> {
    
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


    @property({
        type:cc.Component,
        tooltip:"地图"
    })

    /**
     * 地图
     */
    private map:Map = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    }

    start () {
        let width = 9;
        let height = 9;

        let level = new DLevel();

        let floor = new DFloor();
        level.Floor = floor;

        let floorGrid = new DGrid<DTile>(width, height);
        floor.Grid = floorGrid;

        let map = new DMap();
        level.Map = map;
        
        let mapGrid = new DGrid<DCell>(width, height);
        map.Grid = mapGrid;

        for (let x = 0; x < width; x++) {
            let floorRow = new Array<DTile>();
            let mapRow = new Array<DCell>();
            for (let y = 0; y < height; y++) {
                let tile = new DTile();
                tile.Position = new DPosition(x, y);
                tile.Exist = new DExist(true);
                floorRow[y] = tile;

                let cell = new DCell();
                cell.Position = new DPosition(x, y);
                cell.Exist = new DExist(true);
                cell.Display = new DDisplay();
                cell.Display.num = this.getRandomInt(1, 5);
                mapRow[y] = cell;
            }
            floorGrid.Grid[x] = floorRow;
            mapGrid.Grid[x] = mapRow;
        }

        this.Data = level;
    }

    protected updateData(){
        //设置地板数据
        this.floor.Data = this.data.Floor;
        //设置地图数据
        this.map.Data = this.data.Map;
    }

    protected updateView(){
        
    }

    /**
     * 范围内获取整数随机数
    */
    private getRandomInt(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return(min + Math.round(Rand * Range));
    }

    // update (dt) {}
}
