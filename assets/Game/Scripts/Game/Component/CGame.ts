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
    protected level:CLevel = null;

    @property(CLogic)
    protected logic:CLogic = null;

    protected start(){
        let lProperty = this.level.generate(new SLevel());
        this.logic.Property = lProperty;
    }
}