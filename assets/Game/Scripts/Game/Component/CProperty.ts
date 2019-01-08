import GProperty from "../GProperty";

const {ccclass, property} = cc._decorator;

/**
 * 属性
 */
@ccclass
export default class CProperty extends cc.Component {
    protected property:GProperty = null;

    /**
     * 属性
     */
    public set Property(property:GProperty){
        this.property = property;

        this.onData(property);
        this.onView(property);
        this.onAction(property);
    }

    /**
     * 数据消息
     * @param property 属性
     */
    protected onData(property:GProperty){

    }

    /**
     * 界面消息
     * @param property 属性
     */
    protected onView(property:GProperty){
        
    }

    /**
     * 动作消息
     * @param property 属性
     */
    protected onAction(property:GProperty){
        
    }
}