class DSU {
    constructor(initNetwork) {
        this.ParNodes = initNetwork;
    }
    findParNode(x) {
        if (typeof this.ParNodes[x] != "undefined") {
            if (this.ParNodes[x] < 0) {
                return x;
            } else {
                return this.findParNode(this.ParNodes[x]);
            }
        } else {
            this.ParNodes[x] = -1;
            return x;
        }
    }
    union(x, y) {
        //Specific For trees
        if (this.ParNodes[y] != "undefined" && this.ParNodes[y] >= 0) {
            return false;  // The y node is already having a parent nad hence can't have two parents
        }

        var xPar = this.findParNode(x);
        var yPar = this.findParNode(y);

        if (xPar != yPar) {
            this.ParNodes[xPar] += this.ParNodes[yPar];
            this.ParNodes[yPar] = xPar;
            return true;
        } else {
            return false; // cycle is present
        }
    }
    print() {
        console.log(this.ParNodes);
    }
}

export default DSU;