import { DProperty } from "./Container";

/**
 * 网格数据
 */
export default class DGrid<T> extends DProperty {
    protected width:number = null;
    protected height:number = null;
    protected grid:Array<Array<T>> = null;

    /**
     * 宽度
     */
    public get Width(){
        return this.width;
    }

    /**
     * 高度
     */
    public get Height(){
        return this.height;
    }

    /**
     * 网格
     */
    public get Grid(){
        return this.grid;
    }

    public constructor(width:number, height:number){
        super(DGrid.name);
        this.width = width;
        this.height = height;
        this.grid = new Array<Array<T>>();
    }
}