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

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}

/**
 * 位置数据
 */
export default class DPosition extends DProperty {
    protected coordinate:SCoordinate = null;
    protected tier:ETier = ETier.Cell;

    /**
     * 坐标
     */
    public get Coordinate(){
        return this.coordinate;
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