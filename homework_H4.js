// money format
function formatMoney(x)
{
    x = Number(x);
    x = Math.floor(x);
    x = Intl.NumberFormat('vi-VN', {style:"currency", currency: "VND"}).format(x);
    x = x.replace(/\./g, ',');
    x = x.replace("₫", "VND");
    return x;
}
function formatMoney2(x, numberRound)
{
    x = Number(x);
    x = Math.floor(x);
    x = Math.round(x/Math.pow(10, numberRound))*Math.pow(10, numberRound);
    x = Intl.NumberFormat('vi-VN', {style:"currency", currency: "VND"}).format(x);
    x = x.replace(/\./g, ',');
    x = x.replace("₫", "VND");
    return x;
}

console.log(formatMoney(10000000)); 
console.log(formatMoney(1234567.89));
console.log(formatMoney2(211111111,3)); 