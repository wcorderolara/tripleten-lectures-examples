// INDEX          0           1            2            3           4
const fruits = ['apples', 'pineapple', 'watermelon', 'orange', 'strawberry'];
// natural         1          2            3            4           5

console.log(fruits);

// // Add elements

// // at the end
// // PUSH(item)
// fruits.push('coconut');
// console.log(fruits);

// // at the top
// // UNSHIFT(item)
// fruits.unshift('raspberry');
// console.log(fruits);


// // REMOVE ELEMENTS

// // at the end
// // POP() --> will return the element that we are removing
// const lastFruit = fruits.pop();
// console.log('I am removing the ' + lastFruit + ' from the fruits array');
// console.log(fruits);

// // at the top
// // SHIFT() --> will return the element that we are removing
// const firstFruit = fruits.shift();
// console.log('I am removing the ' + firstFruit + ' from the top of fruits array');
// console.log(fruits);

// INDEX              0           1            2            3           4
// const fruits = ['apples', 'pineapple', 'watermelon', 'orange', 'strawberry'];
// natural            1          2            3            4           5

// TO REMOVE SOMETHING IN ANY PLACE
// SPLICE( START_INDEX, AMOUNT_ITEMS_TO_DELETE )

// console.warn('removing pineapple at Index #1')
// fruits.splice(1, 1);
// console.log(fruits);

// we have a function which receives as parameter the name of the fruit to delete
// we don't know if the fruit exists and we don't know the index in case the fruit exists

function deleteFruit(fruitToDelete) {
    // to search and find de item
    const indexFruit = fruits.findIndex( function(fruit) {
        return fruitToDelete === fruit;
    });
    // to verify if the item exists
    if (indexFruit !== -1) {
        // to delete the item if exists
        const fruitDeleted = fruits.splice(indexFruit, 1);
        console.log(`I'm removing this fruit: ${fruitDeleted}`);
        console.log(fruits);
    }else {
        // show the message if not exists
        console.log('The fruit ' + fruitToDelete +' does not exists in the Array');
    }
}

// INDEX              0           1            2            3           4
// const fruits = ['apples', 'pineapple', 'watermelon', 'orange', 'strawberry'];

// FIND( callback_function(element, index) )
deleteFruit('blueberry');
deleteFruit('orange');

// // callback function
// function searchFruit(fruit) {
//     return fruit === fruitToFind;
// }
// const fruitFound = fruits.findIndex(searchFruit);

// console.log(fruitFound);

// if (fruitFound !== undefined) {
//     // FINDINDEX( callback_function(element, index))
//     const indexFruit = fruits.findIndex( function(fruit) {
//         return fruit === fruitFound;
//     })

//     console.log(indexFruit);

//     // LOGIC TO REMOVE THE FRUIT
//     fruits.splice(indexFruit, 1);
// }

// console.log(fruits);