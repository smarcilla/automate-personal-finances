# automate-personal-finances
This project automates personal finances.

### how to configure it
  | NAME | DESCRIPTION   | DEFAULT |
  | ---- | ------------- | ------- |
  | INPUT_DIRECTORY_PATH | path to the directory containing the files          | /Users/{user}/Downloads
  | FILE_EXTENSION       | extension od the files containing the spreadsheets  | .xlsx

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
