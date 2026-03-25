export async function getTodos(childId) {
  const response = await fetch(
    `http://localhost:8080/api/todos?childId=${childId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!response.ok) {
    throw new Error("failed to fetch todos");
  }

  return await response.json();
}

export async function completeTodo(todoId) {

  const response = await fetch(
    `http://localhost:8080/api/todos/${todoId}/complete`,
    {
      method: "PUT",
      credentials: "include"
    }
  )

  if (!response.ok) {
    throw new Error("failed to complete todo")
  }

}

export async function deleteTodo(todoId) {
  const response = await fetch(
    `http://localhost:8080/api/todos/${todoId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("failed to delete todo");
  }
}

export async function createTodo(todo) {
  const response = await fetch("http://localhost:8080/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("failed to create todo");
  }
}

export async function updateTodo(id, todo) {
  const response = await fetch(
    `http://localhost:8080/api/todos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(todo),
    }
  );

  if (!response.ok) {
    throw new Error("failed to update todo");
  }
}