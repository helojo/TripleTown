import { DMap } from "./Map";
import DataView from "../DataView";
import { SCoordinate } from "../Data/Position";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Input extends DataView<DMap> {
    
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

    }

    private toGrid(location:cc.Vec2):SCoordinate{
        return null;
    }

}
