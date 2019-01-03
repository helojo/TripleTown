import { DProperty } from "./Data/Container";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GComponent extends cc.Component {
    protected data:DProperty;

    /**
     * 获取数据
     */
    public get Data(){
        return this.data;
    }

    /**
     * 设置数据
     */
    public set Data(data){
        this.data = data;
        //更新数据
        this.updateData();
        //更新显示
        this.updateView();
    }

    /**
     * 更新数据
     */
    protected updateData(){

    }

    /**
     * 更新显示
     */
    protected updateView(){

    }
}
