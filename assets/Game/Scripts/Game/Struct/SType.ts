/**
 * 类型
 */
export default class SType{
    protected num:number = -1;

    public constructor(num:number){
        this.num = num;
    }

    /**
     * 比较
     * @param type 类型
     */
    public equal(type:SType){
        return type && type.num == this.num;
    }
}