import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author";
import { Genre } from "./Genre";


@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @ManyToOne(() => Author, author => author.books)
  author: Author;

  @ManyToOne(() => Genre, genre => genre.books)
  genre: Genre;

  @Column({ default: true })
  available: boolean;
}
