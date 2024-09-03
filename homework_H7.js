// valid passwork
 function countPass(password)
 {
    let count = {
        length: 0,
        upperCharactor: 0,
        lowerCharactor: 0,
        numberCharactor: 0,
        specialCharactor: 0
    };
    count.length =password.length;
    let upper = 0;
    let lower = 0;
    let number = 0;
    let special = 0;
    let specialChar = "-#!$@£%^&*()_+|~=`{}[]:\";'<>?,./";
    for (let i of password)
    {
        if (i >= 'A' && i <= "Z")
        {
            upper++;
        }
        else if (i >= 'a' && i <= 'z')
        {
            lower++;
        }
        else if (i >= '0' && i <= '9')
        {
            number++;
        }
        else if (specialChar.includes(i))
        {
            special++;
        }
    }
    if (password.length != (upper + lower + number + special))
    {
        return "Invalid password";
    }
    count.upperCharactor = upper;
    count.lowerCharactor = lower;
    count.numberCharactor = number;
    count.specialCharactor = special;
    return count;
 }
 const passwordPolicy = {
    minLenth: 8,
    maxLength: 30,
    upperCharactor: 1,
    lowerCharactor: 1,
    numberCharactor: 2,
    specialCharactor: 1
 };
function checkPass(password)
{
    let check = true;
    let str = ""
    let count = countPass(password);
    if (count == "Invalid password")
    {
        return " isValidPassWord: flase \n\tPassword is invalid because it contains spaces";
    }
    if (count.length < passwordPolicy.minLenth)
    {
        check = false;
        str += "\tPassword should have at least "+ passwordPolicy.minLenth + " characters\n";
    }
    if (count.length > passwordPolicy.maxLength)
    {
        check = false;
        str += "\tPassword should have at most " + passwordPolicy.maxLength + " characters\n";
    }
    if (count.upperCharactor < passwordPolicy.upperCharactor)
    {
        check = false;
        str += "\tPassword should have at least "+ passwordPolicy.upperCharactor +" uppercase characters\n";
    }
    if (count.lowerCharactor < passwordPolicy.lowerCharactor)
    {
        check = false;
        str += "\tPassword should have at least "+ passwordPolicy.lowerCharactor +" lowercase characters\n";
    }
    if (count.numberCharactor < passwordPolicy.numberCharactor)
    {
        check = false;
        str += "\tPassword should have at least "+ passwordPolicy.numberCharactor+ " numeric characters\n";
    }
    if (count.specialCharactor < passwordPolicy.specialCharactor)
    {
        check = false;
        str += "\tPassword should have at least "+ passwordPolicy.specialCharactor + " special characters\n";
    }
    if (check == true)
    {
        return "isValidPassword: true";
    } else 
    {
        return "isValidPassWord: flase \n" + str;
    }

}
 
 
 let passwork = "Aa456.@......\"";
 let count = countPass(passwork);
    console.log(count);
    console.log(passwordPolicy);
    console.log(checkPass(passwork));
    console.log(checkPass("Aa456.@"));
    console.log(checkPass("Aa456.@   ......\""));
