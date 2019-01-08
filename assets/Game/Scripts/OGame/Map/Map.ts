import GComponent from "../GComponent";
import { Block } from "./Block";
import Game from "../Game";
import { DHierarchy } from "../Data/Hierarchy";
import Input from "./Input";
import { SCoordinate } from "../Data/Position";
import { DPackage } from "../AComponent";
import { DMove, PSwitch } from "../Action/AMove";

export class DMap extends DHierarchy {

    public constructor(){
        super(DMap.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends GComponent {
    protected touch:boolean = false;

    @property(cc.Prefab)
    /**
     * 预制体
     */
    protected prefab:cc.Prefab = null;

    @property(cc.Node)
    /**
     * 选中节点
     */
    protected select:cc.Node = null;

    /**
     * 网格
     */
    protected grid:Block[][] = null;

    /**
     * 是否可以触摸
     */
    public get Touch(){
        return this.touch;
    }

    public set Touch(touch){
        this.touch = touch;
        let input = this.getComponent(Input);
        if (input) {
            input.enabled = touch;
        }
    }

    // LIFE-CYCLE CALLBACKS:

    onEnable () {
        cc.log("Map.onEnable");
        this.node.on(Input.SELECT, this.onSelect, this);
        this.node.on(Input.SWITCH, this.onSwitch, this);
        this.node.on(Input.CLICK, this.onClick, this);
    }

    onDisable () {
        cc.log("Map.onDisable");
        this.node.off(Input.SELECT, this.onSelect, this);
        this.node.off(Input.SWITCH, this.onSwitch, this);
        this.node.off(Input.CLICK, this.onClick, this);
    }

    protected updateView(){
        //更新尺寸
        this.updateSize();

        //清理网格
        this.clearGrid();

        //更新网格
        this.updateGrid();

        //开启触摸
        this.Touch = true;
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

    /**
     * 获取方块
     * @param coordinate 坐标
     */
    protected getBlock(coordinate:SCoordinate):cc.Node{
        return this.grid[coordinate.x][coordinate.y].node;
    }

    /**
     * 交换方块
     * @param cooA 坐标A
     * @param cooB 坐标B
     */
    protected switchBlock(cooA, cooB){
        let temp = this.grid[cooA.x][cooA.y];
        this.grid[cooA.x][cooA.y] = this.grid[cooB.x][cooB.y];
        this.grid[cooB.x][cooB.y] = temp;
    }

    /**
     * 点击监听
     * @param coordinate 坐标
     */
    private onClick(coordinate:SCoordinate){
        cc.log("Map.onClick.", coordinate.x, coordinate.y);
    }

    /**
     * 选中监听
     * @param coordinate 选中的坐标
     * @param isSelect 是否选中
     */
    private onSelect(coordinate:SCoordinate, isSelect:boolean){
        this.select.setPosition(coordinate.toVec2(Game.Side));
        this.select.active = isSelect;
        cc.log("Map.onSelect.", isSelect, coordinate.x, coordinate.y);
    }

    /**
     * 交换坐标
     * @param cooA 坐标A
     * @param cooB 坐标B
     */
    private onSwitch(cooA:SCoordinate, cooB:SCoordinate){
        cc.log("Map.onSwith.", cooA.x, cooA.y, "|", cooB.x, cooB.y);
        //动画中
        this.Touch = false;
        //创建同时动画容器
        let aNode = this.getBlock(cooA);
        let aPkg = new DPackage(aNode, new DMove(cooB));
        let bNode = this.getBlock(cooB);
        let bPkg = new DPackage(bNode, new DMove(cooA));

        let pSwitch = new PSwitch(aPkg, bPkg);
        pSwitch.doAction(this.onSwitchComplete.bind(this));
    }

    /**
     * 交换完成
     * @param pSwitch 交换对象
     */
    private onSwitchComplete(pSwitch:PSwitch){
        cc.log("Map.onSwitch.Complete");
        let moveA = <DMove>pSwitch.PackageA.Action;
        let moveB = <DMove>pSwitch.PackageA.Action;
        let cooA = moveA.Coordinate;
        let cooB = moveB.Coordinate;
        //交换坐标
        this.switchBlock(cooA, cooB);
        //寻找消除
        if (this.findTriple()) {
            
        }else{
            let schduleCallback = function(){
                pSwitch.backAction(this.onResumeComplete.bind(this));
            }
            //延时恢复
            this.scheduleOnce(schduleCallback.bind(this), 0.1);
        }
    }

    /**
     * 恢复完成
     * @param pSwitch 交换对象
     */
    private onResumeComplete(pSwitch:PSwitch){
        cc.log("Map.onResume.Complete");
        let moveA = <DMove>pSwitch.PackageA.Action;
        let moveB = <DMove>pSwitch.PackageA.Action;
        let cooA = moveA.Coordinate;
        let cooB = moveB.Coordinate;
        //交换坐标
        this.switchBlock(cooA, cooB);
        //操作中
        this.Touch = true;
    }

    /**
     * 寻找连续
     */
    private findTriple():boolean{
        return false;
    }
}
