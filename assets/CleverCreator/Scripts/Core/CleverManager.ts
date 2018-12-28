import { Dictionary } from "typescript-collections";
import BaseManager from "./BaseManager";
import UIManager from "../UI/UIManager";

export default class CleverManager{
    protected static instance:CleverManager = null;

    /**
     * 获取单例
     */
    public static getInstance():CleverManager{
        if (!CleverManager.instance) {
            CleverManager.instance = new CleverManager();
        }
        return CleverManager.instance;
    }

    protected managerMap:Dictionary<String, BaseManager> = new Dictionary<String, BaseManager>();

    private constructor(){
        console.info("CleverManager.Name.", CleverManager.name);
        
        //添加UIManager
        this.managerMap.setValue(UIManager.name, new UIManager());
    }

    /**
     * 获取管理
     * @param name 名字
     */
    public getManager(name:String){
        return this.managerMap.getValue(name);
    }
}
