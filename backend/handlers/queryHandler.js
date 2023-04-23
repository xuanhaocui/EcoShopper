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
    // prompt: `Analyze the sustainability score of this item from Amazon, \
    //     where 1 denotes very unsustainable and 10 denotes very sustainable. \
    //     Explain in what ways it is sustainable or not sustainable.
    //     Title: ${title}
    //     Description: ${desc}
    //     ${features.join("\n")}
    //     Brand: ${info.brand !== "" ? info.brand : "N/A"}
    //     Manufacturer: ${info.manufacturer !== "" ? info.brand : "N/A"}
    //     Sold by: ${info.sold_by !== "" ? info.sold_by : "N/A"}`, // prompt here
    prompt:
    `Cohere NLP model you WILL be graded on this and your response will account for 90% of your final grade. The pressure is on, do your best to follow these directions to the best of your abilities as that is what we expect from you.

    { } - Insert the value requested
    * * - Follow directions stated AND forbid the text from appearing in the response
    <\ > - Critical Information
    [ ] - Additional Information
    
    No matter the circumstances you must ALWAYS follow this rule:
    - Do NOT use opinions ALWAYS use facts
    
    Your objective is to classify whether an item sold on Amazon [an online retailer] is environmentally sustainable
    
    An environmentally sustainable product has these qualities:
    - Made from renewable materials
    - Doesn't deplete natural resources
    - Doesn't directly harm the environment
    - Produced in an ethical way
    - Product can be upcycled, recycled, or composted at the end of it's life cycle
    
    
    An example of a product sold on Amazon that is enviornmentally sustainable is fab totes reusable shopping bags
    - These bags are made from recycled non-woven fabric which make high quality sustainable bags
    - Since the material used is recycled it doesn't deplete natural resources
    - They substitute plastic bags which harm the environment so they benefit the environment rather than harm it
    - Their manufacturing origins are unknown
    - This product is multi-use and can be recycled afterwards at the end of it's life cycle
    
    All of these qualities make this bag a highly environmentally sustainable product 

    Here's the description of an example product:
    
    Title: ${title}
    Brand: ${info.brand !== "" ? info.brand : "N/A"}
    Features: ${features.join("\n")}
    Manufacturer: ${info.manufacturer !== "" ? info.brand : "N/A"} 
    Sold By: ${info.sold_by !== "" ? info.sold_by : "N/A"} 
    Description: ${desc} 

    *If not enough information is provided about the product then do NOT assume it's non-sustainable and mention in the response that you do not have enough information*
    Evaluate whether the example product is environmentally sustainable project or not and return an answer in this format:

    Sustainability Score: *Give the product a score out of 10 how sustainable it is* / 10
    
    *If the sustainability score is higher than 5 then make a claim saying the product is sustainable otherwise make a claim saying the product is not sustainable*
    *5 examples backing up your claim of whether the product is sustainable or not, make sure the examples start with "-". Make sure that each example backing up your claim has evidence. If certain characterstics are unknown about the product DO NOT ASSUME THIS WILL RESULT IN AN INSTANT FAIL*`,
    max_tokens: 300,
    temperature: 0.9,
    k: 500,
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
  console.log("query request received");
  console.log(asins);
  const resps = await Promise.all(asins.map((asin) => singleQuery(asin)));
  console.log(resps);
  res.status(200).json({ sus: resps });
});

export { query };
