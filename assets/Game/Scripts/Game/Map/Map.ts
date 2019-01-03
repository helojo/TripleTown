import GComponent from "../GComponent";
import { Block } from "./Block";
import Game from "../Game";
import { DHierarchy } from "../Data/Hierarchy";

export class DMap extends DHierarchy {

    public constructor(){
        super(DMap.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends GComponent {
    @property(cc.Prefab)
    /**
     * 预制体
     */
    protected prefab:cc.Prefab = null;

    /**
     * 网格
     */
    protected grid:Block[][] = null;

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
        let data = <DMap>this.data;
        let grid = data.Grid;
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
        let data = <DMap>this.data;
        let grid = data.Grid;
        for (let x = 0; x < grid.Width; x++) {
            let rowGrid = new Array<Block>();
            for (let y = 0; y < grid.Height; y++) {
                const cell = grid.Grid[x][y];
                let tileNode = cc.instantiate(this.prefab);
                this.node.addChild(tileNode);
                let tileCom = tileNode.getComponent(Block);
                tileCom.Data = cell;
                rowGrid[y] = tileCom;
            }
            this.grid[x] = rowGrid;
        }
    }

    /**
     * 清理网格
     */
    private clearGrid():Array<Array<Block>>{
        if (this.grid) {
            let data = <DMap>this.data;
            let grid = data.Grid;
            for (let x = 0; x < grid.Width; x++) {
                for (let y = 0; y < grid.Height; y++) {
                    const tile = this.grid[x][y];
                    if (tile) {
                        tile.node.removeFromParent(true);
                    }
                    this.grid[x][y] = null;
                }
            }
        }else{
            this.grid = new Array<Array<Block>>();
        }
        return this.grid;
    }
}
