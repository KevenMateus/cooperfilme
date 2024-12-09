# Cooperfilme - Projeto de Gerenciamento de Roteiros de Filmes

## Descrição
Este projeto é voltado para o gerenciamento de roteiros de filmes, utilizando uma aplicação backend em Java com Spring Boot e Hibernate, um frontend em React com Vite, e PostgreSQL como banco de dados.

- **Backend**: Java 23 com Spring Boot e Hibernate.
- **Frontend**: React com Vite e Node 23.3.0.
- **Banco de Dados**: PostgreSQL.

### Estrutura do Projeto

```plaintext
cooperfilme/
├── cooperfilme-api/        # Backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── cooperfilme-frontend/   # Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docker-compose.yml      # Configuração de orquestração
└── README.md               # Documentação do projeto
```

## Configuração do Ambiente

### Pré-requisitos
- Docker
- Docker Compose

### Passo a Passo

#### 1. Clonar o Repositório
Clone o repositório para sua máquina local:
```sh
git clone https://github.com/KevenMateus/cooperfilme.git
cd cooperfilme
```

#### 2. Configurar Variáveis de Ambiente

##### Backend
Crie o arquivo `.env` no diretório `cooperfilme-api` e adicione as variáveis de ambiente:
```env
ALLOWED_ORIGIN=http://localhost:5173
SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/cooperfilme
SPRING_DATASOURCE_USERNAME=cooperfilme_user
SPRING_DATASOURCE_PASSWORD=1234
```

##### Frontend
Crie o arquivo `.env` no diretório `cooperfilme-frontend` e adicione a variável de ambiente:
```env
VITE_API_URL=http://localhost:8080
```

##### PostgreSQL
Crie o arquivo `.env` no diretório raiz e adicione as variáveis de ambiente:
```env
POSTGRES_DB=cooperfilme
POSTGRES_USER=cooperfilme_user
POSTGRES_PASSWORD=1234
```

#### 3. Configurar Docker Compose
Certifique-se de que o arquivo `docker-compose.yml` está conforme abaixo:

```yaml
version: "3.8"

services:
  frontend:
    image: frontend-cooperfilme
    build:
      context: ./cooperfilme-frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    env_file:
      - ./cooperfilme-frontend/.env
    depends_on:
      - backend

  backend:
    image: backend-cooperfilme
    build:
      context: ./cooperfilme-api
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    env_file:
      - ./cooperfilme-api/.env
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/${POSTGRES_DB}
      - SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
      - SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}
      - ALLOWED_ORIGIN=${ALLOWED_ORIGIN}
    depends_on:
      - db

  db:
    image: postgres:17
    ports:
      - "5432:5432"
    env_file:
      - ./.env
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U ${POSTGRES_USER}" ]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

#### 4. Construir e Iniciar os Contêineres
Execute o comando abaixo para construir e iniciar os contêineres:
```sh
docker-compose up --build
```

#### 5. Acessar a Aplicação
Após a conclusão, acesse `http://localhost:3000` no seu navegador para ver o frontend. O backend estará disponível em `http://localhost:8080`.
