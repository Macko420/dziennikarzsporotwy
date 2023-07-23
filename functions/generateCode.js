const moment = require("moment");
const bcrypt = require("bcrypt");

async function veriCode(userId) {
  console.log(userId);
  if (!userId) return null;
  let domain = "http://localhost:3500";
  const code = await bcrypt.hash(userId, 10);
  const date = moment().add(1, "hour").toISOString();
  const link = `${domain}/verify?token=${encodeURIComponent(code)}`;
  console.log(code, date, link);
  return { code, date, link };
}

module.exports = { veriCode };
