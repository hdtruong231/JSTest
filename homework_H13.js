const fileNames = [
    'Gooup1_User_Tracking_121220230405.txt',
    'Gooup1_User_Tracking_29022023040506.txt',
    'Gooup1_User_Tracking_290220230450.txt',
    'Gooup1_User_Tracking_290220234050.txt',
    'Gooup1_User_Tracking_290220234050.txts', // change file name because of the same name
    'Gooup1_User_Tracking_290020232323.txt',
    'Gooup1_UserTracking_290020232323.txt',
    'Gooup1_User_Tracking_291220232323.txts'
  ];
const fs = require('fs');

function createFile(fileNames) {
    let filepart = './my-data/';
    let check = true;
    for (let i = 0; i < fileNames.length; i++)
    {
        fs.writeFile(filepart + fileNames[i], '', (err) => {
            if (err) 
                {
                    check = false;
                    throw err
                    };
        });
    }
    if (check) {
        console.log('Files created successfully');
    }
}


const regex = /Gooup1_User_Tracking_(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})\.txt$/;

function dayinMonth(month, year) // month, year are number
{
    let day = 0;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) day = 31;
    else if (month == 4 || month == 6 || month == 9 || month == 11) day = 30;
    else if (month == 2)
    {
        if ((year % 4 == 0 && year % 100 != 0)|| year % 400 == 0) day = 29;
        else day = 28;
    }
    return day;
}
function checkValidFile(fileName) {
    let check = true;
    let match = fileName.match(regex);
    if (match == null) 
    {
        console.log(fileName + ' is invalid');
        check = false;
    }
    else
    {
        let day = parseInt(match[1]);
        let month = parseInt(match[2]);
        let year = parseInt(match[3]);
        let hour = parseInt(match[4]);
        let minute = parseInt(match[5]);
        if (day > dayinMonth(month, year) || hour > 23 || minute > 59 || month > 12)
        {
            console.log(fileName + ' is invalid');
            check = false;
        }
    }
    return check;
}
function writeFile(fileNames) {
    let filepart = './my-data/';
    for (let i = 0; i < fileNames.length; i++)
    {
        if (checkValidFile(fileNames[i]))
        {
            fs.readFile(filepart + fileNames[i], 'utf8', (err, data) => {
                if (err) 
                {
                    throw err;
                } else {
                    console.log( "\nData in file: " + fileNames[i] +' :'+  data);
                    fs.appendFile(filepart + fileNames[i], '-OK', (err) => {
                        if (err) 
                            {
                                throw err;
                            } else {
                                console.log('\nData is appended to file ' + fileNames[i]);
                            }
                    });
                }
            });
        }
    }
}


//createFile(fileNames);
writeFile(fileNames);