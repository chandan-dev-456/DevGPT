import express from 'express'
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import { model } from 'mongoose';

const app = express()
app.use(express.json())
// app.use(cors());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.post("/test", async (req, res) => {
  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: "What is google?"
    });

    res.status(200).json({
      role: "assistant",
      message: interaction.output_text
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.listen(3000 , async(req , res)=>{
  console.log(`server running on http://localhost:3000`);
})