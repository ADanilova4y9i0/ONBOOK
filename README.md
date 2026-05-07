Запускаем backend, 
docker compose up -d, 
bun install, 
bun run migration:generate, 
bun run migration:up, 
bun run build, 
bun run start.

запускаем app, 
bun install, 
bun run dev --host, 
