import PLayer from "../PLayer";
import { EHierarchy } from "../../GEnum";

/**
 * 地图
 */
export default class PMap extends PLayer {

    constructor(){
        super();
        this.hierarchy = EHierarchy.Map;
        this.prefab = "Block";
    }
}