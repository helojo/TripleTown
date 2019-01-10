import CLayer from "../CLayer";
import PSelect from "../../../Property/Layer/PSelect";
import SPosition from "../../../Struct/SPosition";
import { EInput } from "../../../GEnum";
import CGame from "../../CGame";
import CLight from "../Node/CLight";

const {ccclass, property} = cc._decorator;

/**
 * 选择
 */
@ccclass
export default class CSelect extends CLayer {
    
    protected light:CLight = null;

    onLoad(){
        super.onLoad();
        this.enabled = false;
    }

    protected onView(property:PSelect){
        super.onView(property);
        //加载选中框
        let onLoadComplete = function(err:Error, prefab:cc.Prefab){
            if (err) {
                cc.error("CMap.OnLoadComplete.", err.message);
                return;
            }
            let light = cc.instantiate(prefab);
            this.light = light.getComponent(CLight);
            this.node.addChild(light, property.Hierarchy * 10);

            light.active = false;
            this.enabled = true;
        }

        let path = CGame.ResourcesPath + property.Prefab;
        cc.loader.loadRes(path, cc.Prefab, onLoadComplete.bind(this));
    }

    protected onEnable(){
        this.node.on(EInput.Select, this.onInputSelect, this);
    }

    protected onDisable(){
        this.node.off(EInput.Select, this.onInputSelect, this);
    }

    /**
     * 选中或取消选中
     * @param position 坐标
     * @param isSelect 是否选中
     */
    protected onInputSelect(position:SPosition, isSelect:boolean){
        // cc.log("CMap.onInputSelect.", position.toString());
        this.light.Position = position;
        this.light.node.active = isSelect;
    }
}