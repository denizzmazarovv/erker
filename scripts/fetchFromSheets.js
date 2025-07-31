const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const CREDENTIALS = require("./google-credentials.json");
const SHEET_ID = "1of_IcgP7caETFi6Y0Zutwswb2_CKWbfx9P7aDOa-q5M"; // без https://docs.google.com...

const PUBLIC_PATH = path.join(__dirname, "..", "public");

async function run() {
  const doc = new GoogleSpreadsheet(SHEET_ID);
  await doc.useServiceAccountAuth(CREDENTIALS);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet.getRows();

  const result = [];
  let counter = 1;

  for (const row of rows) {
    const mainUrl = row["Главное фото"];
    const title = row["Название"];
    const year = row["Год"];
    const area = row["Площадь"];
    const location = row["Местоположение"];
    const category = row["Категория"];
    const description = row["Описание"];
    const imageUrls = [row["Фото 1"], row["Фото 2"], row["Фото 3"]].filter(
      Boolean
    );

    let mainFile = null;
    const extraFiles = [];

    if (mainUrl) {
      const { fileName } = await downloadImage(mainUrl, counter);
      mainFile = fileName;
      counter++;
    }

    for (const url of imageUrls) {
      const { fileName } = await downloadImage(url, counter);
      extraFiles.push(fileName);
      counter++;
    }

    result.push({
      title,
      year,
      area,
      location,
      category,
      description,
      mainImage: mainFile,
      images: extraFiles,
    });
  }

  fs.writeFileSync(
    path.join(PUBLIC_PATH, "data.json"),
    JSON.stringify(result, null, 2)
  );
  console.log("✅ Данные обновлены и сохранены в public/");
}

async function downloadImage(url, number) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const contentType = response.headers["content-type"];
  let ext = contentType.split("/")[1];
  if (ext === "jpeg") ext = "jpg";

  const fileName = `${number}.${ext}`;
  const filePath = path.join(PUBLIC_PATH, fileName);
  fs.writeFileSync(filePath, response.data);

  console.log(`📸 Скачано: ${fileName}`);
  return { fileName };
}

run().catch(console.error);
