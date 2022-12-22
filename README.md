# automate-personal-finances
This project automates personal finances.

### how to configure it
  | NAME | DESCRIPTION   | DEFAULT |
  | ---- | ------------- | ------- |
  | INPUT_DIRECTORY_PATH | path to the directory containing the files          | /Users/{user}/Downloads
  | FILE_EXTENSION       | extension od the files containing the spreadsheets  | .xlsx

### execute database
```
docker run --name my-postgres -e POSTGRES_PASSWORD=mypassword -d -p 5432:5432 postgres

psql -h hostname -U username -d database_name -W password
```

#### use ORM TypeORM

```
npm install typeorm

```

- example to insert data
```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { createConnection, Connection } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

async function insertData() {
  try {
    const connection: Connection = await createConnection();

    // Create a table
    await connection.synchronize();

    // Insert data
    const user1 = new User();
    user1.name = 'John';
    user1.email = 'john@example.com';

    const user2 = new User();
    user2.name = 'Jane';
    user2.email = 'jane@example.com';

    await connection.getRepository(User).save([user1, user2]);

    console.log('Data inserted successfully');
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}

insertData();

```

- example to query data
```typescript
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { createConnection, Connection } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

@Entity()
class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(type => User, user => user.orders)
  user: User;
}

async function getOrders() {
  try {
    const connection: Connection = await createConnection();

    const orders = await connection.getRepository(Order).createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .getMany();

    console.log(orders);
  } catch (error) {
    console.error(error);
  } finally {
    await connection.close();
  }
}

getOrders();

```


```
npm install pg
```

```typescript
import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: 'mypassword',
  host: 'localhost',
  port: 5432,
  database: 'mydatabase'
});

async function insertData() {
  try {
    const client: PoolClient = await pool.connect();

    // Create a table
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `);

    // Insert data
    await client.query(`
      INSERT INTO users (name, email)
      VALUES ('John', 'john@example.com'), ('Jane', 'jane@example.com')
    `);

    console.log('Data inserted successfully');
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}

insertData();

```
