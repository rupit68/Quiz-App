import Questions from "../models/questionSchema.js";
import Result from "../models/resultSchema.js";
import question, { answer } from "../database/data.js";

// get all questions
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
}

// insert all questions
export async function insertQuestions(req, res) {
  try {
    const data = await Questions.insertMany([{ question, answer }]);
    res.json({ msg: "Data Saved Successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// delete question
export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: "Questions delete Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// get all result
export async function getResult(req, res) {
  try {
    const r = await Result.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
}

// post all result
export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;

    if (!username || !result) {
      return res.status(400).json({ error: "Data not provided" });
    }

    // Use await instead of a callback
    const data = await Result.create({
      username,
      result,
      attempts,
      points,
      achived,
    });

    res.json({ msg: "Data Saved Successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//delete all result
export async function deleteResult(req, res) {
  try {
    await Result.deleteMany();
    res.json({ msg: "Result delete Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
