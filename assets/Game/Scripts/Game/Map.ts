import DataView from "./DataView";
import { DCell } from "./Cell";

export class MapData {
    /**
     * 宽度
     */
    public width:number;

    /**
     * 高度
     */
    public height:number;

    /**
     * 网格数据
     */
    public grid:DCell[][];
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Map extends DataView<MapData> {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
