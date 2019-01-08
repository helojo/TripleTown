import SLevel from "../Struct/SLevel";
import PLogic from "../Property/PLogic";

const {ccclass, property} = cc._decorator;

/**
 * 关卡
 */
@ccclass
export default class CLevel extends cc.Component {
    

    /**
     * 生成
     * @param level 关卡数据
     */
    public generate(level:SLevel){
        let logic = new PLogic();

        return logic;
    }
}
