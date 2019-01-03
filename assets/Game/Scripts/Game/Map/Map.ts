import DataView from "../DataView";
import DContainer from "../Data/Container";
import DGrid from "../Data/Grid";
import Cell, { DCell } from "./Cell";
import Game from "../Game";
import Input from "./Input";

export class DMap extends DContainer {
    
    /**
     * 网格
     */
    public get Grid():DGrid<DCell>{
        return <DGrid<DCell>>this.getProperty(DGrid.name);
    }

    public set Grid(grid:DGrid<DCell>){
        this.setProperty(grid);
    }

    public constructor(){
        super(DMap.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends DataView<DMap> {

    @property({
        type:cc.Prefab,
        displayName:"Cell",
        tooltip:"细胞预制体"
    })
    private CellPrefab:cc.Prefab = null;

    /**
     * 地图网格
     */
    private cellGrid:Cell[][] = null;

    /**
     * 网格
     */
    public get Grid(){
        return this.cellGrid;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    protected updateData(){
        //触摸数据
        let input = this.getComponent(Input)
        if (input) {
            input.Data = this.data;
        }
    }

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
            let rowGrid = new Array<Cell>();
            for (let y = 0; y < grid.Height; y++) {
                const cell = grid.Grid[x][y];
                let cellNode = cc.instantiate(this.CellPrefab);
                let coordinate = cell.Position.Coordinate;
                cellNode.setPosition(coordinate.x * Game.Side, coordinate.y * Game.Side);
                this.node.addChild(cellNode);
                let cellCom = cellNode.getComponent(Cell);
                cellCom.Data = cell;
                rowGrid[y] = cellCom;
            }
            this.cellGrid[x] = rowGrid;
        }
    }

    /**
     * 清理网格
     */
    private clearGrid():Array<Array<Cell>>{
        if (this.cellGrid) {
            let grid = this.data.Grid;
            for (let x = 0; x < grid.Width; x++) {
                for (let y = 0; y < grid.Height; y++) {
                    const tile = this.cellGrid[x][y];
                    if (tile) {
                        tile.node.removeFromParent(true);
                    }
                    this.cellGrid[x][y] = null;
                }
            }
        }else{
            this.cellGrid = new Array<Array<Cell>>();
        }
        return this.cellGrid;
    }
}
