function replaceImagePattern(str, articleId, imgs) {
  const link = `http://localhost/pics/uploads/`;
  const pattern = /\<img\s+([^>]+)&([^>]+)\>/g;

  const replaced = str.replace(pattern, (match, fileName, opisZdjecia) => {
    console.log("match: ", match);
    console.log("fileName: ", fileName);
    fileName = fileName.trim();
    opisZdjecia = opisZdjecia.trim();
    // console.log("filename: ", fileName, " , Opis: ", opisZdjecia);
    if (fileName in imgs) {
      // const replacement = `<img src="${link}${articleId}/imgs/${imgs[fileName]}" alt="img"/>`;
      const replacement = `<figure>
      <img src="${link}${articleId}/imgs/${imgs[fileName]}"/>
      <figcaption style="display: block; text-align: center; color: gray; font-size: smaller;">${opisZdjecia}</figcaption>
      </figure>`;
      return replacement;
    } else {
      throw new Error("Error: image not found");
    }
  });

  return replaced;
}
function replaceNewLinesWithBreaks(text) {
  const regex = /\r\n/g;
  return text.replace(regex, "<br/>");
}

function dodajZnacznikiP(tekst) {
  return `<p>${tekst}</p>`;
}

module.exports = {
  replaceImagePattern: replaceImagePattern,
  replaceNewLines: replaceNewLinesWithBreaks,
  dodajZnacznikiP: dodajZnacznikiP,
};
