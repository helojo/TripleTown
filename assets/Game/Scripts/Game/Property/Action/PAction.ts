import GProperty from "../../GProperty";
import CProperty from "../CProperty";

/**
 * 动作
 */
export default class PAction extends GProperty {
    protected callback:(cProperty:CProperty, pAction:PAction)=>void = null;
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
    public get Callback(){
        return this.callback;
    }

    public constructor(callback:(cProperty:CProperty, pAction:PAction)=>void){
        super();
        this.callback = callback;
    }
}