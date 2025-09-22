import request from "supertest";
import { AppDataSource } from "../src/config/datasource";
import app from "../src/app";
import { Book } from "../src/entities/Book";
import { User } from "../src/entities/User";
import { Reservation } from "../src/entities/Reservation";
import jwt from "jsonwebtoken";
import { Author } from "../src/entities/Author";
import { Genre } from "../src/entities/Genre";


let token: string;

beforeAll(async () => {
  await AppDataSource.initialize();
  // Cria usuário e token para testes
  const userRepo = AppDataSource.getRepository(User);
  const user = userRepo.create({
    name: "Tester",
    email: "tester@test.com",
    password: "123456",
  });
  
  const authorRepo = AppDataSource.getRepository(Author);
  const genreRepo = AppDataSource.getRepository(Genre);

  const author = authorRepo.create({ name: "Autor Teste" });
  await authorRepo.save(author);

  const genre = genreRepo.create({ name: "Gênero Teste" });
  await genreRepo.save(genre);
  await userRepo.save(user);

  token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || "default_secret",
    { expiresIn: "1h" }
  );
});

beforeEach(async () => {
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");

  await AppDataSource.getRepository(Reservation).clear();
  await AppDataSource.getRepository(Book).clear();

  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Book API", () => {
  it("deve criar um livro", async () => {
    const res = await request(app)
      .post("/api/v1/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Livro Teste",
        authorId: 1,
        genreId: 1,
      });

    expect(res.status).toBe(201);
  });

  it("deve listar todos os livros", async () => {
    await request(app)
      .post("/api/v1/books")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Livro Teste", authorId: 1, genreId: 1 });

    const res = await request(app).get("/api/v1/books");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("não deve criar livro sem token", async () => {
    const res = await request(app).post("/api/v1/books").send({
      title: "Livro Sem Token",
      authorId: 1,
      genreId: 1,
    });

    expect(res.status).toBe(401);
  });
});
