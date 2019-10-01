import request from "request-promise-native";
import { generateToken } from "./support/generateToken";

describe("Boclips for Teacher user", () => {
  it("can log in", async () => {
    const token = await generateTeacherToken();

    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(50);
  });

  it("can fetch their collections", async () => {
    const token = await generateTeacherToken();

    const response = await request({
      method: "GET",
      uri:
        "https://api.boclips.com/v1/collections?owner=6a2ca4e0-0f95-4615-bd2b-0eadd781bc4e",
      auth: {
        bearer: token
      }
    });

    const content = JSON.parse(response);

    expect(content._embedded.collections).toBeDefined();
  });

  it("can fetch a collection", async () => {
    const token = await generateTeacherToken();

    const response = await request({
      method: "GET",
      uri: "https://api.boclips.com/v1/collections/5d680e50aefd6e74e8166839",
      auth: {
        bearer: token
      }
    });

    const content = JSON.parse(response);

    expect(content).toBeDefined();
    expect(content.id).toBeDefined();
    expect(content.title).toBeDefined();
    expect(content.videos).toBeDefined();
  });

  it("can search videos", async () => {
    const token = await generateToken();

    const response = await request({
      method: "GET",
      uri: "https://api.boclips.com/v1/videos?q=climate",
      auth: {
        bearer: token
      }
    });

    const content = JSON.parse(response);

    expect(content._embedded.videos).toBeDefined();
    expect(content._embedded.videos.length).toBeGreaterThan(5);
  });
});

async function generateTeacherToken() {
  const token = await generateToken(
    process.env.TEACHERS_USERNAME,
    process.env.TEACHERS_PASSWORD
  );

  return token;
}
