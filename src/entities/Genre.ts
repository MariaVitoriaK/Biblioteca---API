// src/Entities/Genre.ts
import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import {Book} from "./Book"
@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id!: number;


  @Column()
  name: string;

  @OneToMany(() => Book, book => book.genre)
  books: Book[];
}
