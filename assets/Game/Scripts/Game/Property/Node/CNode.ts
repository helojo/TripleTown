import CProperty from "../CProperty";
import SPosition from "../../Struct/SPosition";
import PNode from "./PNode";

const {ccclass, property} = cc._decorator;

/**
 * 节点
 */
@ccclass
export default class CNode extends CProperty {
    protected position:SPosition = null;
    @property
    protected side:number = 80;

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
    public get Side(){
        return this.side;
    }

    protected onView(property:PNode){
        this.Position = property.Position;
    }
}