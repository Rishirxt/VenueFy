import express from "express";
import * as LocationController from "./location.controller";

const router = express.Router();

router.get("/reverse", LocationController.reverseGeocode);

export default router;
