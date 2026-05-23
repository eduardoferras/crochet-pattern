import { env } from "@config/env.config.ts";
import App from "@/app.ts";

const port = env.PORT;
const app = new App();

app.listen(port);
