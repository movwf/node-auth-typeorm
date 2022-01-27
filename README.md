# Node Auth Server

Built with Express.js / TypeORM / MySQL

> This project built for simple demonstration of session management and JWT authorization.

> [Live Preview(Client) ->](https://react-msn-messenger.netlify.app/)

> [Live Preview(Server) ->](https://node-auth-server-2.herokuapp.com/auth/login)

- Routes
  - Auth
    - login <POST>
    - logout <GET>
    - register <POST>
    - check <GET> Session Check
    - browser <GET> Browser Auth
  - Jwt
    - login <POST>
    - logout <GET>
    - register <POST>
    - check <GET> JWT Check
    - browser <GET> Browser Auth

## How to install

To start the server you need;

```
PORT=<9000>
DB_URL=<mongo_db_url>
MYSQL_DB_URL=<mysql_db_url>
JWT_TOKEN_SECRET=<you can use crypto>
JWT_REFRESH_SECRET=<you can use crypto>
```

After successful installation:

```
npm install
npm start
```

or with `pnpm`

```
pnpm install
pnpm start

```

> [movwf](https://github.com/movwf) - 2021
