import axios from 'axios';

const tasksUrl = 'http://localhost:8080/api/tasks';


const axiosTasksInstance = axios.create({
  baseURL: tasksUrl,
  headers: {'Content-Type': 'application/json'}
});


// Where you would set stuff like your 'Authorization' header, etc ...
axiosTasksInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
export default axiosTasksInstance;