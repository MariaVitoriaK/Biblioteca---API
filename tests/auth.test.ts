import request from "supertest";
import { AppDataSource } from "../src/config/datasource";
import app from "../src/app";
import { User } from "../src/entities/User";
import { Reservation } from "../src/entities/Reservation";

beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  // desabilita checagem de FK
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

describe("Auth API", () => {
  it("deve registrar um usuário", async () => {
    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Teste Auth",
      email: "testeauth@test.com",
      password: "123456",
    });

    expect(res.status).toBe(201);
  });

  it("não deve registrar usuário com email duplicado", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Teste Auth",
      email: "testeauth@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/v1/auth/register").send({
      name: "Teste Auth 2",
      email: "testeauth@test.com",
      password: "123456",
    });

    expect(res.status).toBe(400);
  });

  it("deve fazer login com usuário existente", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Teste Login",
      email: "testelogin@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/v1/auth/login").send({
      email: "testelogin@test.com",
      password: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("não deve fazer login com senha errada", async () => {
    await request(app).post("/api/v1/auth/register").send({
      name: "Teste Login",
      email: "testelogin2@test.com",
      password: "123456",
    });

    const res = await request(app).post("/api/v1/auth/login").send({
      email: "testelogin2@test.com",
      password: "senhaerrada",
    });

    expect(res.status).toBe(401);
  });
});
