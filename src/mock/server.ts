import { createServer, Model, Factory, Response, Serializer } from "miragejs";
import { faker } from "@faker-js/faker";
import { User } from "@type/user.types";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    serializers: {

      user: Serializer.extend({
        valueForId(value: string) {
          return parseInt(value);
        },
      }),
    },

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    factories: {
      user: Factory.extend({
        firstName: () => faker.person.firstName(),
        lastName: () => faker.person.lastName(),
        age: () => faker.number.int({ min: 18, max: 80 }),
        gender: () => faker.helpers.arrayElements(['male', 'female', 'other'], 1)[0],
        city: () => faker.location.city(),
        country: () => faker.location.country(),
        birthday: () => faker.date.birthdate().toLocaleDateString(),
        nic: () => faker.string.numeric({ length: 10 }),
        profileImage: () => faker.image.avatar(),
        phoneNumber: () => faker.phone.number({ style: "international" }),
      }),
    },

    seeds(server) {
      server.createList("user", 1000);
    },

    routes() {
      this.namespace = "api";
      this.timing = 3000;
      
      // Get all users
      this.get("/users", (schema) => {
        return schema.all("user");
      });

      // Get a single user
      this.get("/users/:id", (schema, request) => {
        const user = schema.find("user", request.params.id);
        return user ? user : new Response(404, {}, { error: "User not found" });
      });

      // Create a new user
      this.post("/users", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("user", { ...attrs, id: faker.number.int() });
      });

      // Update a user
      this.put("/users/:id", (schema, request) => {
        const user = schema.find("user", request.params.id);
        const newAttrs = JSON.parse(request.requestBody);
        return user?.update(newAttrs) ?? new Response(404, {}, { error: "User not found" });
      });

      // Delete a user
      this.del("/users/:id", (schema, request) => {
        const user = schema.find("user", request.params.id);
        
        if (user) {
          user.destroy();
          return new Response(204);
        } else {
          return new Response(404, {}, { error: "User not found" });
        }
      });
    },
  });
}
