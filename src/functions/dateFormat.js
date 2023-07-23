function formatujDate(data) {
  const dateObj = new Date(data);

  const dzien = String(dateObj.getDate()).padStart(2, "0");
  const miesiac = String(dateObj.getMonth() + 1).padStart(2, "0");
  const rok = dateObj.getFullYear();

  return `${dzien}.${miesiac}.${rok}`;
}

module.exports = formatujDate;
