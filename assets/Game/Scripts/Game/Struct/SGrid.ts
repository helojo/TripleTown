import SSize from "./SSize";

/**
 * 网格
 */
export default class SGrid<T> {
    protected size:SSize = null;
    protected map:Array<Array<T>> = null;

    /**
     * 尺寸
     */
    public get Size(){
        return this.size;
    }

    /**
     * 地图
     */
    public get Map(){
        return this.map;
    }

    public constructor(size:SSize|number, height:number = null){
        if (height == null) {
            this.size = <SSize>size;
        }else{
            let width = <number>size;
            this.size = new SSize(width, height);
        }
        this.map = new Array<Array<T>>();
    }
}