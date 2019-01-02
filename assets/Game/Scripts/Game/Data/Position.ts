import { DProperty } from "./Container";

export enum ETier {
    Floor,
    Cell
}

/**
 * 位置数据
 */
export default class DPosition extends DProperty {
    protected x:number;
    protected y:number;
    protected tier:ETier;

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

    /**
     * 层级
     */
    public get Tier(){
        return this.tier;
    }

    /**
     * 层级
     */
    public set Tier(tier:ETier){
        this.tier = tier;
    }

    public constructor(x:number, y:number){
        super(DPosition.name);
        this.x = x;
        this.y = y;
    }
}