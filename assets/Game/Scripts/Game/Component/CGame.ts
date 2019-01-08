import CLogic from "./Property/CLogic";
import CLevel from "./Property/CLevel";

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
}