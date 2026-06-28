import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();

// pino-http's type definitions can sometimes be treated as a module namespace
// rather than a callable function depending on TS config + module resolution.
// Cast to `any` when invoking to avoid the "has no call signatures" error.
app.use(
  (pinoHttp as any)({
    logger,
    serializers: {
      req(req: Request) {
        // `id` may be added by middleware; keep a safe any access for that field
        return {
          id: (req as any).id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: Response) {
        return {
          statusCode: (res as any).statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
