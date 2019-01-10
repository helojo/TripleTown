import CProperty from "../CProperty";
import PNode from "../../Property/PNode";
import SPosition from "../../Struct/SPosition";

const {ccclass, property} = cc._decorator;

/**
 * 节点
 */
@ccclass
export default class CNode extends CProperty {
    protected position:SPosition = null;

    /**
     * 设置坐标
     */
    public set Position(value:SPosition){
        this.position = value;
        this.node.position = value.toVec2(this.side);
    }

    /**
     * 边长
     */
    @property
    protected side:number = 80;

    protected onView(property:PNode){
        this.Position = property.Position;
    }
}