# Phoenix - Todos

Phoenix is a simple todo app, based on Vue.js

## The stack

Frontend:
- Vue.js 3 with Vite 
- TypeScript
- Axios
- Vue Test Utils with Jest
- Tailwind

Backend
- Node.js
- Express.js

## Intallations

1. Clone
2. From the root directory run `npm install` from the terminal
3. Run `npm run install:all` to install both the front and the backend or install each one separately
4. Create an `.env` file in `/client` as described in the example file `/client/.env.example`. For this demo purpose you can just rename `.env.example` to `.env`
5. From the root directory run `npm run start` to start both the front and the backend concurrently
6. Visit the url logged to the terminal

Note that Vite supports Node.js versions 14.18+, 16+

## Unit tests

Run `npm run test:unit` from `/client`

## What else

When firing up the server for the first time, the server will seed demo data onto a json-based database table. This file will then serve as the table for the Tasks resource.
