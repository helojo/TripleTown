import { DProperty } from "./Container";

export class DDisplay extends DProperty {
    protected text:string;

    /**
     * 文字
     */
    public get Text(){
        return this.text;
    }

    public set Text(text){
        this.text = text;
    }

    public constructor(){
        super(DDisplay.name);
    }
}