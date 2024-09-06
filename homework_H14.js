
function demoPromise()
{
    let x = Math.floor(Math.random() * 10) + 1; 
    let promise = new Promise((resolve, reject) => {
        if (x >= 5) {
            resolve(true);
        } else {
            reject(false);
        }
    });
    return promise;
}
// demoPromise()
//     .then(result => {
//         console.log('Promise resolved:', result);
//     })
//     .catch(error => {
//         console.log('Promise rejected:', error);
//     });

Promise.all([demoPromise(), demoPromise()])
    .then(results => {
        console.log('Both promises resolved:', results);
    })
    .catch(error => {
        console.log('At least one promise rejected:', error);
    });