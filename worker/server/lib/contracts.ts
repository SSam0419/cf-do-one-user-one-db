// import fs from 'node:fs';
import { minifyContractRouter } from "@orpc/contract";
import { apiRouter } from "../orpc/api-router";

const minifiedRouter = minifyContractRouter(apiRouter);
console.log(JSON.stringify(minifiedRouter));
// fs.writeFileSync('./lib/contract.json', JSON.stringify(minifiedRouter));

export const apiContract = {
  health: {
    "~orpc": { errorMap: {}, meta: {}, route: { method: "GET", path: "/" } },
  },
  items: {
    list: {
      "~orpc": {
        errorMap: {},
        meta: {},
        route: { method: "GET", path: "/{slug}/items" },
      },
    },
    create: {
      "~orpc": {
        errorMap: {},
        meta: {},
        route: { method: "POST", path: "/{slug}/items" },
      },
    },
  },
  organizations: {
    create: {
      "~orpc": {
        errorMap: {},
        meta: {},
        route: { method: "POST", path: "/organizations" },
      },
    },
  },
};
