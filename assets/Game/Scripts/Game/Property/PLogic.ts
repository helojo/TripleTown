import GProperty from "../GProperty";
import PLayer from "./PLayer";

/**
 * 逻辑
 */
export default class PLogic extends GProperty {
    /**
     * 所有层级
     */
    public Layers:Array<PLayer> = null;

    public constructor(){
        super();

        this.Layers = new Array<PLayer>();
    }
}