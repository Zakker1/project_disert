import { useEffect, useState } from 'react';
import { getTaskStatus } from '../api';

export default function StatusTracker({ taskId, onResult }) {
  const [status, setStatus] = useState('ожидание');

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await getTaskStatus(taskId);
        setStatus(data.status);
        if (data.status === 'done') {
          onResult(data.result);
          clearInterval(interval);
        }
        if (data.status === 'error') {
          clearInterval(interval);
        }
      } catch {
        clearInterval(interval);
        setStatus('Ошибка соединения');
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [taskId]);
  return <p>Текущий статус: <strong>{status}</strong></p>;
}