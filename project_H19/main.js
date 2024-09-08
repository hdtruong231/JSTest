import add from './add.js';
import div from './div.js';
import {mul} from './mul.js';
import {sub} from './sub.js';

function demo(a,b){
    console.log(add(a,b));
    console.log(div(a,b));
    console.log(mul(a,b));
    console.log(sub(a,b));
}

demo(6,2);