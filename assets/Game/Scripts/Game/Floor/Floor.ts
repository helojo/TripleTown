import DContainer from "../Data/Container";
import DGrid from "../Data/Grid";
import DataView from "../DataView";
import Game from "../Game";
import Tile, { DTile } from "./Tile";

/**
 * 地板数据
 */
export class DFloor extends DContainer {
    /**
     * 网格
     */
    public get Grid():DGrid<DTile>{
        return <DGrid<DTile>>this.getProperty(DGrid.name);
    }
    
    public set Grid(grid:DGrid<DTile>){
        this.setProperty(grid);
    }

    public constructor(){
        super(DFloor.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Floor extends DataView<DFloor> {

    @property({
        type:cc.Prefab,
        displayName:"Tile",
        tooltip:"地板预制体"
    })
    /**
     * 地板预制体
     */
    private TilePrefab:cc.Prefab = null;

    /**
     * 地板网格
     */
    private tileGrid:Tile[][] = null;

    // LIFE-CYCLE CALLBACKS:

    protected updateView(){
        //更新尺寸
        this.updateSize();

        //清理网格
        this.clearGrid();

        //更新网格
        this.updateGrid();
    }

    /**
     * 更新尺寸
     */
    private updateSize(){
        let grid = this.data.Grid;
        this.node.width = grid.Width * Game.Side;
        this.node.height = grid.Height * Game.Side;
        this.node.anchorX = 0;
        this.node.anchorY = 0;
        this.node.position.x = -this.node.width / 2;
        this.node.position.y = -this.node.height / 2;
    }

    /**
     * 更新网格
     */
    private updateGrid(){
        let grid = this.data.Grid;
        for (let x = 0; x < grid.Width; x++) {
            let rowGrid = new Array<Tile>();
            for (let y = 0; y < grid.Height; y++) {
                const tile = grid.Grid[x][y];
                let tileNode = cc.instantiate(this.TilePrefab);
                tileNode.setPosition(x * Game.Side, y * Game.Side);
                this.node.addChild(tileNode);
                let tileCom = tileNode.getComponent(Tile);
                tileCom.Data = tile;
                rowGrid[y] = tileCom;
            }
            this.tileGrid[x] = rowGrid;
        }
    }

    /**
     * 清理网格
     */
    private clearGrid():Array<Array<Tile>>{
        if (this.tileGrid) {
            let grid = this.data.Grid;
            for (let x = 0; x < grid.Width; x++) {
                for (let y = 0; y < grid.Height; y++) {
                    const tile = this.tileGrid[x][y];
                    if (tile) {
                        tile.node.removeFromParent(true);
                    }
                    this.tileGrid[x][y] = null;
                }
            }
        }else{
            this.tileGrid = new Array<Array<Tile>>();
        }
        return this.tileGrid;
    }
}
