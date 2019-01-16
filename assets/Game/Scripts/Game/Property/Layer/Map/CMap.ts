import CLayer from "../CLayer";
import { EInput } from "../../../GEnum";
import SPosition from "../../../Struct/SPosition";
import PMove from "../../Action/Move/PMove";
import PSpawn, { SActionPackage } from "../../Action/Spawn/PSpawn";
import CSpawn from "../../Action/Spawn/CSpawn";
import CInput from "../../Logic/CInput";
import STriple from "../../../Struct/Logic/STriple";
import PMap from "./PMap";
import CBlock from "../../Node/Block/CBlock";

const {ccclass, property} = cc._decorator;

/**
 * 地图
 */
@ccclass
export default class CMap extends CLayer {

    @property
    protected moveUnit:number = 0.25;

    @property
    protected resumeDelay:number = 0.2;


    protected onEnable(){
        this.node.on(EInput.Click, this.onInputClick, this);
        this.node.on(EInput.Switch, this.onInputSwitch, this);
    }

    protected onDisable(){
        this.node.off(EInput.Click, this.onInputClick, this);
        this.node.off(EInput.Switch, this.onInputSwitch, this);
    }

    /**
     * 点击
     * @param position 坐标
     */
    protected onInputClick(position:SPosition){
        // cc.log("CMap.onInputClick.", position.toString());
    }

    /**
     * 交换
     * @param positionA 坐标A
     * @param positionB 坐标B
     */
    protected onInputSwitch(positionA:SPosition, positionB:SPosition){
        let input = this.getComponent(CInput);
        input.enabled = false;
        
        let cNodeA = this.map[positionA.X][positionA.Y];
        let cNodeB = this.map[positionB.X][positionB.Y];
        let pMoveA = new PMove(this.moveUnit, positionB);
        let pMoveB = new PMove(this.moveUnit, positionA);
        let pSpawn = new PSpawn(this.onSwitchComplete.bind(this));
        let sPackageA = new SActionPackage(cNodeA, pMoveA);
        let sPackageB = new SActionPackage(cNodeB, pMoveB);
        pSpawn.Actions.push(sPackageA, sPackageB);
        this.Action = pSpawn;
        cc.log("CMap.onInputSwitch.", positionA.toString(), positionB.toString());
        this.dumpMap("Switch");
    }

    /**
     * 交换完成
     * @param cProperty 批量组件
     * @param pAction 批量属性
     */
    private onSwitchComplete(cProperty:CSpawn, pAction:PSpawn){
        cc.log("CMap.onSwitchComplete");

        let actions = pAction.Actions;
        let sPackageA = actions[0];
        let cNodeA = sPackageA.Node;
        let sPackageB = actions[1];
        let cNodeB = sPackageB.Node;
        let temp = this.map[cNodeA.Position.X][cNodeA.Position.Y];
        this.map[cNodeA.Position.X][cNodeA.Position.Y] = this.map[cNodeB.Position.X][cNodeB.Position.Y];
        this.map[cNodeB.Position.X][cNodeB.Position.Y] = temp;
        
        this.dumpMap("SwitchComplete");

        //判断是否可消除
        let sTriples = this.findTriples();
        if (sTriples.length > 0) {
            
        }else{
            //不可消除 恢复原有位置
            let pMoveA = new PMove(this.moveUnit, cNodeB.Position);
            let pMoveB = new PMove(this.moveUnit, cNodeA.Position);
            let pSpawn = new PSpawn(this.onResumeComplete.bind(this));
            let sPackageA = new SActionPackage(cNodeA, pMoveA);
            let sPackageB = new SActionPackage(cNodeB, pMoveB);
            pSpawn.Actions.push(sPackageA, sPackageB);

            let delayFunc = function(){
                this.Action = pSpawn;
            }
            this.scheduleOnce(delayFunc.bind(this), this.resumeDelay);
        }
    }

    /**
     * 恢复完成
     * @param cProperty 批量组件
     * @param pAction 批量属性
     */
    private onResumeComplete(cProperty:CSpawn, pAction:PSpawn){
        cc.log("CMap.onResumeComplete");

        let actions = pAction.Actions;
        let sPackageA = actions[0];
        let cNodeA = sPackageA.Node;
        let sPackageB = actions[1];
        let cNodeB = sPackageB.Node;
        let temp = this.map[cNodeA.Position.X][cNodeA.Position.Y];
        this.map[cNodeA.Position.X][cNodeA.Position.Y] = this.map[cNodeB.Position.X][cNodeB.Position.Y];
        this.map[cNodeB.Position.X][cNodeB.Position.Y] = temp;

        this.dumpMap("ResumeComplete");

        this.onComplete();
    }

    /**
     * 消除完成
     */
    private onComplete(){
        // cc.log("CMap.onComplete");

        let input = this.getComponent(CInput);
        input.enabled = true;
    }

    /**
     * 寻找三连续
     */
    protected findTriples(){
        let layer = <PMap>this.property;
        let grid = layer.Grid;
        let width = grid.Size.Width;
        let height = grid.Size.Height;

        let sTriples:Array<STriple> = new Array<STriple>();

        let array = new Array<Array<CBlock>>();
        //x方向
        for (let x = 0; x < width; x++) {
            let lBlock = null;
            let blockArray = new Array<CBlock>();
            for (let y = 0; y < height; y++) {
                let block = <CBlock>this.map[x][y];
                if (block.equal(lBlock)) {
                    blockArray.push(block);
                    if (y == width-1 && blockArray.length >= 3) {
                        array.push(blockArray);
                    }
                }else{
                    lBlock = block;
                    if (blockArray.length >= 3) {
                        array.push(blockArray);
                    }
                    blockArray = new Array<CBlock>();
                    blockArray.push(block);
                }
            }
        }
        //y方向
        for (let y = 0; y < height; y++) {
            let lBlock = null;
            let blockArray = new Array<CBlock>();
            for (let x = 0; x < width; x++) {
                let block = <CBlock>this.map[x][y];
                if (block.equal(lBlock)) {
                    blockArray.push(block);
                    if (x == width-1 && blockArray.length >= 3) {
                        array.push(blockArray);
                    }
                }else{
                    lBlock = block;
                    if (blockArray.length >= 3) {
                        array.push(blockArray);
                    }
                    blockArray = new Array<CBlock>();
                    blockArray.push(block);
                }
            }
        }
        cc.log("CMap.Find.Complete");
        for (const cBlockArray of array) {
            let str = "";
            for (const cBlock of cBlockArray) {
                str += cBlock.Position.toString();
                str += "|";
            }
            cc.log("CMap.Find.", str);
        }

        return sTriples;
    }

    protected dumpMap(head = ""){
        let layer = <PMap>this.property;
        let grid = layer.Grid;
        let width = grid.Size.Width;
        let height = grid.Size.Height;

        head = "CMap." + head;

        cc.log(head, "-----------------");

        for (let y = height-1; y >= 0; y--) {
             let str = "";
            for (let x = 0; x < width; x++) {
                let cBlock = <CBlock>this.map[x][y];
                str += cBlock.toString();
                if (x < width-1) {
                    str += "|";
                }
            }
            cc.log(head, str);
        }

        cc.log(head, "-----------------");
    }
}