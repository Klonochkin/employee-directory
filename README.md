# Справочник сотрудников

## Запуск в режиме разработки

```sh
docker compose up --build
pnpm dev
```

## Запуск

```sh
pnpm build
```

## Postgres

Для переключения между локальной и vercel версиями базами данных нужно изменить POSTGRES_URL в .env
