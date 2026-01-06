const http = require('http');
const Router = require('./modules/router');
const todoStorage = require('./modules/todoStorage');
const logger = require('./utils/logger');
const {sendSuccess, sendError, sendCreated} = require('./utils/responseHelper');
const {parseBody} = require('./modules/requestParser');

const router = new Router();
const PORT = 3005;

// =========================================
// ROUTES
// =========================================

// Home route
router.get('/', (req, res) => {
    sendSuccess(res, {
        messsage: 'Welcome to the TODO API',
        version: '1.0.0',
        endpoints: {
            'GET /api/todos': 'Get All Todos',
            'GET /api/todos/:id': 'Get Todo by Id'
        }
    })
})

// GET ALL TODOS and GET THE SINGLE TODO BY ID
router.get('/api/todos', async(req, res) => {
    try {
        let todos = await todoStorage.getAllTodos();

        sendSuccess(res, {
            count: todos.length,
            todos: todos
        })
    } catch (error) {
        logger.error(`Error fetching todos: ${error.message}`);
        sendError(res, 'Failed to fetch todos');
    }
})

router.get('/api/todos/:id', async(req, res) => {
    try {
        const todo = await todoStorage.getTodoById(req.params.id);
        if(todo) {
            sendSuccess(res, todo);
        } else {
            sendError(res, 'Todo not found', 404);
        }
    } catch (error) {
        logger.error(`Error fetching todo by id: ${error.message}`);
        sendError(res, 'Failed to fetch todo');
    }
})

router.post('/api/todos', async(req, res) => {
    try {
        const body = await parseBody(req);
        if(!body) {
            return sendError(res, 'Request body is required', 400);
        }

        //create the new todo
        const newTodo = await todoStorage.createTodo({
            title: body.title.trim(),
            description: body.description
        })

        sendCreated(res, newTodo);
    } catch (error) {
        logger.error(`Error creating todo: ${error.message}`);
        sendError(res, 'Failed to create todo');
    }
})


const server = http.createServer(async (req, res) => {
    logger.info(`${req.method} ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if(req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
        return;
    }

    // Handle all the requests
    try {
        await router.handle(req, res);
    } catch (error) {
        logger.error(`Error handling request: ${error.message}`);
        sendError(res, 'Internal Server Error');
    }
});

async function startServer() {
    try {
        await todoStorage.initialize();
        server.listen(PORT, () => {
            console.log('='.repeat(50));
            console.log('Todo API initialized successfully.');
            console.log('='.repeat(50));
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log('='.repeat(50));
        })
    } catch (error) {
        logger.error(`Failed to initialize todo storage: ${error.message}`);
        process.exit(1);
    }
}

startServer();