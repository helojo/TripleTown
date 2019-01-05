import { DAction, AComponent } from "../AComponent";
import { SCoordinate } from "../Data/Position";
import Game from "../Game";
import Cell, { DCell } from "../Cell";

export class DMove extends DAction {
    protected coordinate:SCoordinate = null;

    /**
     * 位置
     */
    public get Coordinate(){
        return this.coordinate;
    }

    constructor(coordinate:SCoordinate){
        super(AMove.name);
        this.coordinate = coordinate;
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export class AMove extends AComponent {

    @property
    protected interval:number = 0.25;

    protected updateView(){
        let data = <DMove>this.data;
        let cooA = this.getCoordinate();
        let cooB = data.Coordinate;
        let mag = cooA.toVec2(1).subSelf(cooB.toVec2(1)).mag();
        let time = mag * this.interval;
        let callback = function(){
            this.setCoordinate(cooB);
            if (this.callback) {
                this.callback(this.node);
            }
        }
        let aCF = cc.callFunc(callback.bind(this));
        let aMT = cc.moveTo(time, cooB.toVec2(Game.Side));
        let aSeq = cc.sequence(aMT, aCF);
        this.node.runAction(aSeq);
    }

    /**
     * 获取坐标
     */
    private getCoordinate():SCoordinate{
        let cell = this.getComponent(Cell);
        let data = <DCell>cell.Data;
        return data.Position.Coordinate;
    }

    /**
     * 设置坐标
     * @param coordinate 坐标
     */
    private setCoordinate(coordinate:SCoordinate){
        let cell = this.getComponent(Cell);
        let data = <DCell>cell.Data;
        data.Position.Coordinate = coordinate.clone();
    }
}