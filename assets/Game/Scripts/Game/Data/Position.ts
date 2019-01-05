import { DProperty } from "./Container";

/**
 * 层级
 */
export enum ETier {
    Floor,
    Cell
}

/**
 * 坐标
 */
export class SCoordinate {
    public x:number;
    public y:number;

    public constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }

    /**
     * 判断是否相等
     * @param coordinate 坐标
     */
    public equal(coordinate:SCoordinate):boolean{
        return coordinate != null && coordinate.x == this.x && coordinate.y == this.y;
    }

    /**
     * 判断是否是周围
     * @param coordinate 坐标
     */
    public round(coordinate:SCoordinate):boolean{
        let ret = false;

        if (coordinate) {
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
                ret = x == coordinate.x && y == coordinate.y;
                if (ret) {
                    break;
                }
            }
        }

        return ret;
    }

    /**
     * 转换为像素坐标
     * @param side 边长
     */
    public toVec2(side:number):cc.Vec2{
        return cc.v2(this.x * side, this.y * side);
    }

    /**
     * 克隆
     */
    public clone(){
        return new SCoordinate(this.x, this.y);
    }
}

export class DPosition extends DProperty{
    protected coordinate:SCoordinate = null;
    protected tier:ETier = ETier.Cell;

    /**
     * 坐标
     */
    public get Coordinate(){
        return this.coordinate;
    }

    public set Coordinate(coordinate){
        this.coordinate = coordinate;
    }

    /**
     * 层级
     */
    public get Tier(){
        return this.tier;
    }
    
    public set Tier(tier:ETier){
        this.tier = tier;
    }

    public constructor(coordinate:SCoordinate){
        super(DPosition.name);
        this.coordinate = coordinate;
    }
}