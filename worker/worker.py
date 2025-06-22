import os
import redis

redis_host = os.getenv("REDIS_HOST", "redis-15257.c276.us-east-1-2.ec2.redns.redis-cloud.com")
redis_port = int(os.getenv("REDIS_PORT", 15257))
redis_password = os.getenv("REDIS_PASSWORD", "ВАШ_ПАРОЛЬ_ОТ_CLOUD_REDIS")

r = redis.Redis(
    host=redis_host,
    port=redis_port,
    password=redis_password,
    ssl=True
)