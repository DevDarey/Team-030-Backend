import { expect } from "chai";
import debug from "debug";
import chalk from "chalk";
import request from "supertest";
import { User } from "../db";
import app from "..";

const ROOT = "/api";
const tokens = {};

const log = debug("test");

describe("ALL TESTS", () => {
 describe("USER TESTS", () => {
  before((done) => {
   User.model.deleteMany({}).then(() => {
    done();
   });
  });
  it("should register new user", (done) => {
   const requestBody = {
    firstName: "Silas",
    lastName: "Paulus",
    password: "thisistestpassword",
    email: "s_paulus@agromart.com",
    userType: "ret"
   };

   request(app)
    .post(ROOT + "/user/register")
    .send(requestBody)
    .end((err, res) => {
     log(chalk.bgGray(chalk.blue(JSON.stringify(res.body, null, 2))));
     tokens.user1 = res.body.response.token;
     expect(res.status).to.be.eql(201);
     done(err);
    });
  });
  it("should log user in", (done) => {
   const requestBody = {
    email: "s_paulus@agromart.com",
    password: "thisistestpassword"
   };

   request(app)
    .post(ROOT + "/user/login")
    .send(requestBody)
    .end((err, res) => {
     log(chalk.bgWhiteBright(chalk.magentaBright(JSON.stringify(res.body, null, 2))));
     tokens.user1 = res.body.response.token;
     expect(res.status).to.be.eql(200);
     done(err);
    });
  });
 });
});
