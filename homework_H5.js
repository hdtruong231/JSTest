 // even management
const events = [
    { id: 1, name: 'Conference', date: new Date('2023-12-01T09:00:00') },
    { id: 2, name: 'Workshop', date: new Date('2023-12-10T14:30:00') },
    { id: 3, name: 'Meeting', date: new Date('2023-11-20T11:45:00') },
    { id: 3, name: 'Solve rubik', date: new Date('2023-11-29T11:45:00') },
    { id: 3, name: 'Buy new phone', date: new Date('2023-11-30T11:45:00') },
    { id: 3, name: 'Eating', date: new Date('2023-12-20T11:45:00') },
    { id: 3, name: 'Walking', date: new Date('2023-12-20T11:45:00') },
    { id: 3, name: 'Runing', date: new Date('2025-12-20T12:45:00') },
    { id: 3, name: 'Checking Bug', date: new Date('2025-12-20T12:46:00') },
    { id: 3, name: 'Deploy Production', date: new Date('2025-12-20T12:47:00') },
    ];
    
    function sortByDate(events) {
        return events.sort((a, b) => a.date - b.date);
    }

    function showEvents(daystring) // type DD-MM-YYYY
    {
        let a = daystring.split("-");
        let day = parseInt(a[0]); //console.log(day);
        if (day < 10) day = "0" + day; 
        let month = parseInt(a[1]); //console.log(month);
        let year = parseInt(a[2]);  //console.log(year);
        let date = new Date(`${year}-${month}-${day}T00:00:00Z`); 
        console.log("\nEvent in day", daystring,":");
        let check = false;
        for ( let x of events)
        {
            if (x.date.getFullYear() == date.getFullYear() && x.date.getMonth() == date.getMonth() && x.date.getDate() == date.getDate())
            {
                console.log(x); 
                check = true;
            }
        }
        if (check == false)
            console.log("No event");

    }
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
    function timeDifference(date1, date2) // date1, date2 are Date type
    {
        let yeardiff = date1.getFullYear() - date2.getFullYear();
        let monthdiff = date1.getMonth() - date2.getMonth();
        let daydiff = date1.getDate() - date2.getDate();
        if (monthdiff < 0) 
        {
            yeardiff--;
            monthdiff += 12;
        }
        if (daydiff < 0)
        {
            monthdiff--;
            daydiff += dayinMonth(date2.getMonth(), date2.getFullYear());
        }
        let string = "";
        if (yeardiff == 1) string += yeardiff + " year,";
        if (yeardiff > 1) string += yeardiff + " years,";
        if (monthdiff == 1) string += monthdiff + " month,";
        if (monthdiff > 1) string += monthdiff + " months,";
        if (daydiff == 1) string += daydiff + " day";
        if (daydiff > 1) string += daydiff + " days";
        return string;
    }
    function formatTime(date) // date is Date type
    {
        let str = date.toISOString();
        let a = str.split("T")[0];
        return a;
        
    }
    function showTimes(daystring) //type. DD-MM-YYYY
    {
        let a = daystring.split("-");
        let day = parseInt(a[0]); //console.log(day);
        if (day < 10) day = "0" + day; 
        let month = parseInt(a[1]); //console.log(month);
        let year = parseInt(a[2]);  //console.log(year);
        let date = new Date(`${year}-${month}-${day}T00:00:00Z`); 
        let now = new Date();
        if(date > now)
        {
            let check = false;
            console.log("\nEvents that will happen betwen now and", daystring,":");
            for (let x of events)
            {
                if (x.date > now && x.date < date)
                {
                    console.log( "Id:",x.id,"- Event:", x.name,"- Day:", formatTime(x.date), "- TimeRemaining:", timeDifference(x.date, now));
                    check = true;
                }
            }
            if (check == false) console.log("No event will happen");
        }
        else
        {
            let check = false;
            console.log("\nEvents that have happened since", daystring,":");
            for (let x of events)
            {
                if (x.date < now && x.date > date)
                {
                    console.log("Id:",x.id,"- Event:", x.name,"- Day:",formatTime(x.date), "- TimePassed:", timeDifference(now, x.date));
                    check = true;
                }
            }
            if (check == false) console.log("No event has happened");
        }
    }
    console.log(events);
    console.log("\nSort by date:");
    console.log(sortByDate(events));
    showEvents("1-12-2023");
    showEvents("1-11-2024");
     showTimes("1-11-2025");
     showTimes("1-11-2026");
     showTimes("1-11-2022");