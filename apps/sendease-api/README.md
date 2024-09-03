# SendEase API

## Beskrivning

SendEase API är backend-delen av SendEase-plattformen, byggd med NestJS och PostgreSQL.

## Förutsättningar

- Node.js (version 14 eller senare)
- npm (kommer med Node.js)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

### 1. Klona repositoryt

```bash
git clone https://github.com/your-username/sendease-api.git
cd sendease-api
```

### 2. Installera beroenden

```bash
npm install
```

### 3. Konfigurera miljövariabler

Skapa en .env-fil i projektets rot och lägg till följande variabler:

`DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=sendease_user
DB_PASSWORD=your_secure_password
DB_NAME=sendease
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password_if_needed`

3. Starta Docker-tjänsterna:

   ```bash
   docker-compose up -d
   ```

4. Installera projektets beroenden:

   ```bash
   npm install
   ```

5. Kör migrationer (om det behövs):

   ```bash
   npm run migration:run
   ```

6. Starta applikationen:
   ```bash
   nx run api:serve:development
   ```

### Stoppa utvecklingsmiljön

För att stoppa Docker-tjänsterna:

```bash
docker-compose down
```

För att stoppa och ta bort volymerna (raderar all data):

```bash
docker-compose down -v
```

### Docker Compose-konfiguration

Projektet använder följande Docker Compose-konfiguration:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14
    ports:
      - '5432:5432'
    environment:
      POSTGRES_DB: sendease
      POSTGRES_USER: sendease_user
      POSTGRES_PASSWORD: your_secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:6
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

Denna konfiguration sätter upp både PostgreSQL och Redis med persistenta volymer för datalagring.

### Felsökning

Om du stöter på problem med Docker-tjänsterna, prova följande:

1. Kontrollera att tjänsterna körs:

   ```bash
   docker-compose ps
   ```

2. Visa loggar för en specifik tjänst:

   ```bash
   docker-compose logs postgres
   docker-compose logs redis
   ```

3. Starta om tjänsterna:
   ```bash
   docker-compose restart
   ```

Om problemen kvarstår, se till att portarna 5432 och 6379 inte används av andra processer på din maskin.

## Användning

### Starta applikationen i utvecklingsläge

```bash
npx nx run api:serve
```

### Kör tester

```bash
npx nx run api:test
```

### Bygga för produktion

```bash
npx nx run api:build
```

## Starta applikationen i produktionsläge

```bash
npm run start:prod
```

## Databasmigrationer

### Generera en ny migration

```bash
npm run typeorm migration:generate -- -n MigrationName
```

```bash
npm run typeorm migration:generate -- -n MigrationName
```

### Kör migrationer

```bash
npm run typeorm migration:run
```

### Återställ senaste migration

```bash
npm run typeorm migration:revert
```

### API-dokumentation

API-dokumentation finns tillgänglig på /api när applikationen körs.

### Viktiga filer

- `src/app.module.ts` - Huvudkonfiguration för NestJS-applikationen

- `src/app.module.ts` - Huvudkonfiguration för NestJS-applikationen
- `src/users/users.module.ts` - Konfiguration för användarhantering
- `src/main.ts` - Ingångspunkt för applikationen

## Utvecklingsmiljö vs Produktionsmiljö

- I utvecklingsmiljö används `synchronize: true` för automatisk databassynkronisering
- I produktionsmiljö bör `synchronize: false` användas och migrationer köras manuellt

## Säkerhet

- Använd alltid starka, unika lösenord för databasanvändare och JWT-hemligheter
- Lagra aldrig känslig information direkt i koden
- Använd miljövariabler för all känslig konfiguration

## Felsökning

Om du stöter på problem med databasanslutningen:

1. Kontrollera att PostgreSQL-tjänsten körs: `brew services list | grep postgresql`
2. Verifiera databasuppgifterna i `.env`-filen
3. Testa databasanslutningen manuellt: `psql -d sendease -U sendease_user`
