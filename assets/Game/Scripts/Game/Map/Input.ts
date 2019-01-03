import GComponent from "../GComponent";
import { SCoordinate } from "../Data/Position";
import Game from "../Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Input extends GComponent {

    // LIFE-CYCLE CALLBACKS:

    onEnable () {
        cc.log("Input.onEnable");
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    onDisable () {
        cc.log("Input.onDisable");
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected updateView(){
        
    }

    /**
     * 按下
     * @param event 
     */
    private onTouchStart(event:cc.Event.EventTouch){
        let position = this.node.convertToNodeSpace(event.getLocation());
        let coordinate = this.toGrid(position);
        cc.log(coordinate.x, coordinate.y);
    }

    /**
     * 转换坐标
     * @param location 像素坐标
     */
    private toGrid(location:cc.Vec2):SCoordinate{
        let x = Math.floor(location.x / Game.Side);
        let y = Math.floor(location.y / Game.Side);
        return new SCoordinate(x, y);
    }
}
