import GProperty from "../../GProperty";
import CProperty from "../CProperty";

/**
 * 动作
 */
export default class PAction extends GProperty {
    protected bind:string = null;

    /**
     * 绑定组件
     */
    public get Bind(){
        return this.bind;
    }

    /**
     * 完成回调
     */
    public Callback:(cProperty:CProperty, pAction:PAction)=>void = null;

    public constructor(){
        super();
    }
}