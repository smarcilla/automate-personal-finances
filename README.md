# automate-personal-finances
This project automates personal finances.

### how to configure it
  | NAME | DESCRIPTION   | DEFAULT |
  | ---- | ------------- | ------- |
  | INPUT_DIRECTORY_PATH | path to the directory containing the files          | /Users/{user}/Downloads |
  | FILE_EXTENSION       | extension od the files containing the spreadsheets  | .xlsx |
  | USERNAME_DB | user to connect to database ||
  | PASSWORD_DB | password to connect to database ||
  | NAME_DB | name of database ||
  | PORT_DB | port when the db listens | 5432 |
  | HOST_DB | database host | localhost |
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
