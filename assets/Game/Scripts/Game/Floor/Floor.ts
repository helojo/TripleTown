import Hierarchy, { DHierarchy } from "../Hierarchy";

/**
 * 地板层数据
 */
export class DFloor extends DHierarchy {
    
    public constructor(){
        super(DFloor.name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
/**
 * 地板层
 */
export default class Floor extends Hierarchy {

}