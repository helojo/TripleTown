import CLogic from "./Property/CLogic";
import CLevel from "./CLevel";
import SLevel from "../Struct/SLevel";

const {ccclass, property} = cc._decorator;

/**
 * 游戏
 */
@ccclass
export default class CGame extends cc.Component {
    
    @property(CLevel)
    protected cLevel:CLevel = null;

    @property(CLogic)
    protected cLogic:CLogic = null;

    start(){
        let pLogic = this.cLevel.generate(new SLevel());
        this.cLogic.Property = pLogic;
    }
}