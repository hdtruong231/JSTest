const fs = require('fs').promises; 
const filePath = './Json-demo-user.json';
const readline = require('readline');

function questionSync(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    }));
}

async function getUsers(pageIndex, pageSize) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        const totalDocs = users.length;
        const totalPage = Math.ceil(totalDocs / pageSize);
        const start = (pageIndex - 1) * pageSize;
        const end = start + pageSize;
        const result = users.slice(start, end);
        console.log(JSON.stringify({ data: { users: result, totalPage, totalDocs } }, null, 2));
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

async function setUsers(userData) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        users.push(userData);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        console.log('User added successfully');
    } catch (err) {
        console.error('Error reading or writing file:', err);
    }
}

async function updateUser(userData) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        const index = users.findIndex((user) => user.id === userData.id);
        if (index === -1) {
            console.log('User not found');
            return;
        }
        users[index] = userData;
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        console.log('User updated successfully');
    } catch (err) {
        console.error('Error reading or writing file:', err);
    }
}

async function deleteUser(userId) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const users = JSON.parse(data);
        const index = users.findIndex((user) => user.id === userId);
        if (index === -1) {
            console.log('User not found');
            return;
        }
        users.splice(index, 1);
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
        console.log('User deleted successfully');
    } catch (err) {
        console.error('Error reading or writing file:', err);
    }
}

async function inputUser() {
    const userData = {};
    console.log('Enter user data:');
    userData.id = parseInt(await questionSync('id: '), 10) ;
    userData.name = await questionSync('name: ');
    userData.role = await questionSync('role: ');
    userData.gender = await questionSync('gender: ');
    userData.nationality = await questionSync('nationality: ');
    if (!userData.id || !userData.name) {
        console.log("ID and name are required.");
        return null; 
    }
    return userData; 
}

async function inputIdForDelete() {
    let userId = parseInt(await questionSync('Enter id: '), 10);
    if (!userId) {
        console.log("ID is required.");
        return null; 
    }
    return userId;  
}

async function menu(check) {
    console.log('\n1. Get users');
    console.log('2. Add user');
    console.log('3. Update user');
    console.log('4. Delete user');
    console.log('5. Exit');
    let choice = await questionSync('Your choice: ');
    switch (choice) {
        case '1':
            let pageIndex = parseInt(await questionSync('Enter page index: '), 10);
            let pageSize = parseInt(await questionSync('Enter page size: '), 10);
            await getUsers(pageIndex, pageSize);
            break;
        case '2':
            const newUser = await inputUser();
            if (newUser) await setUsers(newUser);
            break;
        case '3':
            const updatedUser = await inputUser();
            if (updatedUser) await updateUser(updatedUser);
            break;
        case '4':
            const userId = await inputIdForDelete();
            if (userId) await deleteUser(userId);
            break;
        case '5':
            check.value = false;
            break;
        default:
            console.log('Invalid choice');
            break;
    }
}

async function loopMenu() {
    let check = { value: true };
    while (check.value) {
        await menu(check);
    }
}

loopMenu();
