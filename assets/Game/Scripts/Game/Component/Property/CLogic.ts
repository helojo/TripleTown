import CProperty from "../CProperty";
import PLogic from "../../Property/PLogic";

const {ccclass, property} = cc._decorator;

/**
 * 逻辑
 */
@ccclass
export default class CLogic extends CProperty {

    protected onView(property:PLogic){
        cc.log("CLogic.onView");
        for (const layer of property.Layers) {
            let cName = layer.Component;
            if (!cName) {
                continue;
            }
            let component = <CProperty>this.addComponent(cName);
            if (component) {
                component.Property = layer;
            }
        }
        
    }
}