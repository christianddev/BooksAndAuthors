import supertest from "supertest";
import {app, server} from "../app";
import { AUTHORS_PATH } from "../utils";
const api = supertest(server);

describe("authors", () => {
  test("getAll", async () => {
    await api
      .get(AUTHORS_PATH)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
