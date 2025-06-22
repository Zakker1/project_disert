import redis
import json
import time
import os

# Подключение к Redis Cloud
r = redis.Redis(
    host='redis-10710.c340.ap-northeast-2-1.ec2.redns.redis-cloud.com',
    port=10710,
    password='M1jDnMOAOgNkOv8sw0Ca7vZtRMCL774n',
    decode_responses=True
)

print("👷 Python worker started. Ожидание задач...")

while True:
    task_json = r.blpop('tasks', timeout=5)
    if task_json:
        try:
            task = json.loads(task_json[1])
            task_id = task['taskId']
            image_path = task['imagePath']

            print(f"⚙️ Обработка задачи {task_id}: {image_path}")

            # Тут может быть Pillow, OpenCV и т.п.
            time.sleep(3)  # имитация обработки

            r.hset(f"task:{task_id}", mapping={
                "status": "done",
                "result": f"Изображение {os.path.basename(image_path)} обработано"
            })

            print(f"✅ Задача {task_id} завершена")
        except Exception as e:
            print(f"❌ Ошибка при обработке: {e}")
            r.hset(f"task:{task_id}", mapping={
                "status": "error",
                "result": "Ошибка при обработке"
            })
