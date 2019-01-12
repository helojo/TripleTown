import CAction from "../CAction";
import PSpawn from "./PSpawn";
import CProperty from "../../CProperty";

export default class CSpawn extends CAction {
    protected count:number = 0;

    protected onData(pSpawn:PSpawn){
        let actions = pSpawn.Actions;
        for (const action of actions) {
            let bind = this.bindComponent(action.Bind);
            if (bind) {
                this.count++;
                action.Callback = this.callback.bind(this);
                bind.Property = action;
            }
        }
    }

    private callback(cProperty:CProperty, pSpawn:PSpawn){
        this.count--;
        if (this.count == 0) {
            let pSpawn = <PSpawn>this.property;
            let callback = pSpawn.Callback;
            if (callback) {
                callback(this, pSpawn);
            }
        }
    }

    private bindComponent(name:string){
        let comp = <CAction>this.getComponent(name);
        if (!comp) {
            comp = <CAction>this.addComponent(name);
        }
        return comp;
    }

}