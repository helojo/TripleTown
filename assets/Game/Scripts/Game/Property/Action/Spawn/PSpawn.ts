import PAction from "../PAction";
import CProperty from "../../CProperty";

export default class PSpawn extends PAction {
    public Actions:Array<PAction> = null;

    public constructor(callback:(cProperty:CProperty, pSpawn:PSpawn)=>void){
        super();
        this.Callback = callback;
        this.bind = "CSpawn";
        this.Actions = new Array<PAction>();
    }
}