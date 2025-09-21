// src/Entities/Author.ts
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import {Book} from "./Book";

@Entity()
export class Author {
  @PrimaryColumn()
  id: string = uuidv4();

  @Column()
  name: string;

  @OneToMany(() => Book, book => book.author)
  books: Book[];
}
