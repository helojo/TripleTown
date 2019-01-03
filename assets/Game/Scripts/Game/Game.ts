import { DProperty } from "./Data/Container";
import GComponent from "./GComponent";

export class DGame extends DProperty {

}

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends GComponent {

    /**
     * 边长
     */
    public static get Side(){
        return 80;
    }
}