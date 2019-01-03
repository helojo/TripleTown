import { DContainer } from "./Data/Container";
import GComponent from "./GComponent";
import Floor, { DFloor } from "./Floor/Floor";
import { DGrid } from "./Data/Grid";
import { DTile } from "./Floor/Tile";
import { DPosition, SCoordinate } from "./Data/Position";
import { DExist } from "./Data/Exist";

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
        return null;
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

    /**
     * 边长
     */
    public static Side = 80;

    @property(cc.Component)
    protected floor:Floor = null;

    start() {
        let width = 9;
        let height = 9;

        let game = new DGame();

        let floor = new DFloor();
        game.Floor = floor;

        let floorGrid = new DGrid(width, height);
        floor.Grid = floorGrid;

        // let map = new DMap();
        // level.Map = map;
        
        // let mapGrid = new DGrid(width, height);
        // map.Grid = mapGrid;

        for (let x = 0; x < width; x++) {
            let floorRow = new Array<DTile>();
            // let mapRow = new Array<DCell>();
            for (let y = 0; y < height; y++) {
                let tile = new DTile();
                tile.Position = new DPosition(new SCoordinate(x, y));
                tile.Exist = new DExist(true);
                floorRow[y] = tile;

                // let cell = new DCell();
                // cell.Position = new DPosition(new SCoordinate(x, y));
                // cell.Exist = new DExist(true);
                // cell.Display = new DDisplay();
                // cell.Display.num = this.getRandomInt(1, 5);
                // mapRow[y] = cell;
            }
            floorGrid.Grid[x] = floorRow;
            // mapGrid.Grid[x] = mapRow;
        }

        this.Data = game;
    }

    protected updateData(){
        super.updateData();
        let data = <DGame>this.data;
        //更新地板数据
        this.floor.Data = data.Floor;
    }

}