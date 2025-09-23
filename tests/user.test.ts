import request from "supertest";
import { AppDataSource } from "../src/config/datasource";
import app from "../src/app";
import { Reservation } from "../src/entities/Reservation";
import { User } from "../src/entities/User";


beforeAll(async () => {
  await AppDataSource.initialize();
});

beforeEach(async () => {
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");

  await AppDataSource.getRepository(Reservation).clear();
  await AppDataSource.getRepository(User).clear();

  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("User API", () => {
  it("deve registrar um novo usuário", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register") 
      .send({
        name: "Teste",
        email: "teste@test.com",
        password: "123456",
      });
      
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Usuário criado com sucesso");
  });

  it("deve listar usuários", async () => {
    
    await request(app).post("/api/v1/auth/register").send({
      name: "Outro",
      email: "outro@test.com",
      password: "123456",
    });

    const res = await request(app).get("/api/v1/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
