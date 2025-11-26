/**
 * WHAT is an API?
 * stands for Application Programming Interface
 * 
 * CLIENT: Web App, Web Browser, Mobile App, Smartphone, smartwatch
 * SERVER: is where the actions happens, sql queries, format data, transform data and return data
 * API: The menu of the actions that the server can perform, ENDPOINTS 
 * 
 * WHY?
 * - Get data from external resources
 * - Send data to be processed an stored
 * - Interact with other services without knowing thier internal workings
 * - Build powerful applications by combining different services
 * 
 * HTTP Requests
 * Hypertext Transfer Protocol
 * 
 * GET --> Retrieve Data from the Server
 * POST --> Send Data and store the data in the Server
 * PUT --> Send DAta and Update an existing record in the Server
 * DELETE --> Delete or Remove Data from the Server
 * 
 * ENDPOINT
 * is a specific URL, where you can access an API resource
 * 
 * BASE_URL: https://jsonplaceholder.typicode.com
 * ENDPOINT PATH: /todos/1 --> The model in this case the is called TODOS and 
 * we have parameter in this case the parameter is '1'
 * /todos/:id
 * GET, POST, PUT, DELETE --> CRUD (Create - POST, Read - GET, Update - PUT, Delete - DELETE)
 * /todos/:id
 * GET, POST, DELETE, PUT
 */

// Make HTTP Requests using JS
// FETCH
// GET METHOD by DEFAULT
// FETCH is a PROMISE
fetch('https://pokeapi.co/api/v2/pokemon')
.then( (response) => {
    // JSON Data
    // stands for JavaScript Object Notation
    return response.json();
})
.then( data => {
    console.log(data.results);
})
.catch( (error) => {
    console.error('Error: ', error);
})

