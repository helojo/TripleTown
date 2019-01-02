import { Dictionary } from "typescript-collections";

/**
 * 属性数据基类
 */
export class DProperty {
    protected name:string;

    /**
     * 获取名字
     */
    public get Name(){
        return this.name;
    }

    protected constructor(name:string){
        this.name = name;
    }
}

/**
 * 属性容器基类
 */
export default class DContainer extends DProperty {
    /**
     * 属性字典
     */
    protected data:Dictionary<string, DProperty>;

    protected constructor(name:string){
        super(name);
        this.data = new Dictionary<string, DProperty>();
    }

    /**
     * 设置属性
     * @param property 属性
     */
    public setProperty(property:DProperty){
        this.data.setValue(property.Name, property);
    }

    /**
     * 获取属性
     * @param name 属性名
     */
    public getProperty(name:string):DProperty{
        return this.data.getValue(name);
    }
}