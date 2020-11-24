import db from '../models/index.js'

const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task
export const createTask = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Task
    const task = {
        name: req.body.name,
        date: req.body.date,
        finished: 0
    };

    // Save Task in the database
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
};

// Retrieve all Tasks from the database.
export const findAllTasks = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? {name: {[Op.like]: `%${name}%`}} : null;
    var condition = null;

    Task.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Tasks."
            });
        });
};

// Find a single Task with an id
export const findOneTask = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Task with id=" + id
            });
        });
};

// Update a Task by the id in the request
export const updateTask = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Task was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Task with id=" + id
            });
        });
};

// Delete a Task with the specified id in the request
export const deleteTask = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Task was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete a Task with the specified id in the request
export const processTask = (req, res) => {
    const id = req.params.id;

    Task.update({finished: req.body.finished}, {
        where: {id: id}
    })
        .then(num => {
            console.log(num);
            if (num[0] === 1) {
                res.send({
                    message: "Task status was changed successfully!"
                });
            } else {
                res.send({
                    message: `Cannot finish Task with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Task with id=" + id
            });
        });
};

// Delete all Tasks from the database.
export const deleteAllTasks = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} Tasks were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        });
};

// Find all active tasks
export const findAllActiveTasks = (req, res) => {
    Task.findAll({where: {finished: 0}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        });
};
// Find all finished tasks
export const findAllFinishedTasks = (req, res) => {
    Task.findAll({where: {finished: 1}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        })
};