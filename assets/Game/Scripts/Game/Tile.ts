import Cell from "./Cell";
import DataView from "./DataView";
import { DProperty } from "./Data/Container";
import DPosition from "./Data/Position";
import DExist from "./Data/Exist";

/**
 * 地砖数据
 */
export class DTile extends DProperty {
    /**
     * 坐标
     */
    public position:DPosition;

    /**
     * 存在
     */
    public exist:DExist;

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
