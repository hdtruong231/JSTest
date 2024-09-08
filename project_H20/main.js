
import { promotionPercentCalc } from "./hotel.js";
import { reasons,icons } from "./hotel.js";
import  myHotel  from "./hotel.js";
function assignEmoji() {
  const emojis = icons;
  for ( let ht of myHotel) {
    ht.emoji = emojis[Math.floor(Math.random() * 10)];
  }
}
function calculatePromotionPercent() {
  for (let ht of myHotel) {
    ht.promotionPercent = promotionPercentCalc(ht.price, ht.promotionPrice);
  }
}
function assignTags()
{
    let bp = 0;
    let bpp = 0;
    let bcf = 0;
    for (let i = 0; i < myHotel.length; i++) {
        if (Number.parseInt(myHotel[i].price.replace(/[$,]/g,'')) < Number.parseInt(myHotel[bp].price.replace(/[$,]/g,''))) {
            bp = i;
        }
        if (Number.parseInt(myHotel[i].promotionPrice.replace(/[$,]/g,'')) < Number.parseInt(myHotel[bpp].promotionPrice.replace(/[$,]/g,''))) {
            bpp = i;
        }
        if (Number.parseInt(myHotel[i].cleaningFee.replace(/[$,]/g,'')) < Number.parseInt(myHotel[bcf].cleaningFee.replace(/[$,]/g,''))) {
            bcf = i;
        }
    }
    myHotel[bp].tags = '';
    myHotel[bpp].tags = '';
    myHotel[bcf].tags = '';
    myHotel[bp].tags += reasons[1] + '   ';
    myHotel[bpp].tags += reasons[0]+ '   ';
    myHotel[bcf].tags += reasons[2]+ '   ';
}

assignEmoji();
calculatePromotionPercent();
assignTags();
console.log(myHotel);
