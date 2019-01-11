import GProperty from "../GProperty";
import PTile from "./Node/PTile";
import SGrid from "../Struct/SGrid";
import { EHierarchy } from "../GEnum";

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