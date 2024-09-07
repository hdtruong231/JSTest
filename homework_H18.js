const user = {
    name: 'John',
    age: 30,
    role: 'admin',
    gender: 'Male',
    email: 'example@gmail.com'
};
const listString = ['hello', 'world', 'how', 'are', 'you', 'today'];
const url = "https://dummyjson.com/carts";
const fs = require('fs').promises;
const fetch = require('node-fetch');

function destructuringUser(user) {
    const { name,age,role,gender,email:e } = user;
    console.log(name,age,role,gender,e);
}

function logger(...args) {
    console.log(args.join('|'));
}

async function writeFile(jsonData) {
    try {
        await fs.writeFile('./listproduct.json', JSON.stringify(jsonData, null, 2));
    } catch (err) {
        console.error('Error writing file:', err);
    }
}

async function getDataUsingFetch(url) {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        await writeFile(jsonData);
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log("Fetch data successfully!");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



 //destructuringUser(user);
 //logger(...listString);

getDataUsingFetch(url);