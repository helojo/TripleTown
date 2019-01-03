import { DContainer } from "./Data/Container";
import GComponent from "./GComponent";
import Floor, { DFloor } from "./Floor/Floor";
import { DGrid } from "./Data/Grid";
import { DTile } from "./Floor/Tile";
import { DPosition, SCoordinate } from "./Data/Position";
import { DExist } from "./Data/Exist";
import Map, { DMap } from "./Map/Map";
import { DBlock } from "./Map/Block";
import { DDisplay } from "./Data/Display";

export class DGame extends DContainer {
    /**
     * 地板数据
     */
    public get Floor(){
        return <DFloor>this.getProperty(DFloor.name);
    }

    public set Floor(floor){
        this.setProperty(floor);
    }

    /**
     * 地图数据
     */
    public get Map(){
        return <DMap>this.getProperty(DMap.name);
    }

    public set Map(map){
        this.setProperty(map);
    }

    public constructor(){
        super(DGame.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends GComponent {

    public static get Side(){
        return 80;
    }

    @property(cc.Component)
    protected floor:Floor = null;

    @property(cc.Component)
    protected map:Map = null;

    start() {
        let width = 9;
        let height = 9;

        let game = new DGame();

        let floor = new DFloor();
        game.Floor = floor;

        let floorGrid = new DGrid(width, height);
        floor.Grid = floorGrid;

        let map = new DMap();
        game.Map = map;
        
        let mapGrid = new DGrid(width, height);
        map.Grid = mapGrid;

        for (let x = 0; x < width; x++) {
            let floorRow = new Array<DTile>();
            let mapRow = new Array<DBlock>();
            for (let y = 0; y < height; y++) {
                let tile = new DTile();
                tile.Position = new DPosition(new SCoordinate(x, y));
                tile.Exist = new DExist(true);
                floorRow[y] = tile;

                let block = new DBlock();
                block.Position = new DPosition(new SCoordinate(x, y));
                block.Exist = new DExist(true);
                block.Display = new DDisplay();
                let type = this.getRandomInt(1, 5);
                block.Display.Text = type.toString();
                mapRow[y] = block;
            }
            floorGrid.Grid[x] = floorRow;
            mapGrid.Grid[x] = mapRow;
        }

        this.Data = game;
    }

    protected updateData(){
        super.updateData();
        let data = <DGame>this.data;
        //更新地板数据
        this.floor.Data = data.Floor;
        //更新地图数据
        this.map.Data = data.Map;
    }

    /**
     * 范围内获取整数随机数
    */
   private getRandomInt(min: number, max: number): number {
        var Range = max - min;
        var Rand = Math.random();
        return(min + Math.round(Rand * Range));
    }
}