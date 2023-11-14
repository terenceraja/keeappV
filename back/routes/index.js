const axios = require("axios");
const https = require("https");

var express = require("express");
var router = express.Router();

router.get("/data", async (req, res) => {
  let url =
    "https://srvdev01.local/fmi/data/v1/databases/F3G_OCEAN_DATA/sessions";
  // "https://78.195.71.84/fmi/data/v1/databases/POC_MKA/sessions";
  const username = "BetterForms";
  const password = 123456;
  const base64Credentials = btoa(`${username}:${password}`);

  let headers = {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  };

  try {
    let response = await axios({
      method: "post",
      url: url,
      headers: headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    let token = response.data.response.token;
    url =
      "https://srvdev01.local/fmi/data/v1/databases/F3G_OCEAN_DATA/layouts/mouvements/records?_offset=1&_limit=10000";

    // ("https://78.195.71.84/fmi/data/v1/databases/POC_MKA/layouts/MOUVEMENTS/records?_offset=1&_limit=500");

    headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    response = await axios({
      method: "get", // Change to GET method
      url: url,
      headers: headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    let dataMVT = response.data.response.data;
    let dataArray = [];

    for (const index of dataMVT) {
      dataArray.push(index.fieldData);
    }

    res.status(response.status).json(dataArray);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong YO" });
  }
});

router.get("/data/:IdPtf", async (req, res) => {
  let url =
    "https://srvdev01.local/fmi/data/v1/databases/F3G_OCEAN_DATA/sessions";

  const username = "BetterForms";
  const password = 123456;
  const base64Credentials = btoa(`${username}:${password}`);

  let headers = {
    Authorization: `Basic ${base64Credentials}`,
    "Content-Type": "application/json",
  };

  try {
    let response = await axios({
      method: "post",
      url: url,
      headers: headers,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    let token = response.data.response.token;
    url =
      "https://srvdev01.local/fmi/data/v1/databases/F3G_OCEAN_DATA/layouts/mouvements/_find";

    headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    response = await axios({
      method: "post",
      url: url,
      headers: headers,
      data: {
        query: [{ IdPtf: req.params.IdPtf }],
        offset: "1",
        limit: "100000000000",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    let dataMVT = response.data.response.data;
    let dataArray = [];

    for (const index of dataMVT) {
      dataArray.push(index.fieldData);
    }

    res.status(response.status).json(dataArray);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong YO" });
  }
});

module.exports = router;
