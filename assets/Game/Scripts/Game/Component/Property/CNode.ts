import CProperty from "../CProperty";
import PNode from "../../Property/PNode";

const {ccclass, property} = cc._decorator;

/**
 * 节点
 */
@ccclass
export default class CNode extends CProperty {

    @property
    protected side:number = 0;

    protected onView(property:PNode){
        this.node.position = property.Position.toVec2(this.side);
    }
}