import { DProperty } from "./Data/Container";
import GComponent from "./GComponent";
import { DPosition } from "./Data/Position";
import { DExist } from "./Data/Exist";

/**
 * 细胞数据
 */
export class DCell extends DProperty {
    protected position:DPosition = null;
    protected exist:DExist = null;

    /**
     * 坐标
     */
    public get Position(){
        return this.position;
    }

    public set Position(position){
        this.position = position;
    }

    /**
     * 存在
     */
    public get Exist(){
        return this.exist;
    }
    
    public set Exist(exist){
        this.exist = exist;
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
/**
 * 细胞
 */
export default class Cell extends GComponent {

    protected updateView(){
        let data = <DCell>this.data;
        let position = data.Position;
        let coordinate = position.Coordinate;
        this.node.setPosition(coordinate.x * 80, coordinate.y * 80);
    }
}