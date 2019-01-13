import CAction from "../CAction";
import PMove from "./PMove";
import CNode from "../../Node/CNode";

const {ccclass, property} = cc._decorator;

/**
 * 移动
 */
@ccclass
export default class CMove extends CAction {

    protected onData(pMove:PMove){
        super.onData(pMove);
        
        let cNode = this.getComponent(CNode);
        if (cNode) {
            let side = cNode.Side;
            let sPosition = cNode.Position;
            let mPosition = pMove.Position;
            let unit = pMove.Unit;
            let mag = sPosition.toVec2(1).subSelf(mPosition.toVec2(1)).mag();
            let time = unit * mag;
            let moveTo = cc.moveTo(time, mPosition.toVec2(side));
            let callFunc = cc.callFunc(this.callback, this, cNode);
            let sequence = cc.sequence(moveTo, callFunc);
            this.node.runAction(sequence);
        }else{
            this.callback();
        }
    }

    private callback(cNode:CNode = null){
        let pMove = <PMove>this.property;
        if (cNode) {
            cNode.Position = pMove.Position;
        }
        let callback = pMove.Callback;
        if (callback) {
            callback(this, pMove);
        }
    }
}