import CLayer from "../CLayer";
import { EInput } from "../../../GEnum";
import SPosition from "../../../Struct/SPosition";
import PMove from "../../Action/Move/PMove";
import PSpawn, { SActionPackage } from "../../Action/Spawn/PSpawn";
import CSpawn from "../../Action/Spawn/CSpawn";
import CInput from "../../Logic/CInput";

const {ccclass, property} = cc._decorator;

/**
 * 地图
 */
@ccclass
export default class CMap extends CLayer {

    @property
    protected moveUnit:number = 0.25;


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
        cc.log("CMap.onInputClick.", position.toString());
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
    }

    private onSwitchComplete(cProperty:CSpawn, pAction:PSpawn){
        cc.log("CMap.onSwitchComplete");
        let actions = pAction.Actions;
        let sPackageA = actions[0];
        let cNodeA = sPackageA.Node;
        this.map[cNodeA.Position.X][cNodeA.Position.X] = cNodeA;
        let sPackageB = actions[1];
        let cNodeB = sPackageB.Node;
        this.map[cNodeB.Position.X][cNodeB.Position.X] = cNodeB;
        //判断是否可消除
        let isTriple = false;
        if (isTriple) {
            
        }else{
            let pMoveA = new PMove(this.moveUnit, cNodeB.Position);
            let pMoveB = new PMove(this.moveUnit, cNodeA.Position);
            let pSpawn = new PSpawn(this.onResumeComplete.bind(this));
            let sPackageA = new SActionPackage(cNodeA, pMoveA);
            let sPackageB = new SActionPackage(cNodeB, pMoveB);
            pSpawn.Actions.push(sPackageA, sPackageB);

            let delayFunc = function(){
                this.Action = pSpawn;
            }
            this.scheduleOnce(delayFunc.bind(this), 0.1);
        }
    }

    private onResumeComplete(cProperty:CSpawn, pAction:PSpawn){
        cc.log("CMap.onResumeComplete");
        let actions = pAction.Actions;
        let sPackageA = actions[0];
        let cNodeA = sPackageA.Node;
        this.map[cNodeA.Position.X][cNodeA.Position.X] = cNodeA;
        let sPackageB = actions[1];
        let cNodeB = sPackageB.Node;
        this.map[cNodeB.Position.X][cNodeB.Position.X] = cNodeB;

        let input = this.getComponent(CInput);
        input.enabled = true;
    }
}