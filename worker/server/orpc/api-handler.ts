import { apiRouter } from "@/worker/server/orpc/api-router";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
// import { onError } from "@orpc/server";
// import { RPCHandler } from "@orpc/server/websocket";

// export const rpcHandler = new RPCHandler(
//   {},
//   {
//     interceptors: [
//       onError((error) => {
//         console.error(error);
//       }),
//     ],
//   }
// );

export const apiHandler = new OpenAPIHandler(apiRouter, {
  plugins: [
    // new LoggingHandlerPlugin({
    // 	logger,
    // 	generateId: ({ request }) => crypto.randomUUID(),
    // 	logRequestResponse: true,
    // 	logRequestAbort: true,
    // }),
    new CORSPlugin({
      // Allow all origins by default. For production, configure specific origins:
      // origin: (origin) => {
      //   const allowedOrigins = ['https://yourdomain.com', 'http://localhost:5173'];
      //   return allowedOrigins.includes(origin) ? origin : null;
      // },
      credentials: true,
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      maxAge: 86400, // 24 hours
    }),
  ],
  interceptors: [
    // onError((error) => {
    //   // console.error(error);
    // }),
  ],
});
