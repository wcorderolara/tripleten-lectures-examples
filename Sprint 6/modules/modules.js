// Modular JavaScript
// Organization
// Reusability
// Collaboration 
// Maintenance
// Clarity

// MODERN MODULES (ES6 MODULES)
/**
 * Use import and export statements
 * Built into modern JavaScript code
 * Works in modern browsers and Node.js
 */

const defaultGreeting = "Hello";

function sayHello(name) {
    return `${defaultGreeting} ${name}`;
}

function sayGoodBye(name) {
    return `Goodbye, ${name}`;
}

export function sayGoodAfternoon(name) {
    return `Good afternoon, ${name}`;
}

// DEFAULT EXPORT
export default function sayGoodMorning(name) {
    return `Good morning, ${name}`;
}

// // export a list
export {
    sayHello, sayGoodBye
}

// COMMONJS MODULES
/**
 * Are used in older Node.js versions and old browsers
 * User require() and module.exports
 * Mainly for server-side JavaScript (Node.js)
 */

// AMD( Asynchronous Module Definition)
/**
 * Less common now
 * Ussed in older browser applications
 */