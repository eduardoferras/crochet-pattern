import { env } from "@config/env.config.ts";
import App from "@/app.ts";

async function bootstrap() {
	try {
		const app = new App();

		const port = env.PORT;
		app.listen(port);
	} catch (error) {
		console.error("Error occurred while starting the server:", error);
		process.exit(1);
	}
}

bootstrap();
