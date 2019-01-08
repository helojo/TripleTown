import GComponent from "../GComponent";
import { SCoordinate } from "../Data/Position";
import Game from "../Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Input extends cc.Component {

    public static SELECT = "InputSelect";
    public static SWITCH = "InputSwitch";
    public static CLICK  = "InputClick";


    private select:SCoordinate = null;

    // LIFE-CYCLE CALLBACKS:

    onEnable () {
        cc.log("Input.onEnable");
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onDisable () {
        cc.log("Input.onDisable");
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    /**
     * 按下
     * @param event 事件
     */
    private onTouchStart(event:cc.Event.EventTouch){
        let position = this.node.convertToNodeSpace(event.getLocation());
        let coordinate = this.toGrid(position);
        //点击事件
        this.node.emit(Input.CLICK, coordinate);
        if (this.select) {
            //判断点击的是否可交换
            if (this.select.round(coordinate)) {
                //取消选中
                this.node.emit(Input.SELECT, this.select, false);
                //交换
                this.node.emit(Input.SWITCH, this.select, coordinate);
                //置空
                this.select = null;
            }
        }else{
            this.select = coordinate;
            this.node.emit(Input.SELECT, coordinate, true);
        }
    }

    /**
     * 移动
     * @param event 事件
     */
    private onTouchMove(event:cc.Event.EventTouch){
        if (this.select) {
            let position = this.node.convertToNodeSpace(event.getLocation());
            let coordinate = this.toGrid(position);
            //判断点击的是否可交换
            if (this.select.round(coordinate)) {
                //取消选中
                this.node.emit(Input.SELECT, this.select, false);
                //交换
                this.node.emit(Input.SWITCH, this.select, coordinate);
                //置空
                this.select = null;
            }
        }
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
