import CLogic from "./Property/CLogic";
import CLevel from "./CLevel";
import SLevel from "../Struct/SLevel";

const {ccclass, property} = cc._decorator;

/**
 * 游戏
 */
@ccclass
export default class CGame extends cc.Component {
    
    /**
     * 游戏资源路径
     */
    public static get ResourcesPath(){
        return "Prefab/Game/";
    }

    @property(CLevel)
    protected cLevel:CLevel = null;

    @property(CLogic)
    protected cLogic:CLogic = null;

    start(){
        let pLogic = this.cLevel.generate(new SLevel());
        this.cLogic.Property = pLogic;
    }
}