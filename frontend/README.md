## Prerequisites

### For Docker
- [Docker](https://www.docker.com/products/docker-desktop) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.

### For pnpm
- [pnpm](https://pnpm.io/installation) installed on your machine.

## Setup

### 1. Create a `.env` File

Create a `.env` file in the root of your project with the following content:

```env
NEXT_PUBLIC_BACKEND=http://your-backend-url
```

Replace `http://your-backend-url` with the actual URL of your backend service.

## Running with Docker

### 2. Build the Docker Image

Run the following command to build the Docker image:

```bash
docker-compose build
```

### 3. Run the Docker Container

Run the following command to start the Docker container:

```bash
docker-compose up
```

The application will be accessible at `http://localhost:3000`.

## Running with pnpm

### 1. Install Dependenci

Run the following command to install the dependencies:

```bash
pnpm install
```

### 2. Run the Development Server

Run the following command to start the development server:

```bash
pnpm build
pnpm start
```

The application will be accessible at `http://localhost:3000`.

## Docker Configuration

### Dockerfile

The `Dockerfile` is used to build the Docker image for the Next.js application. It consists of three stages:

1. **Install dependencies**: Installs the necessary dependencies.
2. **Build the application**: Builds the Next.js application.
3. **Run the application**: Copies the necessary files and runs the application in production mode.

### docker-compose.yml

The `docker-compose.yml` file defines the services and configurations needed to run the Docker container. It includes environment variable configuration for connecting to the backend service.

### .env

The `.env` file stores environment variables used by the application. The `NEXT_PUBLIC_BACKEND` variable is used to specify the backend URL.