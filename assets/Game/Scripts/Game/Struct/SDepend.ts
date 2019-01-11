import GProperty from "../GProperty";

/**
 * 组件
 */
export class SComponent {
    protected name:string = null;
    protected property:GProperty = null;

    /**
     * 组件名
     */
    public get Name(){
        return this.name;
    }

    /**
     * 属性
     */
    public get Property(){
        return this.property;
    }

    public constructor(name:string, property:GProperty = null){
        this.name = name;
        this.property = property;
    }
}

/**
 * 依赖
 */
export default class SDepend {
    protected components:Array<SComponent> = null;

    public get Components(){
        return this.components;
    }

    public constructor(){
        this.components = new Array<SComponent>();
    }
}