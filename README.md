# automate-personal-finances
This project automates personal finances.

### release feature/4
- adds unique id to avoid duplication of transactions (done)
- remove logs (done)
- fix error with date convertion from string to date (done)


## execute function
- To start the script
```
docker compose up 
```

- to stop it
```
docker compose down
```


## roadmap
- persist data between up & down db container ()
- create a view that represents anual report of my finances.
- introduce my project within docker compose image (feature/3 done)


- https://docs.nestjs.com/techniques/database

### how to configure it
  | NAME | DESCRIPTION   | DEFAULT |
  | ---- | ------------- | ------- |
  | INPUT_DIRECTORY_PATH | path to the directory containing the files          | /downloads |
  | FILE_EXTENSION       | extension od the files containing the spreadsheets  | .xlsx |
  | USERNAME_DB | user to connect to database | postgres |
  | PASSWORD_DB | password to connect to database ||
  | NAME_DB | name of database |postgres |
  | PORT_DB | port when the db listens | 5432 |
  | HOST_DB | database host | db |
  | DROP_DB | drops database when execute script | false |


### execute database
```
- Run postgres instance
docker run --name finance-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5433 postgres

- Start progress instance
docker start finance-postgres

- Stop postgres instance
docker stop finance-postgres

psql -h hostname -U username -d database_name -W password
```

#### use ORM TypeORM

```
npm install typeorm

```
