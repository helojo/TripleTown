import CProperty from "../CProperty";
import PAction from "./PAction";

const {ccclass, property} = cc._decorator;

/**
 * 动作
 */
@ccclass
export default class CAction extends CProperty {

    protected onData(pAction:PAction){
        super.onData(pAction);
    }

    protected onView(pAction:PAction){
        super.onView(pAction);
    }
}