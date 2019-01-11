import PLayer from "../PLayer";
import { EHierarchy } from "../../../GEnum";

/**
 * 选择
 */
export default class PSelect extends PLayer {
    
    constructor(){
        super();
        this.hierarchy = EHierarchy.Select;
        this.prefab = "Light";
    }
}