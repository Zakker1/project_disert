import { v4 as uuidv4 } from 'uuid';
import redis from './redisClient.js';

export async function enqueueTask(imagePath) {
  const taskId = uuidv4();
  await redis.hSet(`task:${taskId}`, { status: 'pending' });
  await redis.rPush('tasks', JSON.stringify({ taskId, imagePath }));
  return { taskId };
}

export async function getTaskStatus(taskId) {
  return await redis.hGetAll(`task:${taskId}`);
}