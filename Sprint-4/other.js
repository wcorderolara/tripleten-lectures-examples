let totalAmount = 125.00;
const DELIVERY_FREE_AMOUNT = 100.00;
const DISCOUNT_10_PERCENT = 75.00;
const DISCOUNT_15_PERCENT = 125.00;
const DISCOUNT_25_PERCENT = 200.00;

function userDiscount(amount, discount=0) {
    const discountAmount = calculateDiscount(amount, discount);
    const result = calculateFinalPrice(amount, discountAmount, 20);

    console.log(`your total amount is: $ ${amount} 
        and you get a discount of ${discount}% off
        so, you are saving $ ${discountAmount} dollars`);

    console.log(`The price before taxes is $ ${result.beforeTaxes}`);
    console.log(`The taxes are $ ${result.taxes}`);
    console.log(`The final price after Taxes is $ ${result.beforeTaxes + result.taxes}`);
}

function calculateDiscount(amount, percentage) {
    // Convert percentage to decimal by dividing by 100
    // Then multiply by the amount to get the discount
    let discount = (amount * percentage) / 100;
    return discount;
}

function calculateFinalPrice(originalAmount, discountAmount, taxRate=13) {
    // We need to substract the discount Amount from the original Amount
    let priceBeforeTaxes = originalAmount - discountAmount;
    // Multiply the amount by the taxRate and will divide the result by 100
    let taxAmount = (originalAmount * taxRate) / 100;
    return {
        beforeTaxes: priceBeforeTaxes,
        taxes: taxAmount
    } // keyName: valueForThatKey --> Key:Value Object
}

if (totalAmount >= DISCOUNT_25_PERCENT) {
    userDiscount(totalAmount, 25);
}else if (totalAmount >= DISCOUNT_15_PERCENT) {
     userDiscount(totalAmount, 15);
}else if (totalAmount >= DISCOUNT_10_PERCENT) {
     userDiscount(totalAmount, 10);
} else {
    userDiscount(totalAmount);
}


// let student1 = "Chase";
// let student2 = "Daniel";
// let student3 = "Elias";
// let student4 = "Miraal";
// let student5 = "Vindod";
// let student6 = "Dong";
// // declare an empty array
// // let student = [];

// // creating an Array with Values
// // index           0       1         2       3        4      5     6     7        8        9
// let students = ["Chase","Daniel","Elias","Miraal","Vinod","Dong","Kai","Max","Honorine","Shams"]

// //let mixedArray = [42, 'hello', true, false, [1, 2]];

// // BRACKET NOTATION
// // name of your Array[the index of the array element]
// console.log(students[7]);

// let studentPosition = 4;
// console.log(students[studentPosition]);

// // modify an element
// students[9] = "Katy";
// console.log(students);

// // Finding the Length
// console.log(students.length);
// let arrayLength = students.length;
// console.log(students[arrayLength-1]);

// // How to Iterate over Arrays
// for(let index = 0; index < students.length; index++) {
//     console.log(`Student at index ${index} is ${students[index]}`);
//}

// let index = 0;
// while(index < students.length) {
//     console.log(`While statement Student at index ${index} is ${students[index]}`);
//     index++;
// }

// Add elements at the end of the Array
// nameOfTheArray.push(the value that we will push to the end of the array)
// students.push('Jennifer');
// students.push('Marcos');
// students.push('Shams');

// nameOfTheArray.unshift(Append elements at the beginning of the Array)
// students.unshift('Alfonso');
// students.unshift('Mark');

// removing the last element
// array.pop() --> removes the last element of an Array
// let studentRemoved = students.pop();
// console.warn(`student removed ${studentRemoved}`);

// removing the first element
// array.shift() --> removes the first element of an Array
// let firstStudentRemoved = students.shift();
// console.warn(`the first student removed is ${firstStudentRemoved}`);

// remove something between
// array.splice(startIndex, deleteCount)

// students.splice(2,2);

//let students = [ "Chase","Daniel", "Victor", "Sofia","Elias","Miraal","Vinod","Dong","Kai","Max","Honorine","Shams"]
// array.splice(startIndex, deleteCount, "Victor", "Sofia")
// students.splice(2,2,"Victor", "Sofia");
// students.splice(2,0,"Victor", "Sofia");
// console.log(students);

let name = "Carmen Salinas";
let age = 25;
let studentId = 'STD-12345';
let major = "Computer Science";
let studentPhoneNumber;
let studentAddress;

// key and value --> property
// key is the name of property
// value is the value of the property
// key:value --> Key-value pair
let student = {
    name: "Carmen Salinas",
    age: 25,
    id: 'STD-12345',
    major: 'Computer Science',
    phoneNumber: '+1 2356 8987',
    isActive: true,
    addresses: [
        "Address 1",
        "Address 2"
    ],
    emergencyContacts: [
        {name: "Carlos Salinas", phoneNumber: "+1 4567 897"},
        {name: "Maria del Rosario Salinas", phoneNumber: "+1 4567 899"},
    ]
}

student.gender = "female";

// dot notation is objectName.propertyName
console.log(student.name, student.phoneNumber);

// bracket notation --> objectName["propertyName"]
console.log(student["gender"]);

console.log(student);
