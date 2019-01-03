import Cell, { DCell } from "../Cell";
import { DDisplay } from "../Data/Display";

export class DBlock extends DCell {
    protected display:DDisplay = null;

    /**
     * 显示
     */
    public get Display(){
        return this.display;
    }

    public set Display(display){
        this.display = display;
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