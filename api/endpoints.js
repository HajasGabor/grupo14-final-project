import { processLogin } from "./util.js";
import sqlite3 from "sqlite3";

var db = new sqlite3.Database("sql/grupo14.db", function (err) {
  if (err) console.log(err);
});

export const login = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  processLogin(req, res, db);
};

export const createUser = (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.isAdmin ||
    !req.body.name
  ) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can create new user")) {
    return;
  }

  runSql(res,
    `INSERT INTO Users(name, email, password, isAdmin) VALUES(?, ?, ?, ?)`,
    [req.body.name, req.body.email, req.body.password, req.body.isAdmin]
  );
};

export const createCategory = (req, res) => {
  if (!req.body.name) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (
    !isValidRole(res, req.user.isAdmin, "Only admin can create new category")
  ) {
    return;
  }

  runSql(res, `INSERT INTO Categories(name) VALUES(?)`, [req.body.name]);
};

export const createVideo = (req, res) => {
  if (!req.body.name || !req.body.url || !req.body.categoryId) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can create new video")) {
    return;
  }

  runSql(res, `INSERT INTO Videos(name, url, categoryId) VALUES(?, ?, ?)`, [
    req.body.name,
    req.body.url,
    req.body.categoryId,
  ]);
};

export const getUsers = (req, res) => {
  if (
    !isValidRole(res, req.user.isAdmin, "Only admin can access list of users")
  ) {
    return;
  }

  var sql = "select * from users";
  var params = [];

  allSql(res, sql, params);
};

export const getVideos = (req, res) => {
  var sql = "select * from videos";
  var params = [];

  allSql(res, sql, params);
};

export const getCategories = (req, res) => {
  var sql = "select * from categories";
  var params = [];

  allSql(res, sql, params);
};

export const getAllVideos = (req, res) => {
  var sql =
    "select categories.name as categoryName, categories.id as categoryId, videos.url, videos.name as videoName, videos.id as videoId from categories join videos on categories.id=videos.categoryId";
  var params = [];

  allSql(res, sql, params);
};

export const updateVideo = (req, res) => {
  if (
    !req.params.videoId ||
    !req.body.name ||
    !req.body.url ||
    !req.body.categoryId
  ) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can update a video")) {
    return;
  }

  runSql(res, `UPDATE Videos SET name = ?, url = ?, categoryId = ? WHERE id = ?`, [
    req.body.name,
    req.body.url,
    req.body.categoryId,
    req.params.videoId,
  ]);
};

export const updateCategory = (req, res) => {
  if (!req.params.categoryId || !req.body.name) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can update a category")) {
    return;
  }

  runSql(res, `UPDATE Categories SET name = ? WHERE id = ?`, [
    req.body.name,
    req.params.categoryId,
  ]);
};

export const updateUser = (req, res) => {
  if (
    !req.params.userId ||
    !req.body.email ||
    !req.body.password ||
    !req.body.isAdmin ||
    !req.body.name
  ) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can update a user")) {
    return;
  }

  runSql(res,
    `UPDATE Users SET name = ?, email = ?, password = ?, isAdmin = ? WHERE id = ?`,
    [
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.isAdmin,
      req.params.userId,
    ]
  );
};

export const deleteVideo = (req, res) => {
  if (!req.params.videoId) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can delete a video")) {
    return;
  }

  runSql(res, `DELETE FROM Videos WHERE id = ?`, [req.params.videoId]);
};

export const deleteCategory = (req, res) => {
  if (!req.params.categoryId) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can delete a category")) {
    return;
  }

  runSql(res, `DELETE FROM Categories WHERE id = ?`, [req.params.categoryId]);
};

export const deleteUser = (req, res) => {
  if (!req.params.userId) {
    res.json({ errormsg: "Request not valid" });
    return;
  }

  if (!isValidRole(res, req.user.isAdmin, "Only admin can delete a user")) {
    return;
  }

  runSql(res, `DELETE FROM Users WHERE id = ?`, [req.params.userId]);
};

function isValidRole(res, isAdmin, errorMessage) {
  if (!isAdmin) res.status(403).json({ error: errorMessage });

  return isAdmin;
}

function runSql(res, sql, params) {
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
    });
  });
}

function allSql(res, sql, params) {
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
}
