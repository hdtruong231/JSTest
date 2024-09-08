import { store } from "./store.js";

const specification = store?.products[0]?.details?.specifications;
// const specification = store?.products?.find(product => product.id === 1)?.details?.specifications;

if (specification) {
  console.log('specification: ' , specification);
} else {
    console.log('specifications can not be found');
    }

const specification2 = store?.products?.find(product => product.id === 3)?.getPrice();
if (specification2) {
    console.log('Price of product with id = 3: ' , specification2);
} else {
    console.log('không có thông tin giá sản phẩm');
    }