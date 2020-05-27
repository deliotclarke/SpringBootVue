import axios from 'axios';

const SERVER_URL = 'http://localhost:9000';

const instance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

export default {
  // create
  createNew: (text, completed) =>
    instance.post('todos', { title: text, completed: completed }),
  // read
  getAll: () =>
    instance.get('todos', {
      transformResponse: [
        function(data) {
          return data ? JSON.parse(data)._embedded.todos : data;
        },
      ],
    }),
  // update
  updateForId: (id, text, completed) =>
    instance.put('todos/' + id, { title: text, completed: completed }),
  // delete and/or destroy
  removeForId: (id) => instance.delete('todos/' + id),
};
