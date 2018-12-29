import Tile, { TileData } from "./Tile";
import Game from "./Game";

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
export default class Floor extends cc.Component {

    private _data:FloorData;

    /**
     * 获取地板数据
     */
    public get Data():FloorData{
        return this._data;
    }

    /**
     * 设置地板数据
     */
    public set Data(data:FloorData){
        this._data = data;
        //更新尺寸
        this.updateSize();

        //清理网格
        this.clearGrid();

        //更新网格
        this.updateGrid();
    }

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

    /**
     * 更新尺寸
     */
    private updateSize(){
        let width = this._data.width;
        let height = this._data.height;
        this.node.width = width * Game.Side;
        this.node.height = height * Game.Side;
    }

    /**
     * 更新网格
     */
    private updateGrid(){
        let width = this._data.width;
        let height = this._data.height;
        
    }

    /**
     * 清理网格
     */
    private clearGrid():Array<Array<Tile>>{
        if (this.tileGrid) {
            let width = this._data.width;
            let height = this._data.height;
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
