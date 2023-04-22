import { catchWrap } from "../middleware/errorHandler";
import cohere from "cohere-ai";
import amazonScraper from "amazon-buddy";

const score = async (params) => {
  const {
    title,
    description: desc,
    feature_bullets: features,
    product_information: info,
  } = params;
  cohere.init(process.env.COHERE_KEY);
  const resp = await cohere.generate({
    model: "command-xlarge-nightly",
    prompt: `Analyze the sustainability score of this item from Amazon, \
        where 1 denotes very unsustainable and 10 denotes very sustainable. \
        Explain in what ways it is sustainable or not sustainable.
        Title: ${title}
        Description: ${desc}
        ${features.join("\n")}
        Brand: ${info.brand !== "" ? info.brand : "N/A"}
        Manufacturer: ${info.manufacturer !== "" ? info.brand : "N/A"}
        Sold by: ${info.sold_by !== "" ? info.sold_by : "N/A"}`, // prompt here
    max_tokens: 2048,
    temperature: 0.4,
    k: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  });
  if (resp.statusCode != 200) {
    console.log(resp);
    throw new Error("cohere error");
  }
  return resp.body.generations[0].text;
};

const singleQuery = async (ASIN) => {
  const resp = await amazonScraper.asin({ asin: ASIN });
  return await score(resp.result[0]);
};

const query = catchWrap(async (req, res, next) => {
  const { asins } = req.body;
  if (!asins) {
    throw new Error("Missing request ASIN field");
  }
  const resps = await Promise.all(asins.map((asin) => singleQuery(asin)));
  res.status(200).json(resps);
});

export { query };
