import SDepend from "./Struct/SDepend";

export default class GProperty {
    protected children:Array<GProperty> = null;

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
        this.children = new Array<GProperty>();
    }
}