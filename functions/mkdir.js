const fs = require("fs");
const path = require("path");

function saveFileWithFolder(fileName, folderPath) {
  const targetFolderPath = path.resolve(folderPath);

  // Tworzenie folderu
  fs.mkdirSync(targetFolderPath, { recursive: true });

  const targetPath = path.resolve(targetFolderPath, fileName);
  // Wykonaj operacje zapisu pliku w `targetPath`...
  // fs.writeFile(targetPath, data, callback); - przykładowe operacje zapisu pliku

  console.log("Plik został zapisany w:", targetPath);
}

module.exports = { saveFileWithFolder };
