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

    protected onView(property:PBlock){
        super.onView(property);
        
        this.text.string = property.Text;
    }

    /**
     * 判断类型相等
     * @param cBlock 方块
     */
    public equal(cBlock:CBlock){
        if (!cBlock) {
            return false;
        }
        let sProperty = <PBlock>this.property;
        let cProperty = <PBlock>cBlock.property;
        return sProperty.equal(cProperty);
    }

    public toString(){
        return this.text.string;
    }
}