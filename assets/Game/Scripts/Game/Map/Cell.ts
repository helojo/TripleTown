import DataView from "../DataView";
import { DProperty } from "../Data/Container";
import DPosition from "../Data/Position";
import DExist from "../Data/Exist";
import DDisplay from "./Display";

const {ccclass, property} = cc._decorator;

export class DCell extends DProperty {
    protected position:DPosition = null;
    protected exist:DExist = null;
    protected display:DDisplay = null;

    /**
     * 坐标
     */
    public get Position():DPosition{
        return this.position;
    }

    public set Position(position:DPosition){
        this.position = position;
    }

    /**
     * 存在
     */
    public get Exist(){
        return this.exist;
    }

    public set Exist(exist:DExist){
        this.exist = exist;
    }

    /**
     * 显示
     */
    public get Display(){
        return this.display;
    }

    public set Display(display:DDisplay){
        this.display = display;
    }

    public constructor(){
        super(DCell.name);
    }
}

@ccclass
export default class Cell extends DataView<DCell> {

    @property(cc.Label)
    private num:cc.Label = null;

    protected updateView(){
        this.num.string = this.data.Display.num.toString();
    }
}
