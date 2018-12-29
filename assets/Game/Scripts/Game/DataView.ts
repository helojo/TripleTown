
const {ccclass, property} = cc._decorator;

@ccclass
export default class DataView<DataType> extends cc.Component {
    protected data:DataType;

    /**
     * 获取地砖数据
     */
    public get Data():DataType{
        return this.data;
    }

    /**
     * 设置地砖数据
     */
    public set Data(data:DataType){
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
