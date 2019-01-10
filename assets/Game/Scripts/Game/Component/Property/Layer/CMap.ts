import CLayer from "../CLayer";
import { EInput } from "../../../GEnum";
import SPosition from "../../../Struct/SPosition";
import PMap from "../../../Property/Layer/PMap";
import CSelect from "../Node/CLight";

const {ccclass, property} = cc._decorator;

/**
 * 地图
 */
@ccclass
export default class CMap extends CLayer {

    protected onEnable(){
        this.node.on(EInput.Click, this.onInputClick, this);
        this.node.on(EInput.Switch, this.onInputSwitch, this);
    }

    protected onDisable(){
        this.node.off(EInput.Click, this.onInputClick, this);
        this.node.off(EInput.Switch, this.onInputSwitch, this);
    }

    /**
     * 点击
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
}