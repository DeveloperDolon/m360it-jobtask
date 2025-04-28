# Client & Project Management System
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql)


A full-stack application for managing clients, projects, interactions, and reminders with dashboard analytics.

## 🐳 Docker Setup

### Prerequisites
- Docker Engine (v20.10+)
- Docker Compose (v2.0+)
- Git

## 🚀 Features

- **Client Management**: Create, view, update, and delete client records
- **Project Tracking**: Manage projects with status updates and deadlines
- **Interaction Logging**: Record emails, meetings, and calls with clients
- **Reminder System**: Set and track important deadlines
- **Dashboard Analytics**: Visual overview of key metrics
- **User Authentication**: Secure login with JWT

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| TypeScript | Type safety |
| Redux Toolkit | State management |
| React Router | Navigation |
| Tailwind CSS | Styling |
| Redux RTK query | HTTP client |
| React Hook Form | Form handling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express | Web framework |
| TypeScript | Type safety |
| Prisma | ORM |
| PostgreSQL | Database |
| JWT | Authentication |
| Zod | Validation |

### 1. Clone Both Repositories
```bash
# Clone frontend
git clone https://github.com/DeveloperDolon/technext-client.git
cd technext-client
```

```bash
# Clone backend
git clone https://github.com/DeveloperDolon/technext-server.git 
cd technext-server

```

### 2. Run project docker container

```bash
# Then run this command for all repositories to build and run project in docker
make build
or
docker compose build

make start
or
docker compose up
```


### 3. Migrate data base 
  After running the container then go to inside of container with this command
  ```make bash  -or-  docker compose exec -it tn_server sh ```

  Then run this prisma command to migrate database.
    ```npx prisma migrate dev --name initial_migration```

### 4. Api documentation 

```bash
# User api 
1. Register user - api/v1/user/create [POST]
2. Login user - api/v1/user/login [POST]
3. Me - api/v1/user/me [GET]
```

```bash
# Client api 
1. Client create - api/v1/client/create [POST]
2. Client update - api/v1/client/update/:id [PUT]
3. Client Delete - api/v1/client/delete/:id [DELETE]
4. Client show - api/v1/client/show/:id [GET]
5. Client list - api/v1/client/list [GET]
```

```bash
# Project api 
1. Project create - api/v1/project/create [POST]
2. Project update - api/v1/project/update/:id [PUT]
3. Project Delete - api/v1/project/delete/:id [DELETE]
4. Project show - api/v1/project/show/:id [GET]
5. Project list - api/v1/project/list [GET]
```

```bash
# Interaction api 
1. Interaction create - api/v1/interaction/create [POST]
2. Interaction update - api/v1/interaction/update/:id [PUT]
3. Interaction Delete - api/v1/interaction/delete/:id [DELETE]
4. Interaction show - api/v1/interaction/show/:id [GET]
5. Interaction list - api/v1/interaction/list [GET]
```

```bash
# Reminder api 
1. Reminder create - api/v1/reminder/create [POST]
2. Reminder update - api/v1/reminder/update/:id [PUT]
3. Reminder Delete - api/v1/reminder/delete/:id [DELETE]
4. Reminder show - api/v1/reminder/show/:id [GET]
5. Reminder list - api/v1/reminder/list [GET]
5. Upcoming reminder - api/v1/reminder/upcoming [GET]
```

```bash
# Dashboard api 
1. Dashboard create - api/v1/dashboard/overview [GET]
```

### 5. ERD Diagram
![ERD Diagram](./src/assets/Technext_job_task.png)# m360it-jobtask
