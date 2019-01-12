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
        let side = 1;
        let cNode = this.getComponent(CNode);
        if (cNode) {
            side = cNode.Side;
        }

        let position = pMove.Position;
        let unit = pMove.Unit;
        let moveTo = cc.moveTo(unit, position.toVec2(side));
        let callFunc = cc.callFunc(this.callback, this, pMove);
        let sequence = cc.sequence(moveTo, callFunc);
        this.node.runAction(sequence);
    }

    private callback(pMove:PMove){
        let callback = pMove.Callback;
        if (callback) {
            callback(this, pMove);
        }
    }
}