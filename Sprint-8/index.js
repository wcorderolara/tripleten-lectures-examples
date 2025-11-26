const initialCards = [
  {
    name: "Golden Gaate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  {
    name: "Restaurant terrance",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },

  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },

  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },

  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },

  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// CALLBACK

// function sayHello() {
//     console.log("Hello!!");
// }

// sayHello();

// function greet(name, callbackFuntion) {
//     console.log(`Hello ${name}`);
//     callbackFuntion();
// }

// function sayGoodbye() {
//     console.log('Goodbye');
// }

// greet('Alice', sayGoodbye);

// cbf === Callback Function
// function getPicture(url, successCbf, errorCbf) {
//     console.log('Starting to fetch the images....'); // synchronous

//     // Simulate loading time
//     setTimeout( () => { // asynchronous code
//         const success = Math.random() > 0.5; // 50% chance of success

//         if(success) {
//             const pictures = initialCards;
//             successCbf(pictures);
//         } else {
//             errorCbf("Failed to fetch the pictures");
//         }

//     }, 2000);
// }

// getPicture(
//     'https://unsplash.com/photo.jpg',
//     (data) => {
//         console.log(data);
//     },
//     (errorMessage) => {
//         console.error(errorMessage);
//     }
// );

// console.log('This runs immediately, not waiting for the images'); // synchronous code

// PROMISES
// Are a modern solution to callback hell issue. A promise represents a value that will
// be available in the future (or an error if something goes wrong);
// Promise()

/**
 * 3 states
 * PENDING --> Your orders is being prepared
 * FULFILLED --> Your food has arrived (success)
 * REJECTED --> The restaurant is closed or the chef has an issue (failure)
 */

//  Creating a Promise

function getPicture(url) {
  return new Promise((resolve, reject) => {
    // Simulate loading time
    setTimeout(() => {
      // asynchronous code
      const success = Math.random() > 0.5; // 50% chance of success

      if (success) {
        const pictures = initialCards;
        resolve(pictures);
      } else {
        reject("Failed to fetch the pictures");
      }
    }, 2000);
  });
  //   console.log("Starting to fetch the images...."); // synchronous
}

// ASYNC and AWAIT

// #1 convert the async to sync

async function getUserPicture() {
  try {
    const pictures = await getPicture("https://unsplash.com/photo.jpg");
    console.log(pictures);
    console.log("I am a normal/sync code");

  } catch (errorMessage) {
    console.log(errorMessage);
  }
  
    // .then((data) => {
    //   console.log("pictures", data);
    // }) // success callback function
    // .catch((errorMessage) => {
      
    // }); // error callback function

  
}

getUserPicture();
