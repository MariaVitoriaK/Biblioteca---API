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
  type: "oracle",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 1521,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  sid: process.env.DB_SID, // ou serviceName, se preferir
  synchronize: true, // só para desenvolvimento
  logging: false,
  entities: [User, Author, Genre, Book, Reservation],
});
