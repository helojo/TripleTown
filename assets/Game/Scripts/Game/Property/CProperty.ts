import GProperty from "../GProperty";
import PAction from "./Action/PAction";
import CAction from "./Action/CAction";

const {ccclass, property} = cc._decorator;

/**
 * 属性
 */
@ccclass
export default class CProperty extends cc.Component {
    protected property:GProperty = null;
    protected action:PAction = null;

    /**
     * 属性
     */
    public set Property(property:GProperty){
        this.property = property;

        this.onData(property);
        this.onView(property);
    }

    /**
     * 动作
     */
    public set Action(action:PAction){
        this.action = action;
        
        this.onAction(action);
    }

    /**
     * 数据消息
     * @param property 属性
     */
    protected onData(property:GProperty){
        let depend = property.Depend;
        if (depend) {
            let components = depend.Components;
            for (const sComp of components) {
                let name = sComp.Name;
                let comp = <CProperty>this.getComponent(name);
                if (!comp) {
                    comp = <CProperty>this.addComponent(name);
                }
                if (comp && sComp.Property) {
                    comp.Property = sComp.Property;
                }
            }
        }
    }

    /**
     * 界面消息
     * @param property 属性
     */
    protected onView(property:GProperty){
        
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