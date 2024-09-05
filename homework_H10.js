const readline = require('readline');

let products = [
    { productID: 1, productName: "IPhone 15", price: "45.67" },
    { productID: 2, productName: "Nokia 3310", price: "12.34" },
    { productID: 3, productName: "Laptop", price: "78.90" },
    { productID: 4, productName: "Television", price: "56.78" },
    { productID: 5, productName: "Headphone", price: "23.45" },
    { productID: 6, productName: "Mouse", price: "89.01" },
    { productID: 7, productName: "Keyboard", price: "34.56" },
    { productID: 8, productName: "Rubik", price: "67.89" },
    { productID: 9, productName: "Fridge", price: "45.12" },
    { productID: 10, productName: "Watch", price: "78.34" }
];

let setOrderID = new Set();
let mapOrderDetails = new Map();
let orderID = 1;

function addProductToOrder(callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter product ID: ', (productID) => {
        let product = products.find(p => p.productID === parseInt(productID));
        if (product) {
            rl.question('Enter quantity: ', (quantity) => {
                let orderDetails = mapOrderDetails.get(orderID) || [];
                orderDetails.push({ productID: product.productID, productName: product.productName, price: product.price, quantity: parseInt(quantity) });
                mapOrderDetails.set(orderID, orderDetails);
                rl.close();
                callback(); 
            });
        } else {
            console.log("Invalid product ID");
            rl.close();
            callback(); 
        }
    });
}
function createOrder() {
    addProductToOrder(function askForMore() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Do you want to add more products to the order? (Y/N): ', (response) => {
            if (response.toUpperCase() === "Y") {
                rl.close();
                addProductToOrder(askForMore); 
            } else {
                rl.close();
                console.log("Order created successfully");
                setOrderID.add(orderID);
                orderID++;
                showMenu(); 
            }
        });
    });
}
function showListOrders() {
    console.log("List of orders");
    setOrderID.forEach(orderID => {
        let orderDetails = mapOrderDetails.get(orderID);
        console.log("Order ID: " + orderID);
        orderDetails.forEach(orderDetail => {
            console.log("Product ID: " + orderDetail.productID + " Product Name: " + orderDetail.productName + " Price: " + orderDetail.price + " Quantity: " + orderDetail.quantity);
        });
    });
}
function deleteOrder()
{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter order ID: ', (orderID) => {
        if (setOrderID.has(parseInt(orderID))) {
            setOrderID.delete(parseInt(orderID));
            mapOrderDetails.delete(parseInt(orderID));
            console.log("Order deleted successfully");
        } else {
            console.log("Invalid order ID");
        }
        rl.close();
        showMenu();
    });
}
function updateOrder()
{
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter order ID: ', (orderID) => {
        if (setOrderID.has(parseInt(orderID))) {
            let orderDetails = mapOrderDetails.get(parseInt(orderID));
            rl.question('Enter product ID: ', (productID) => {
                let product = products.find(p => p.productID === parseInt(productID));
                if (product) {
                    rl.question('Enter quantity: ', (quantity) => {
                        let orderDetail = orderDetails.find(od => od.productID === parseInt(productID));
                        if (orderDetail) {
                            orderDetail.quantity = parseInt(quantity);
                        } else {
                            orderDetails.push({ productID: product.productID, productName: product.productName, price: product.price, quantity: parseInt(quantity) });
                        }
                        mapOrderDetails.set(parseInt(orderID), orderDetails);
                        checkquantity(parseInt(orderID));
                        console.log("Order updated successfully");
                        rl.close();
                        showMenu();
                    });
                } else {
                    console.log("Invalid product ID");
                    rl.close();
                    showMenu();
                }
            });
        } else {
            console.log("Invalid order ID");
            rl.close();
            showMenu();
        }
    });
}
function checkquantity(orderID)
{
    let check = true;
    let orderDetails = mapOrderDetails.get(orderID);
    orderDetails.forEach(orderDetails => {
    if (orderDetails.quantity != 0) {
        check = false;
    }});
    if (check == true) {
        setOrderID.delete(orderID);
        mapOrderDetails.delete(orderID);
    }
} 
function showMaxPriceOrder()
{
    let max = 0;
    let orderID = 0;
    mapOrderDetails.forEach((orderDetails, key) => {
        let total = 0;
        orderDetails.forEach(orderDetail => {
            total += orderDetail.price * orderDetail.quantity;
        });
        if (total > max) {
            max = total;
            orderID = key;
        }
    });
    console.log(`The order with the highest price is order ID ${orderID} with total price ${max}`);
}
function showMenu() {
    console.log("\nPlease select an option");
    console.log("1. Create order");
    console.log("2. Show list of orders");
    console.log("3. Delete order");
    console.log("4. Update order");
    console.log("5. Show the order with the highest price");
    console.log("0. Exit");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter option: ', function(option) {
        rl.close();
        if (option === "1") {
            createOrder();
        } else if (option === "2") {
            showListOrders();
            showMenu();  
        } else if (option === "3") {
            deleteOrder();
        } else if (option === "4") {
            updateOrder();
        } else if (option === "5") {
            showMaxPriceOrder();
            showMenu();
        } else if (option === "0") {
            console.log("Exiting...");
        } else {
            console.log("Invalid option, please try again.");
            showMenu();  
        }
    });
}
console.log(products);
showMenu();
