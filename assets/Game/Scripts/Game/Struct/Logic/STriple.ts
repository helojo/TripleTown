import CNode from "../../Property/Node/CNode";

export enum ETriple {
    None,
    Triple,
    Quadra,
    Penta,
    Cross,
}

export default class STriple {
    protected type:ETriple = ETriple.None;
    protected array:Array<CNode> = null;

    public get Type(){
        return this.type;
    }

    public constructor(array:Array<CNode>){
        this.array = array;
        this.judgeType(array);
    }

    private judgeType(array:Array<CNode>){
        if (!array) {
            return;
        }
        let length = array.length;
        if (length == 3) {
            this.type = ETriple.Triple;
        }else if (length == 4) {
            this.type = ETriple.Quadra;
        }else if (length == 5) {
            let same = true;
            let first = array[0];
            let x = first.Position.X;
            let y = first.Position.Y;
            for (let index = 1; index < array.length; index++) {
                const cNode = array[index];
                let nX = cNode.Position.X;
                let nY = cNode.Position.Y;
                if (nX != x && nY != y) {
                    same = false;
                    break;
                }
            }
            if (same) {
                this.type = ETriple.Penta;
            }else{
                this.type = ETriple.Cross;
            }
        }
    }
}