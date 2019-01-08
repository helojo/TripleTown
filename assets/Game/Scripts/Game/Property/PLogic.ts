import GProperty from "../GProperty";
import PFloor from "./Layer/PFloor";
import PMap from "./Layer/PMap";

/**
 * 逻辑
 */
export default class PLogic extends GProperty {

    /**
     * 地板
     */
    public Floor:PFloor = null;

    /**
     * 地图
     */
    public Map:PMap = null;
}