import SPosition from "../../Struct/SPosition";
import { EInput } from "../../GEnum";


const {ccclass, property} = cc._decorator;

/**
 * 输入
 */
@ccclass
export default class CInput extends cc.Component {

    @property
    protected side:number = 0;

    private select:SPosition = null;

    protected onEnable(){
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onDisable(){
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    protected onTouchStart(event:cc.Event.EventTouch){
        let localtion = this.node.convertToNodeSpace(event.getLocation());
        let position = this.toGrid(localtion);
        //点击事件
        this.node.emit(EInput.Click, position);
        if (this.select) {
            //判断点击的是否可交换
            if (this.select.round(position)) {
                //取消选中
                this.node.emit(EInput.Select, this.select, false);
                //交换
                this.node.emit(EInput.Switch, this.select, position);
                //置空
                this.select = null;
            }
        }else{
            this.select = position;
            this.node.emit(EInput.Select, position, true);
        }
    }

    protected onTouchMove(event:cc.Event.EventTouch){
        if (this.select) {
            let position = this.node.convertToNodeSpace(event.getLocation());
            let coordinate = this.toGrid(position);
            //判断点击的是否可交换
            if (this.select.round(coordinate)) {
                //取消选中
                this.node.emit(EInput.Select, this.select, false);
                //交换
                this.node.emit(EInput.Switch, this.select, coordinate);
                //置空
                this.select = null;
            }
        }
    }

    /**
     * 转换到格子坐标
     * @param location 像素坐标
     */
    private toGrid(location:cc.Vec2):SPosition{
        let x = Math.floor(location.x / this.side);
        let y = Math.floor(location.y / this.side);
        return new SPosition(x, y);
    }
}