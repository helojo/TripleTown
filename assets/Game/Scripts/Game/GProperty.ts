import SDepend from "./Struct/SDepend";
import { Dictionary } from "typescript-collections";

export default class GProperty {
    protected children:Dictionary<string, GProperty> = null;

    /**
     * 依赖
     */
    public Depend:SDepend = null;

    /**
     * 成员属性
     */
    public get Children(){
        return this.children;
    }

    public constructor (){
        this.children = new Dictionary<string, GProperty>();
    }
}