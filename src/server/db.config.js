import pgPromise from "pg-promise";

const pgp = pgPromise({
  capSQL: true,
});

const connectionConfig = {
  host: process.env.PGHOST,
  Database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
};

const db = pgp(connectionConfig);

db.connect()
  .then((obj) => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Database Connection Failed", error);
  });

export {db,pgp};
