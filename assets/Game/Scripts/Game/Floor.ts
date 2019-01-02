import Game from "./Game";
import DataView from "./DataView";
import DContainer from "./Data/Container";
import DGrid from "./Data/Grid";
import Tile, { DTile } from "./Tile";

/**
 * 地板数据
 */
export class DFloor extends DContainer {
    /**
     * 地板网格
     */
    public grid:DGrid<DTile>;

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

    private tileGrid:Tile[][];

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
        let grid = this.data.grid;
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
        let grid = this.data.grid;
        for (let x = 0; x < grid.Width; x++) {
            for (let y = 0; y < grid.Height; y++) {
                const tile = grid.Grid[x][y];
                let tileNode = cc.instantiate(this.TilePrefab);
                tileNode.setPosition(x * Game.Side, y * Game.Side);
                this.node.addChild(tileNode);
                let tileCom = tileNode.getComponent(Tile);
                tileCom.Data = tile;
            }
        }
    }

    /**
     * 清理网格
     */
    private clearGrid():Array<Array<Tile>>{
        if (this.tileGrid) {
            let grid = this.data.grid;
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
