import PNode from "../PNode";

/**
 * 方块
 */
export default class PBlock extends PNode {
    protected type:number = 0;
    protected text:string = null;

    /**
     * 类型
     */
    public get Type(){
        return this.type;
    }

    /**
     * 文字
     */
    public get Text(){
        return this.text;
    }

    public constructor(type:number){
        super();
        this.type = type;
        this.text = type.toString();
    }
}