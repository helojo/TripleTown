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

/**
 * 动作包
 */
export class DPackage extends DProperty {
    protected node:cc.Node = null;
    protected action:DAction = null;

    /**
     * 动作节点
     */
    public get Node(){
        return this.node;
    }

    /**
     * 动作数据
     */
    public get Action(){
        return this.action;
    }

    /**
     * 执行动作
     * @param callback 执行完回调
     */
    public doAction(callback){
        let component = <AComponent>this.node.getComponent(this.action.Component);
        if (component) {
            let actCallback = function(){
                callback(this);
            }
            component.doAction(this.action, actCallback.bind(this));
        }else{
            callback(this);
        }
    }

    public constructor(node:cc.Node, action:DAction){
        super(DPackage.name);
        this.node = node;
        this.action = action;
    }
}

/**
 * 同时进行
 */
export class PSpawn {
    protected packages:Array<DPackage> = null;
    protected callback:Function = null;
    
    /**
     * 动作包们
     */
    public get Packages(){
        return this.packages;
    }

    /**
     * 添加动作包
     * @param pkg 动作包
     */
    public pushPackage(pkg:DPackage){
        this.packages.push(pkg);
    }

    public doAction(callback:Function){
        this.callback = callback;
        let length = this.packages.length;
        let count = 0;
        let pkgCallback = function(pkg){
            if (++count == length) {
                if (callback) {
                    callback(this);
                }
            }
        }

        for (const pkg of this.packages) {
            pkg.doAction(pkgCallback);
        }
    }

    public constructor(){
        this.packages = new Array<DPackage>();
    }
}

/**
 * 动作数据
 */
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