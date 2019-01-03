import { DProperty } from "./Container";

/**
 * 存在数据
 */
export default class DExist extends DProperty {
    protected visibile:boolean = true;

    /**
     * 显示
     */
    public get Visibile(){
        return this.visibile;
    }
    
    public set Visibile(visibile:boolean){
        this.visibile = visibile;
    }
    

    public constructor(visibile:boolean){
        super(DExist.name);
        this.visibile = visibile;
    }
}