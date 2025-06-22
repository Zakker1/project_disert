import { v4 as uuidv4 } from "uuid";
import redisClient from "./redisClient.js"; // экспорт по default

// Помещает задачу в очередь
export async function enqueueTask(imagePath) {
  const taskId = uuidv4();

  // Устанавливаем статус задачи
  await redisClient.hSet(`task:${taskId}`, { status: "pending" });

  // Добавляем задачу в очередь
  await redisClient.rPush("tasks", JSON.stringify({ taskId, imagePath }));

  return { taskId };
}

// Получает текущий статус задачи по ID
export async function getTaskStatus(taskId) {
  return await redisClient.hGetAll(`task:${taskId}`);
}
