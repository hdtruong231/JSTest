const fs = require('fs');
const path = require('path');

// Thư mục lưu trữ các file
const directory = './Json_file';

function readAllFiles(fileName) {
    let str = 'file: ' + fileName;
    fs.readFile(path.join(directory, fileName), 'utf8', (err, data) => {
        try {
            data = JSON.parse(data);
            str += '\nOK\n';
            console.log('\n',data);
        }
        catch (err) {
            console.log('\nError parsing JSON string:', fileName);
            str += '\nNOK\n';
        } finally {
            fs.appendFile(path.join(directory, 'results.txt'), str, (err) => {
                if (err) {
                    console.log('Error appending to file:', err);
                }
            });
        }
    });
}

for (let i = 1; i <= 10; i++) {
    readAllFiles('file' + i + '.json');
}


