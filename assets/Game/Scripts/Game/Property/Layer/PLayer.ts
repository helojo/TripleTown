import GProperty from "../../GProperty";
import { EHierarchy } from "../../GEnum";
import PTile from "../Node/Tile/PTile";
import SGrid from "../../Struct/SGrid";


/**
 * 层级
 */
export default class PLayer extends GProperty {
    protected hierarchy:EHierarchy = EHierarchy.Began;
    protected prefab:string = null;

    /**
     * 格子
     */
    public Grid:SGrid<PTile> = null;

    /**
     * 层级
     */
    public get Hierarchy(){
        return this.hierarchy;
    }

    /**
     * 预制体
     */
    public get Prefab(){
        return this.prefab;
    }
}