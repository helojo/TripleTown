import DataView from "../DataView";
import { DProperty } from "../Data/Container";
import DPosition from "../Data/Position";
import DExist from "../Data/Exist";

/**
 * 地砖数据
 */
export class DTile extends DProperty {
    protected position:DPosition = null;
    protected exist:DExist = null;

    /**
     * 坐标
     */
    public get Position(){
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

    public constructor(){
        super(DTile.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends DataView<DTile> {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    
}
