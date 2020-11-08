import taskRoutes from './tasks.js'
import express from 'express';

const route = express();
route.use('/api/tasks', taskRoutes);

export default route;