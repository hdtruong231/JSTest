function demoPromise(delaySeconds)
{
    let x = Math.floor(Math.random() * 10) + 1; 
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (x >= 5) {
                resolve(true);
            } else {
                reject(false);
            }
        }, delaySeconds * 1000);
    });
    return promise;
}

// Promise.all([demoPromise(1), demoPromise(3)])
//     .then(results => {
//         console.log('Both promises resolved:', results);
//     })
//     .catch(error => {
//         console.log('At least one promise rejected:', error);
//     });

Promise.allSettled([demoPromise(5), demoPromise(3)]).then(results => {
    console.log('Both promises resolved:', results);
});