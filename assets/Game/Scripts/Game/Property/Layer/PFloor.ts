import PLayer from "../PLayer";
import SGrid from "../../Struct/SGrid";
import PTile from "../Node/PTile";

/**
 * 地板
 */
export default class PFloor extends PLayer {
    public Grid:SGrid<PTile> = null;
}