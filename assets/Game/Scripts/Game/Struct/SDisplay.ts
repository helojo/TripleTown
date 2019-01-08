/**
 * 显示
 */
export default class SDisplay {
    protected text:string;

    /**
     * 文字
     */
    public get Text(){
        return this.text;
    }

    public constructor(text:string){
        this.text = text;
    }
}