import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("State route with GET method");
});

export default router;
