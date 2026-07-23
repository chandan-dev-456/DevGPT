import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173",
	})
);

app.use(express.json());


app.use("/",chatRoutes);
app.use("/devgpt", chatRoutes);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("✅ MongoDB Connected");
	} catch (err) {
		console.error("MongoDB Connection Error");
		console.error(err);
		process.exit(1);
	}
};

const startServer = async () => {
	await connectDB();

	app.listen(3000, () => {
		console.log("🚀 Server running on port 3000");
	});
};

startServer();