import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("chaitu.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE usercontacts(id PRIMARY KEY NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, email TEXT NOT NULL, phone REAL NOT NULL, imageUri TEXT NOT NULL);"
      ),
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        };
    });
  });
  return promise;
};
