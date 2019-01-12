import CProperty from "../CProperty";
import SPosition from "../../Struct/SPosition";
import PNode from "./PNode";
import PAction from "../Action/PAction";
import CAction from "../Action/CAction";

const {ccclass, property} = cc._decorator;

/**
 * 节点
 */
@ccclass
export default class CNode extends CProperty {
    protected position:SPosition = null;
    protected action:PAction = null;

    /**
     * 设置坐标
     */
    public set Position(value:SPosition){
        this.position = value;
        this.node.position = value.toVec2(this.side);
    }

    /**
     * 动作
     */
    public set Action(action:PAction){
        this.action = action;
        
        this.onAction(action);
    }

    /**
     * 边长
     */
    @property
    protected side:number = 80;

    protected onView(property:PNode){
        this.Position = property.Position;
    }

    /**
     * 动作消息
     * @param action 动作
     */
    protected onAction(action:PAction){
        let bind = action.Bind;
        if (bind) {
            let bindComp = <CAction>this.getComponent(bind);
            if (!bindComp) {
                bindComp = this.addComponent(bind);
            }
            if (bindComp) {
                bindComp.Property = action;
            }
        }
    }
}