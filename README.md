# Connect4

[connect4-kappa.vercel.app](connect4-kappa.vercel.app)

## Features

- Play Connect4 locally
- Load your game from the cloud at any time, and finish it whenever you can!
- Responsive view for mobile gaming
- Improved with accesibility features!

## Technologies used

- [NextJS](https://nextjs.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [date-fns](https://date-fns.org/)
- [axios](https://axios-http.com/docs/intro/)
- [node postgres](https://www.npmjs.com/package/pg)
- [Typescript](https://www.typescriptlang.org/)
- Deployment using [Vercel](https://vercel.com/)
- Remote DB using [ElephantSQL](https://www.elephantsql.com/)

## Running locally in development mode

To get started, just clone the repository and run `npm install && npm run dev`:

    git clone https://github.com/toni783/connect4.git
    npm install
    npm run dev

Note: This project needs to be connected to a database to properly work as expected, please check the _Database Setup_ for configuring the project properly on a local environment

## Database Setup

The project is using [Postgres](https://www.postgresql.org/about/) as the relational database on the backend side. You can run the project locally using the following [scripts](https://mega.nz/file/94l2zRLK#4A5cHGuWkLgDaxIOexSi2qupYVyYoOBQYqvHpz4jl6c) in your local Postgres server

If you don't have Postgres you can read more about installation and setup on the following links:

- [Postgres Download](https://www.postgresql.org/download/)
- [Postgres Installation](https://www.postgresql.org/docs/current/installation.html/)

# API Contracts

API contracts used on the app -> [link](https://www.postman.com/toni783/workspace/connect4/collection/1756029-2e1331d9-97b5-4730-8b94-6bdedbd7f277?action=share&creator=1756029)
