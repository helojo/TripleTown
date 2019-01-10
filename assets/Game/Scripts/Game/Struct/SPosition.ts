/**
 * 坐标
 */
export default class SPosition {
    protected x:number;
    protected y:number;

    /**
     * 横坐标
     */
    public get X(){
        return this.x;
    }

    /**
     * 纵坐标
     */
    public get Y(){
        return this.y;
    }

    public constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    /**
     * 比较
     * @param position 坐标
     */
    public equal(position:SPosition){
        return position && position.x == this.x && position.y == this.y;
    }

    /**
     * 环绕
     * @param position 坐标
     */
    public round(position:SPosition){
        let ret = false;
        if (position) {
            let roundArray = [
                {x:0,y:1},       //上
                {x:0,y:-1},      //下
                {x:-1,y:0},      //左
                {x:1,y:0},       //右
            ];
            for (const dir of roundArray) {
                let x = this.x + dir.x;
                let y = this.y + dir.y;
                if (x < 0 || y < 0) {
                    continue;
                }
                ret = x == position.x && y == position.y;
                if (ret) {
                    break;
                }
            }
        }
        return ret;
    }

    /**
     * 转换向量坐标
     * @param multiple 倍数
     */
    public toVec2(multiple:number = 1){
        return cc.v2(this.x * multiple, this.y * multiple);
    }

    /**
     * 克隆
     */
    public clone(){
        return new SPosition(this.x, this.y);
    }

    /**
     * 转换为字符串
     */
    public toString(){
        return cc.js.formatStr("[%s,%s]", this.x.toString(), this.y.toString());
    }
}