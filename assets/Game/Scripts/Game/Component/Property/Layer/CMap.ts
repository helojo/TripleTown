import CLayer from "../CLayer";
import { EInput } from "../../../GEnum";
import SPosition from "../../../Struct/SPosition";

const {ccclass, property} = cc._decorator;

/**
 * 地图
 */
@ccclass
export default class CMap extends CLayer {
    
    protected onEnable(){
        this.node.on(EInput.Click, this.onInputClick, this);
        this.node.on(EInput.Switch, this.onInputSwitch, this);
        this.node.on(EInput.Select, this.onInputSelect, this);
    }

    protected onDisable(){
        this.node.off(EInput.Click, this.onInputClick, this);
        this.node.off(EInput.Switch, this.onInputSwitch, this);
        this.node.off(EInput.Select, this.onInputSelect, this);
    }

    /**
     * 选中
     * @param position 坐标
     */
    protected onInputClick(position:SPosition){
        cc.log("CMap.onInputClick.", position.toString());
    }

    /**
     * 交换
     * @param positionA 坐标A
     * @param positionB 坐标B
     */
    protected onInputSwitch(positionA:SPosition, positionB:SPosition){
        cc.log("CMap.onInputSwitch.", positionA.toString(), positionB.toString());
    }

    /**
     * 选中或取消选中
     * @param position 坐标
     * @param isSelect 是否选中
     */
    protected onInputSelect(position:SPosition, isSelect:boolean){
        cc.log("CMap.onInputSelect.", position.toString());
    }
}