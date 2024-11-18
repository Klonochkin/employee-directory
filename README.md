# Справочник сотрудников

## Запуск в режиме разработки

```sh
docker compose up --build
pnpm dev
```

Если это ваш первый запуск и таблица не создана, то выполните команду

```sh
pnpm drizzle-kit migrate
```

## Запуск

```sh
pnpm build
```

## Postgres

Для переключения между локальной и vercel версиями базами данных нужно изменить POSTGRES_URL в .env
