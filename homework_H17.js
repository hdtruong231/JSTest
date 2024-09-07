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

const listPromise = Array(20).fill().map( function() { return demoPromise(); });

async function demoAsync()
{
    let i = 1;
    for (prm of listPromise)
    {
        console.log('Promise:', i++);
        try {
            let result = await prm;
            console.log('Promise resolved:', result);
        } catch (error) {
            console.log('Promise rejected:', error);
        }
    }
}

//demoAsync();
Promise.all(listPromise)
    .then(results => {
        console.log('All promises resolved:', results);
    })
    .catch(error => {
        console.log('At least one promise rejected:', error);
    });