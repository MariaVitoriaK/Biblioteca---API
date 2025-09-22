import request from "supertest";
import { AppDataSource } from "../src/config/datasource";
import app from "../src/app";
import { Reservation } from "../src/entities/Reservation";
import { User } from "../src/entities/User";

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  // desabilita verificações de FK
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");

  // limpa as tabelas na ordem correta
  await AppDataSource.getRepository(Reservation).clear();
  await AppDataSource.getRepository(User).clear();

  // habilita novamente FK
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User API", () => {
  it("deve criar um novo usuário", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send({
        name: "Teste",
        email: "teste@test.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
  });

  it("deve listar usuários", async () => {
    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
