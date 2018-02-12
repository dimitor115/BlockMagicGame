export default class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    get_distance(other_point){
        const a = this.x - other_point.x;
        const b = this.y - other_point.y;
        const c = a*a + b*b;
        return Math.sqrt(c);
    }
}
