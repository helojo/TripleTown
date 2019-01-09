import CProperty from "../CProperty";
import PLogic from "../../Property/PLogic";
import CFloor from "./Layer/CFloor";

const {ccclass, property} = cc._decorator;

/**
 * 逻辑
 */
@ccclass
export default class CLogic extends CProperty {

    @property(cc.Node)
    protected floor:cc.Node = null;

    protected onView(property:PLogic){
        cc.log("CLogic.onView");
        //地板
        let cFloor = this.floor.getComponent<CFloor>(CFloor);
        cFloor.Property = property.Floor;
    }
}