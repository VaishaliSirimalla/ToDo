const API = "http://localhost:3000/api/todos";

// Get all todos
export const getTodos = async () => {
  const res = await fetch(API);
  return res.json();
};

// Create a new todo
export const createTodo = async (todo: { title: string; status?: string; priority?: string }) => {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
};

// Update a todo
export const updateTodo = async (id: string, data: any) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
