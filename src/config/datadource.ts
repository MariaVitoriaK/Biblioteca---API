// src/config/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "src/entities/User";
import { Author } from "src/entities/Author";
import { Genre } from "src/entities/Genre";
import { Book } from "src/entities/Book";
import { Reservation } from "src/entities/Reservation";


dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "library",
  synchronize: true, 
  logging: false,
  entities: [User, Author, Genre, Book, Reservation],
});
