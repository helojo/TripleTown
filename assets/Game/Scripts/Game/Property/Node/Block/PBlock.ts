import PNode from "../PNode";

/**
 * 方块
 */
export default class PBlock extends PNode {
    protected type:number = 0;
    protected text:string = null;

    /**
     * 文字
     */
    public get Text(){
        return this.text;
    }

    public constructor(type:number){
        super();
        this.type = type;
        this.text = this.type.toString();
    }

    /**
     * 判断类型
     * @param pBlock 方块
     */
    public equal(pBlock:PBlock){
        return pBlock && this.type == pBlock.type;
    }
}