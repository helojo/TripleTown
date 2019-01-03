import { DGrid } from "./Data/Grid";
import { DContainer } from "./Data/Container";
import GComponent from "./GComponent";
import Cell from "./Cell";
import Game from "./Game";

export class DHierarchy extends DContainer {
    /**
     * 网格
     */
    public get Grid(){
        return <DGrid>this.getProperty(DGrid.name);
    }
    
    public set Grid(grid){
        this.setProperty(grid);
    }

    public constructor(name:string){
        super(name);
    }
}


const {ccclass, property} = cc._decorator;

@ccclass
/**
 * 层级
 */
export default class Hierarchy extends GComponent{
    @property(cc.Prefab)
    /**
     * 地板预制体
     */
    protected prefab:cc.Prefab = null;

    /**
     * 地板网格
     */
    protected grid:Cell[][] = null;

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
        let data = <DHierarchy>this.data;
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
        let data = <DHierarchy>this.data;
        let grid = data.Grid;
        for (let x = 0; x < grid.Width; x++) {
            let rowGrid = new Array<Cell>();
            for (let y = 0; y < grid.Height; y++) {
                const tile = grid.Grid[x][y];
                let tileNode = cc.instantiate(this.prefab);
                this.node.addChild(tileNode);
                let tileCom = tileNode.getComponent(Cell);
                tileCom.Data = tile;
                rowGrid[y] = tileCom;
            }
            this.grid[x] = rowGrid;
        }
    }

    /**
     * 清理网格
     */
    private clearGrid():Array<Array<Cell>>{
        if (this.grid) {
            let data = <DHierarchy>this.data;
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
            this.grid = new Array<Array<Cell>>();
        }
        return this.grid;
    }
}