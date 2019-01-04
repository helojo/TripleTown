import Cell, { DCell } from "../Cell";
import { DDisplay } from "../Data/Display";
import { DType } from "../Data/Type";

export class DBlock extends DCell {
    protected display:DDisplay = null;
    protected type:DType = null;

    /**
     * 显示
     */
    public get Display(){
        return this.display;
    }

    public set Display(display){
        this.display = display;
    }

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
        super(DBlock.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export class Block extends Cell {

    @property(cc.Label)
    protected text:cc.Label = null;

    protected updateView(){
        super.updateView();
        let data = <DBlock>this.data;
        let display = data.Display;
        this.text.string = display.Text;
    }
}