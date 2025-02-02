import App from "./lib/App";
import { PORT } from "./config/constants";
import connectToDatabase from "./config/db";

async function main(): Promise<void> {
	try {
		await connectToDatabase();
		const app: App = App.getInstance();
		app.listen(PORT as number);
	} catch (error) {
		console.error("An error occurred:\n", error);
		process.exit(1);
	}
}

main();
