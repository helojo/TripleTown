import Cell, { DCell } from "../Cell";

/**
 * 地砖数据
 */
export class DTile extends DCell {
    
    public constructor(){
        super(DTile.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
/**
 * 地砖
 */
export default class Tile extends Cell {
    
}