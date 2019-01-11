import CProperty from "../CProperty";
import PAction from "../../Property/PAction";

const {ccclass, property} = cc._decorator;

/**
 * 动作
 */
@ccclass
export default class CAction extends CProperty {
    protected callback:(pAction:PAction, cAction:CAction)=>void = null;

    /**
     * 执行动作
     * @param pAction 动作属性
     * @param callback 完成回调
     */
    public doAction(pAction:PAction, callback:(pAction:PAction, cAction:CAction)=>void){
        this.callback = callback;
        this.Property = pAction;
    }

    /**
     * 没有动作时直接回调
     * 子类不要调用super
     * @param pAction 动作属性
     */
    protected onAction(pAction:PAction){
        this.callback(pAction, this);
    }
}