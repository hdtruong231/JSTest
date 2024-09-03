// check positive interger for 2
function check(n) {
    if (n <= 0) {
        return false;
    }
    return (n%2 == 0);
}
console.log(check(2)); 
console.log(check(3)); 
console.log(check(-4)); 
console.log(check(0));