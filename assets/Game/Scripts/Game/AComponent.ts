import { DProperty } from "./Data/Container";
import GComponent from "./GComponent";

const {ccclass, property} = cc._decorator;

@ccclass
export class AComponent extends GComponent {
    protected callback:Function = null;

    public doAction(data:DAction, callback:Function){
        this.callback = callback;
        this.Data = data;
    }

    /**
     * 默认回调
     * 如果重写该函数则无需调用super.updateView()
     */
    protected updateView(){
        this.callback();
    }
}

export class ASpawn {
    protected nodeArray:Array<cc.Node> = null;
    protected actionArray:Array<DAction> = null;
    protected callback:Function = null;
    
    public pushAction(node:cc.Node, action:DAction){
        this.nodeArray.push(node);
        this.actionArray.push(action);
    }

    public doAction(callback:Function){
        this.callback = callback;
        do {
            let node = this.nodeArray.pop();
            let action = this.actionArray.pop();
            if (node && action) {
                let component = node.getComponent(action.Component);
                
            }
        } while (this.nodeArray.length > 0);
    }

    public constructor(){
        this.nodeArray = new Array<cc.Node>();
        this.actionArray = new Array<DAction>();
    }
}

export class DAction extends DProperty {
    protected component:string = null

    /**
     * 组件名
     */
    public get Component(){
        return this.component;
    }

    public constructor(component:string){
        super(DAction.name);
        this.component = component;
    }
}