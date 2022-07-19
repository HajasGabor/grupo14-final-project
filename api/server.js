"use strict";
import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { authenticateToken } from "./util.js";
import {
  createCategory,
  createUser,
  createVideo,
  deleteCategory,
  deleteUser,
  deleteVideo,
  getAllVideos,
  getCategories,
  getUsers,
  getVideos,
  login,
  updateCategory,
  updateUser,
  updateVideo,
} from "./endpoints.js";

const server = express();
const port = 8080;

// Configuring express to use body-parser as middle-ware.
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors({origin:true, credentials: true}));

const router = express.Router();

router.post("/login", login);
router.post("/api/user", authenticateToken, createUser);
router.post("/api/category", authenticateToken, createCategory);
router.post("/api/video", authenticateToken, createVideo);

router.get("/api/users", authenticateToken, getUsers);
router.get("/api/videos", authenticateToken, getVideos);
router.get("/api/categories", authenticateToken, getCategories);
router.get("/api/allVideos", authenticateToken, getAllVideos);

router.put("/api/video/:videoId", authenticateToken, updateVideo);
router.put("/api/category/:categoryId", authenticateToken, updateCategory);
router.put("/api/user/:userId", authenticateToken, updateUser);

router.delete("/api/video/:videoId", authenticateToken, deleteVideo);
router.delete("/api/category/:categoryId", authenticateToken, deleteCategory);
router.delete("/api/user/:userId", authenticateToken, deleteUser);

server.use("/", router);

server.listen(port, () => {
  console.log("Server started at port " + port);
});