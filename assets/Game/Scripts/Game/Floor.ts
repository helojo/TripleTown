import Tile, { TileData } from "./Tile";
import Game from "./Game";
import DataView from "./DataView";

/**
 * 地板数据
 */
export class FloorData {
    /**
     * 宽度
     */
    public width:number;

    /**
     * 高度
     */
    public height:number;

    /**
     * 网格数据
     */
    public grid:TileData[][];
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Floor extends DataView<FloorData> {

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
        let width = this.data.width;
        let height = this.data.height;
        this.node.width = width * Game.Side;
        this.node.height = height * Game.Side;
        this.node.anchorX = 0;
        this.node.anchorY = 0;
        this.node.position.x = -this.node.width / 2;
        this.node.position.y = -this.node.height / 2;
    }

    /**
     * 更新网格
     */
    private updateGrid(){
        let width = this.data.width;
        let height = this.data.height;
        let grid = this.data.grid;
        cc.log("Floor.UpdateGrid");
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const tile = grid[x][y];
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
            let width = this.data.width;
            let height = this.data.height;
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
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
