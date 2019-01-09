import CLayer from "../CLayer";
import PFloor from "../../../Property/Layer/PFloor";
import CTile from "../Node/CTile";

const {ccclass, property} = cc._decorator;

/**
 * 地板
 */
@ccclass
export default class CFloor extends CLayer {
    
    @property({displayName:"Tile Prefab", type:cc.Prefab})
    protected prefab:cc.Prefab = null;

    protected onView(property:PFloor){
        let width = property.Grid.Size.Width
        let height = property.Grid.Size.Height;
        const map = property.Grid.Map;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let pTile = map[x][y];
                let node = cc.instantiate(this.prefab);
                this.node.addChild(node);
                let cTile = node.getComponent<CTile>(CTile);
                cTile.Property = pTile;
            }
        }
    }
}