import CNode from "../CNode";
import PBlock from "./PBlock";

const {ccclass, property} = cc._decorator;

/**
 * 方块
 */
@ccclass
export default class CBlock extends CNode {
    
    @property(cc.Label)
    protected text:cc.Label = null;

    @property(cc.Node)
    protected rect:cc.Node = null;

    @property([cc.Color])
    protected colors:cc.Color[] = [];

    protected onView(property:PBlock){
        super.onView(property);
        
        this.text.string = property.Text;

        let color = this.colors[property.Type];

        if (color) {
            this.rect.color = color;
        }

    }
}