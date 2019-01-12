import CAction from "../CAction";
import PSpawn from "./PSpawn";
import CProperty from "../../CProperty";
import CNode from "../../Node/CNode";

const {ccclass, property} = cc._decorator;

/**
 * 批量
 */
@ccclass
export default class CSpawn extends CAction {
    protected count:number = 0;

    protected onData(pSpawn:PSpawn){
        let packages = pSpawn.Actions;
        for (const sPackage of packages) {
            let action = sPackage.Action;
            let node = sPackage.Node;
            let bind = this.bindComponent(node, action.Bind);
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

    private bindComponent(node:CNode, name:string){
        let comp = <CAction>node.getComponent(name);
        if (!comp) {
            comp = <CAction>node.addComponent(name);
        }
        return comp;
    }

}