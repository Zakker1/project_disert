import { useEffect, useState } from "react";
import { getTaskStatus } from "../api";

export default function StatusTracker({ taskId, onResult }) {
  const [status, setStatus] = useState("ожидание");

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getTaskStatus(taskId);

        setStatus(data.status);

        if (data.status === "done") {
          onResult(data.result);
          clearInterval(interval);
        }

        if (data.status === "error") {
          setStatus("ошибка обработки");
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Ошибка при получении статуса:", err);
        setStatus("ошибка соединения");
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId, onResult]);

  return (
    <p>
      🕓 Текущий статус: <strong>{status}</strong>
    </p>
  );
}
