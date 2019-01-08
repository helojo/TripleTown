import { DProperty } from "./Container";

/**
 * 存在
 */
export class DExist extends DProperty {
    protected visibile:boolean = false;

    /**
     * 显示
     */
    public get Visibile(){
        return this.visibile;
    }

    public set Visibile(visibile){
        this.visibile = visibile;
    }

    public constructor(visibile:boolean){
        super(DExist.name);
        this.visibile = visibile;
    }
}