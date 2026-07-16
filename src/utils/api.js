const API_URl = import.meta.env.VITE_API_URL;

export async function getTasks(token) {
  const response = await fetch(`${API_URl}/api/tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(result.message);
    error.statusCode = result.status;

    throw error;
  }

  return result;
}

export async function addTasks(token, task) {
  const response = await fetch(`${API_URl}/api/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function deleteTasks(token, id) {
  const response = await fetch(`${API_URl}/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function updateTask(token, id, task) {
  const response = await fetch(`${API_URl}/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
