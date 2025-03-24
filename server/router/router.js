import { Router } from "express";
const router = Router();

// import controller

import * as controller from "../controllers/controller.js";

// Question Routes Apis

router
  .route("/questions")
  .get(controller.getQuestions)
  .post(controller.insertQuestions)
  .delete(controller.dropQuestions);

router
  .route("/result")
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.deleteResult);
export default router;
