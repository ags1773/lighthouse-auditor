const fs = require("fs").promises;
const path = require("path");

function writeReport(data, filePrefix = "") {
  return fs.writeFile(
    path.resolve(
      path.join(
        __dirname,
        "../..",
        "reports",
        `${filePrefix}${Date.now()}_lhreport.json`
      )
    ),
    data
  );
}

module.exports = { writeReport };
