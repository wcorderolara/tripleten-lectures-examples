// indexOf - Finding the First Ocurrence

let message = "Hello, welcome to JavaScritp";

// find where "welcome" starts
console.log(message.indexOf("welcome"));

//lastIndexOf - Return the Last Occurrence
let text = "I love dogs, dogs are really amazing, dogs are good";

// find the last occurrence of "dogs"
console.log(text.lastIndexOf('dogs'));

// something exists in the string
let email = 'student@example.com';

console.log(email.includes('@'));
console.log(email.includes('xyz'));

//if a string starts or ends with and specific word, character or something
let filename = 'report.pdf';
let report = 'IT-2325654.xls';

console.log(filename.endsWith('.pdf'));
console.log(filename.endsWith('.docx'));

console.log(report.startsWith('IT'));

// trim help us to remove extra white spaces
let name = "             Alexander           ";
let userName = "     ";

console.log(name);
console.log(userName);

console.log(name.toUpperCase().trim());

// falsy
if(userName.trim()) {
    console.log('the user enters something valid');
} else {
    console.log('the user enters something invalid');
}

// NUMBERS
let age = 25; // integer
let price = 19.99; // float
let negative = -25; // negative

// Infinity
console.log(1/0);
console.log(10000**1000);

// NaN --> Not a Number
console.log('5' / 2);

// Parse the string to number
// parseInt
let ageText = "38";
let futureAge = parseInt(ageText) + 1;

if( isNaN(futureAge)) {
    console.log("I can not convert strings to number");
} else {
    console.log(futureAge);
}

let priceText = "19.99"

console.log(parseFloat(priceText));

// Math
console.log(Math.round(parseFloat(priceText)));
console.log(Math.floor(parseFloat(priceText)));


let anotherPrice = 19.8567;

// .toFixed(amount of decimals)
console.log(anotherPrice.toFixed(1));

// [5 10 3 8 40 45 12]
// MAX value
let maxNumber = Math.max(5,10,3, 8, 40, 45, 12)
console.log(maxNumber);


// MIN
let minNumber = Math.min(5,10,3, 8, 40, 45, 12)
console.log(minNumber);





