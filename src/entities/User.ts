// src/Entities/User.ts
import { Entity, PrimaryColumn, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Reservation } from "./Reservation";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];
}
