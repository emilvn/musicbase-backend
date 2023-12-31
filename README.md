# musicbase-backend

## Deployed
Frontend: [musicbase-frontend](https://emilvn.github.io/musicbase-frontend)  
Backend: [musicbase-backend-azure](https://musicbase-backend.azurewebsites.net)

## Local
### Installation
    git clone https://www.github.com/emilvn/musicbase-backend.git
    cd musicbase-backend/
    npm install

Create an .env file at the root of project, and define these values:  
#### Use your own local database

    MYSQL_USER=root
    MYSQL_PASSWORD=database-password
    MYSQL_DATABASE=database-name
    MYSQL_PORT=3306
    MYSQL_HOST=localhost
replace "database-password" with the password to your mysql server.  
replace "database-name" with the name of your database.
#### Use the deployed database
    MYSQL_USER=VEMC
    MYSQL_PASSWORD=********
    MYSQL_DATABASE=musicbase_db
    MYSQL_PORT=3306
    MYSQL_HOST=musicbase-database.mysql.database.azure.com

## Start server
To start the server simply run

    npm start
if you want to run the server in watch mode;   
make sure you have nodemon installed, and run

    npm run watch
instead of npm start.

if you get a log in the CLI saying "Server running on http://localhost:3000", you are good to go

## Client
See repository [musicbase-frontend](https://github.com/emilvn/musicbase-frontend)
Deployed at: https://emilvn.github.io/musicbase-frontend