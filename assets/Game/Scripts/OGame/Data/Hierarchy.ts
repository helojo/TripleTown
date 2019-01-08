import { DContainer } from "./Container";
import { DGrid } from "./Grid";

export class DHierarchy extends DContainer {
    /**
     * 网格
     */
    public get Grid(){
        return <DGrid>this.getProperty(DGrid.name);
    }
    
    public set Grid(grid){
        this.setProperty(grid);
    }

    public constructor(name:string){
        super(name);
    }
}