import * as express from 'express'
import * as tasks from '../controllers/task.controller.js'

const taskRoutes = express.Router();

// Create a new Tutorial
taskRoutes.post("/", tasks.createTask);

// Retrieve all tasks
taskRoutes.get("/", tasks.findAllTasks);

// Retrieve all published tasks
taskRoutes.get("/finished", tasks.findAllFinishedTasks);

// Retrieve all published tasks
taskRoutes.get("/active", tasks.findAllActiveTasks);

// Retrieve a single Tutorial with id
taskRoutes.get("/:id", tasks.findOneTask);

// Update a Tutorial with id
taskRoutes.put("/:id", tasks.updateTask);

// Delete a Tutorial with id
taskRoutes.delete("/:id", tasks.deleteTask);

// Delete all tasks
taskRoutes.delete("/", tasks.deleteAllTasks);

export default taskRoutes;