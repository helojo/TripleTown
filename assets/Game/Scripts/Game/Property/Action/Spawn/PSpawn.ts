import PAction from "../PAction";
import CProperty from "../../CProperty";
import CNode from "../../Node/CNode";

export class SActionPackage {
    protected action:PAction = null;
    protected node:CNode = null;

    /**
     * 动作
     */
    public get Action(){
        return this.action;
    }

    /**
     * 节点
     */
    public get Node(){
        return this.node;
    }

    public constructor(node:CNode, action:PAction){
        this.node = node;
        this.action = action;
    }
}

export default class PSpawn extends PAction {
    public Actions:Array<SActionPackage> = null;

    public constructor(callback:(cProperty:CProperty, pSpawn:PSpawn)=>void){
        super();
        this.Callback = callback;
        this.bind = "CSpawn";
        this.Actions = new Array<SActionPackage>();
    }
}