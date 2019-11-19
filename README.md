# node-web

In an attempt to simplify the process of starting up new node.js based projects, there exists two template projects to use as a foundation.

The two projects are [node-web](https://github.com/KTH/node-web), a web server with express and react, and [node-api](https://github.com/KTH/node-api), a RESTful api. Both of them use OpenID Connect and/or CAS as a mechanism for authorisation and authentication.

**The projects can be found here:**
[https://github.com/KTH/node-web](https://github.com/KTH/node-web)
[https://github.com/KTH/node-api](https://github.com/KTH/node-api)

It's important that we try to make changes that affect the template projects in the template projects themselves.

## Where do you keep you secrets?

Secrets during local development are ALWAYS stored in a `.env`-file in the root of your project. This file should be in .gitignore. It needs to contain at least ldap connection URI and password in order for authentication to work properly:

```
LDAP_URI=ldaps://[usertname]@ldap.ref.ug.kth.se
LDAP_PASSWORD=[password]
```

During local development the defaults in serverSettings.js should work fine. If you need to make specific changes for your machine, add these to the `.env`-file. If you want changes that should be used by anyone developing your project, change the default variables in the settings-files.

## How do I use node-web template project for a project of my own?

1. Create a new git repository on github.com/KTH (or other somewhere else).

2. Clone the node-web repository by using:

```bash
git clone git@github.com:KTH/node-web.git NEW_REPOSITORY_NAME
```

3. Navigate to the cloned project directory

4. Change remote repo

```bash
git remote add origin https://github.com/KTH/<NEW_REPOSITORY_NAME>.git
```

## If your application is going to be proxied

If your application is going to be proxied on www.kth.se/api/your-api-path make sure you set the following paths and properties.

1. Make sure you add the proxy prefix path in your paths in /server/init/routing/paths.js e.g

```json
monitor : {
  uri : '/api/node/_monitor',
  method : 'GET'
}
```

2. Set you basePath property in /swagger.json e.g.

```javascript
"basePath": "/api/node/v1"
```

## Development

Before you start coding it is important that you have both listed extensions installed in VS Code.

- Prettier
- Eslint

### Starting the server

Always start by installing dependencies:

```bash
$ npm install
```

Then you need to start the server:

```bash
$ npm run start-dev
```

This will

1. run `parcel build` once to build SASS-files, and prepare browser JavaScript files
2. start `nodemon` which triggers restart when server-side files have been updated
3. run `parcel watch` which triggers a rebuild of browser assets when files have been updated

### Debugging

#### Debugging in VS Code

If you start Node.js from VS Code you can set breakpoints in your editor. The launch config will look like this:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "program": "${workspaceRoot}/app.js",
  "cwd": "${workspaceRoot}",
  "env": {
    "NODE_ENV": "development"
  }
}
```

Setting NODE_ENV is currently required.

### Stack

- Parcel (Alternative to webpack)
- Babel 7
- Eslint
- Prettier
- Husky (Pre-commit)
- Sass
- React
- Mobx (State management)
