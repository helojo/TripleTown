/**
 * 尺寸
 */
export default class SSize {
    protected width:number = 0;
    protected height:number = 0;

    /**
     * 宽
     */
    public get Width(){
        return this.width;
    }

    /**
     * 高
     */
    public get Height(){
        return this.height;
    }

    public constructor(width:number, height:number){
        this.width = width;
        this.height = height;
    }
}