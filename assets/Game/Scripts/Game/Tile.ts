
/**
 * 地砖数据
 */
export class TileData {
    /**
     * 是否启用
     */
    public enable:boolean;

    /**
     * 横坐标
     */
    public x:number;

    /**
     * 纵坐标
     */
    public y:number;
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Tile extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
