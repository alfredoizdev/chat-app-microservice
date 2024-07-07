# Microservice Application

This is a microservice application built with NestJS and Node.js. It uses Kubernetes, Socket.IO, and RabbitMQ for real-time communication and event handling. The application's data is stored in MongoDB.

## Technologies Used

- NestJS: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Kubernetes: An open-source system for automating deployment, scaling, and management of containerized applications.
- Socket.IO: A library that enables real-time, bidirectional and event-based communication between the browser and the server.
- RabbitMQ: An open-source message-broker software that originally implemented the Advanced Message Queuing Protocol (AMQP).
- MongoDB: A source-available cross-platform document-oriented database program.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Docker
- Kubernetes
- A MongoDB instance

### Installation

1. Clone the repository

### Local Development

This project uses Skaffold and Kubernetes for local development.

1. Make sure you have Skaffold and Kubernetes installed on your machine.
2. Start the local development server with `skaffold dev`. This command will build your Docker images, deploy your application to a local Kubernetes cluster and start the application.
3. seed users list on mongodb by using http://server-app.com/api/seed/users

### Aditional

Your need configure /etc/hosts
to use server-app.com and chat-app.com

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/alfredoizjr) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
