import PLayer from "../PLayer";
import { EHierarchy } from "../../../GEnum";

/**
 * 地板
 */
export default class PFloor extends PLayer {
    
    constructor(){
        super();
        this.hierarchy = EHierarchy.Floor;
        this.prefab = "Tile";
    }
}