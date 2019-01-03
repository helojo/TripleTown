import { DProperty } from "../Data/Container";

export default class DDisplay extends DProperty {
    public num:number = null;

    public constructor(){
        super(DDisplay.name);
    }
}