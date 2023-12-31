docker compose run --rm front npx prisma init
docker compose run --rm front yarn add @prisma/client
docker compose run --rm front npx prisma db pull
docker compose run --rm front yarn add @tanstack/react-query@4.0.10 @tanstack/react-query-devtools@4.0.10
docker compose run --rm front yarn add @mantine/core@5.0.2 @mantine/hooks@5.0.2 @mantine/form@5.0.2 @mantine/next@5.0.2 @emotion/server@11.10.0 @emotion/react@11.10.0
docker compose run --rm front yarn add @heroicons/react@1.0.6 @tabler/icons@1.78.1 yup@0.32.11 axios@0.27.2 zustand@4.0.0

