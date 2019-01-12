import PAction from "../PAction";
import SPosition from "../../../Struct/SPosition";


/**
 * 移动
 */
export default class PMove extends PAction {
    protected position:SPosition = null;
    protected unit:number;

    /**
     * 移动到坐标
     */
    public get Position(){
        return this.position;
    }

    /**
     * 移动一格时间
     */
    public get Unit(){
        return this.unit;
    }

    public constructor(unit:number, position:SPosition){
        super();
        this.unit = unit;
        this.position = position;
    }
}