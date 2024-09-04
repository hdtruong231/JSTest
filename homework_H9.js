

const fs = require("fs");
const fetch = require('node-fetch');
const axios = require('axios');
const url = "https://dummyjson.com/carts";
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

function getFileName()
{
    let str = "cart-";
    let date = new Date();
    str += date.getDate().toString().padStart(2,"0") + "-" + (date.getMonth()+1).toString().padStart(2,"0") + "-" +
             date.getFullYear().toString() + ".json";
    return str;
}
function writeFile(fs,jsonData)
{
    fs.writeFile(getFileName(),JSON.stringify(jsonData, null,2), function (err)
    {
        if (err) throw err;
        console.log("Record saved successfully");
});
}
// Using XMLHttpRequest
function getDataUsingXMLH(url)
{
    let xmlht = new XMLHttpRequest();
    xmlht.open("Get",url,true);
    xmlht.onreadystatechange = function () 
    {
        if (xmlht.readyState === 4 && xmlht.status === 200)
        {
            const jsonData = JSON.parse(xmlht.responseText);
            writeFile(fs,jsonData);
        }
    }
    xmlht.send();
}
//Using Fetch
function getDataUsingFetch(url)
{
    fetch(url).then(response => response.json()).then(
        jsonData => {
            writeFile(fs,jsonData);
        }).catch(error => console.error('Error:', error));
}
//Using Axios
function getDataUsingAxios(url)
{
axios.get(url)
  .then(response => {
    const jsonData = response.data;
    writeFile(fs,jsonData);
  })
  .catch(error => console.error('Error:', error));

}

console.log("hello");
console.log(getFileName());
getDataUsingXMLH(url);
//getDataUsingFetch(url);
//getDataUsingAxios(url);