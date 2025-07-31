const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, "..", "public");
const adminDir = __dirname;
const MAX_ATTEMPTS = 5;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "defaultsecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/public", express.static(publicDir));
app.use("/projects", express.static(path.join(publicDir, "projects")));

function sanitizeInput(input) {
  return /[{}\[\]"'\/]/.test(input);
}

function isAuthenticated(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.redirect("/projadmin/login");
}

app.get("/projadmin/login", (req, res) => {
  res.sendFile(path.join(adminDir, "login.html"));
});

app.post("/projadmin/login", async (req, res) => {
  const { username, password } = req.body;
  req.session.attempts = req.session.attempts || 0;

  if (sanitizeInput(username) || sanitizeInput(password)) {
    return res.status(400).send("Недопустимые символы");
  }

  if (req.session.attempts >= MAX_ATTEMPTS) {
    return res.status(403).send("Слишком много попыток входа");
  }

  const isLoginValid = username === process.env.ADMIN_USER;
  const isPassValid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASS_HASH
  );

  if (isLoginValid && isPassValid) {
    req.session.authenticated = true;
    req.session.attempts = 0;
    return res.redirect("/projadmin");
  } else {
    req.session.attempts++;
    return res
      .status(401)
      .send("ОКАК Неверные логин или пароль или вы машенник?");
  }
});

app.get("/projadmin", isAuthenticated, (req, res) => {
  res.sendFile(path.join(adminDir, "index.html"));
});

app.use("/projadmin", isAuthenticated, express.static(adminDir));

const upload = multer({ dest: path.join(__dirname, "temp_uploads") });

app.post(
  "/upload",
  isAuthenticated,
  upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "galleryImage1", maxCount: 1 },
    { name: "galleryImage2", maxCount: 1 },
    { name: "galleryImage3", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        title_ru,
        title_en,
        title_uz,
        desc_ru,
        desc_en,
        desc_uz,
        area,
        year,
        folderName,
      } = req.body;

      const targetFolder = path.join(publicDir, "projects", folderName);
      fs.mkdirSync(targetFolder, { recursive: true });

      const allFiles = {
        mainImage: req.files.mainImage?.[0],
        galleryImage1: req.files.galleryImage1?.[0],
        galleryImage2: req.files.galleryImage2?.[0],
        galleryImage3: req.files.galleryImage3?.[0],
      };

      let index = 1;
      for (const key in allFiles) {
        const file = allFiles[key];
        if (file) {
          const ext = path.extname(file.originalname);
          const newFileName = `${index}${ext}`;
          const newPath = path.join(targetFolder, newFileName);
          fs.renameSync(file.path, newPath);
          index++;
        }
      }

      const dataPath = path.join(publicDir, "data.json");
      const translationsPath = path.join(publicDir, "translations.json");

      let data = [];
      if (fs.existsSync(dataPath)) {
        data = JSON.parse(fs.readFileSync(dataPath));
        data = data.filter((p) => p.folder !== folderName);
      }
      data.push({ folder: folderName, area, year });
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

      let translations = {};
      if (fs.existsSync(translationsPath)) {
        translations = JSON.parse(fs.readFileSync(translationsPath));
      }
      translations[folderName] = {
        title: { ru: title_ru, en: title_en, uz: title_uz },
        description: { ru: desc_ru, en: desc_en, uz: desc_uz },
      };
      fs.writeFileSync(translationsPath, JSON.stringify(translations, null, 2));

      res.redirect("/projadmin");
    } catch (err) {
      console.error("❌ Ошибка при загрузке:", err);
      res.status(500).send("Ошибка при сохранении проекта.");
    }
  }
);

app.get("/delete", isAuthenticated, async (req, res) => {
  const folder = req.query.folder;
  if (!folder) return res.status(400).send("No folder specified");

  try {
    const folderPath = path.join(publicDir, "projects", folder);
    if (fs.existsSync(folderPath)) {
      await fsp.rm(folderPath, { recursive: true, force: true });
    }

    const dataPath = path.join(publicDir, "data.json");
    const translationsPath = path.join(publicDir, "translations.json");

    const data = JSON.parse(await fsp.readFile(dataPath, "utf-8"));
    const newData = data.filter((p) => p.folder !== folder);
    await fsp.writeFile(dataPath, JSON.stringify(newData, null, 2));

    const translations = JSON.parse(
      await fsp.readFile(translationsPath, "utf-8")
    );
    delete translations[folder];
    await fsp.writeFile(
      translationsPath,
      JSON.stringify(translations, null, 2)
    );

    res.send("OK");
  } catch (err) {
    console.error("❌ Ошибка при удалении:", err);
    res.status(500).send("Ошибка при удалении");
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const dataPath = path.join(publicDir, "data.json");
    const translationsPath = path.join(publicDir, "translations.json");

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    const translations = JSON.parse(fs.readFileSync(translationsPath, "utf-8"));

    const projects = data.map((item) => {
      const folder = item.folder;
      const images = fs
        .readdirSync(path.join(publicDir, "projects", folder))
        .sort()
        .map((filename) => `/projects/${folder}/${filename}`);

      return {
        id: folder,
        year: item.year,
        area: item.area,
        title: translations[folder].title,
        description: translations[folder].description,
        images,
        mainImage: `/projects/${folder}/1.jpg`,
      };
    });

    res.json(projects);
  } catch (err) {
    console.error("❌ Ошибка при получении проектов:", err);
    res.status(500).send("Ошибка при получении проектов");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер работает: http://localhost:${PORT}/projadmin`);
});
