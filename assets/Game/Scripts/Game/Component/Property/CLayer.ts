import CProperty from "../CProperty";
import CNode from "./CNode";
import PLayer from "../../Property/PLayer";
import CGame from "../CGame";

const {ccclass, property} = cc._decorator;

/**
 * 层级
 */
@ccclass
export default class CLayer extends CProperty {
    protected map:Array<Array<CNode>> = null;

    onLoad(){
        this.map = new Array<Array<CNode>>();
    }

    protected onView(property:PLayer){
        let path = CGame.ResourcesPath + property.Prefab;
        cc.loader.loadRes(path, cc.Prefab, this.onLoadComplete.bind(this));
    }

    private onLoadComplete(err:Error, prefab:cc.Prefab){
        if (err) {
            cc.error("CLayer.LoadComplete.", err.message);
            return
        }
        let layer = <PLayer>this.property;
        let grid = layer.Grid;
        if (grid) {
            let width = grid.Size.Width;
            let height = grid.Size.Height;
            
            for (let x = 0; x < width; x++) {
                let cNodeRow = new Array<CNode>();
                for (let y = 0; y < height; y++) {
                    let node = cc.instantiate(prefab);
                    this.node.addChild(node, layer.Hierarchy * 10);
                    let com = node.getComponent(CNode);
                    com.Property = grid.Map[x][y];
                    cNodeRow[y] = com;
                }
                this.map[x] = cNodeRow;
            }
        }
    }
}