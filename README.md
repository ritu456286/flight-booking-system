### Setup the project

- Clone this github repo and open it in your favourite text editor.
- In the root directory create a `.env` file and add the following env variables

```
    PORT=<port number of your choice to run the server on>
```
ex:
```
    PORT=3000
```
- Inside the folder path, execute the following to download the dependencies:
```
  npm install
``` 

- Inside the `src/config` folder, create a file named `config.json`, and paste the following code:
```
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- go inside the `src` folder, and execute the following command:
```
  npx sequelize init
```
- By executing the above command, you wil get migrations and seeders folders along with the given default config.json file.
- If you're setting up your development environment, then write the username of your db, password of your db, and in dialect mention whatever db you are using. For ex: mysql, postgres, mariadb, etc.
- If you're setting up test or prod environment, make sure you also replace the host with the hosted db url. 
- To run the server execute:
```
  npm run dev
```