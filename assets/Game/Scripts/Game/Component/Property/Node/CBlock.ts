import CNode from "../CNode";
import PBlock from "../../../Property/Node/PBlock";

const {ccclass, property} = cc._decorator;

/**
 * 方块
 */
@ccclass
export default class CBlock extends CNode {
    
    @property(cc.Label)
    protected text:cc.Label = null;

    protected onView(property:PBlock){
        super.onView(property);
        
        this.text.string = property.Text;
    }
}