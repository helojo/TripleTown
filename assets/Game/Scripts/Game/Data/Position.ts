export enum ETier {
    Floor,
    Cell
}

/**
 * 位置数据
 */
export default class DPosition {
    /**
     * 横坐标
     */
    public x:number;

    /**
     * 纵坐标
     */
    public y:number;

    /**
     * 层级
     */
    public tier:ETier;
}