import CNode from "../CNode";

const {ccclass, property} = cc._decorator;

/**
 * 选中
 */
@ccclass
export default class CLight extends CNode {
    
    protected onEnable(){
        this.node.opacity = 0;
        let aniCom = this.getComponent(cc.Animation);
        aniCom.stop();
        aniCom.play();
    }

}