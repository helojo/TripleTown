import { DProperty } from "./Container";

export class DType extends DProperty {
    protected type:number = 0;

    /**
     * 类型
     */
    public get Type(){
        return this.type;
    }

    public set Type(type){
        this.type = type;
    }

    public constructor(){
        super(DType.name);
    }

    public equal(type:DType):boolean{
        return type != null && type.type == this.type;
    }
}
