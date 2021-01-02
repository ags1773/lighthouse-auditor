const fetch = require("node-fetch");

async function runPagespeedInsights(webpageUrl) {
  const queryParams = {
    key: process.env.PAGESPEED_API_KEY,
    url: encodeURIComponent(webpageUrl),
    strategy: "mobile",
    category: "performance",
  };
  const url = constructUrl(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`,
    queryParams
  );
  const pageSpeedInsightsData = await makeApiCall(url);
  return pageSpeedInsightsData;
}

function constructUrl(url, queryParams) {
  let str = url;
  Object.keys(queryParams).forEach((key, i) => {
    if (i === 0) str += `?${key}=${queryParams[key]}`;
    else str += `&${key}=${queryParams[key]}`;
  });
  return str;
}

function makeApiCall(url, options = {}) {
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error(`Error occured. HTTP status - ${res.status} | ${res}`);
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

module.exports = { runPagespeedInsights };
