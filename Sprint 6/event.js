const myButton = document.querySelector('#myButton');


// <button onclick="sayHello()"></button>
// myButton.addEventListener('click', function(event) {
//     console.log(event.target);

//     event.target.style.backgroundColor="Blue";
// }); //

/**
 * click
 * dblclick
 * mouseover
 * mouseout
 * keydown - when a key is pressed down
 * keyup - when a key is released
 * submit = when a form is submitted
 * load = When a page finishes loading
 */

function sayHello() {
    alert('Hello World!');
}

// fetch all the containers
const grandparent = document.querySelector('#grandParent');
// const parent = document.querySelector('#parent');
// const child = document.querySelector('#child');
// const secondChild = document.querySelector('#second-child');

grandparent.addEventListener('click', function(event) {
    let anotherChild = event.currentTarget.querySelector('#second-child');

    if(anotherChild) {
        anotherChild.remove();
    }
})
// parent.addEventListener('click', function() {
//     console.log('parent Clicked');
// })
// child.addEventListener('click', function() {
//     console.log('child Clicked');
// })
// secondChild.addEventListener('click', function() {
//     console.log('secondChild Clicked');
// })