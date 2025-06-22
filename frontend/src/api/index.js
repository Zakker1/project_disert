// Отправка изображения на backend
export async function uploadImage(formData) {
  const response = await fetch("http://localhost:3000/api/tasks/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Ошибка при отправке изображения");
  }

  return await response.json(); // ожидается: { taskId: '...' }
}

// Получение статуса задачи
export async function getTaskStatus(taskId) {
  const response = await fetch(
    `http://localhost:3000/api/tasks/status/${taskId}`
  );

  if (!response.ok) {
    throw new Error("Ошибка при получении статуса задачи");
  }

  return await response.json(); // ожидается: { status: 'pending' | 'done' | 'error', ... }
}
