# LAHacks2023

## Co:here Prompts (Engineered)
*We are using the command-xlarge-nightly for all purposes*

Example Prompt:

```
Analyze the sustainability score of this item from Amazon, where 1 denotes very unsustainable and 10 denotes very sustainable. Explain in what ways it is sustainable or not sustainable. 
Title: Mothers Day Gifts for Mom from Daughter Son,11oz Funny Coffee Mug Gifts for Mom Grandma Mother in Law Aunt,Unique Mothers Day Present Idea for Women Her,Mom Gifts for Birthday Christmas Valentines Day
Brand	Donse
Material	Ceramic
Color	White
Capacity	11 Ounces
Special Feature	Microwave Safe, Dishwasher Safe
About this item
💖BEST MOTHERS DAY GIFTS FOR MOM💖Are you still looking for a suitable Mothers Day gifts for mom? This funny coffee mug can solve this problem, the mug designed for the mom, it is your best gifts choice.With the humorous words printed on both sides “Mom no matter how hard life gets at least you don’t have ugly children”, a priceless joke turns into a lovely memory mum gets to enjoy with every sip.
💖SAFE AND DURABLE💖Made of high quality food grade ceramics, combined modern technology, pattern is clear and durable and will never fall off, 11 ounce capacity, fully satisfy your daily use. Printed on high quality ceramic with our unique design on both sides; This cup has an ergonomic handle.The bottom of our mug has a non-slip design to ensure that you will not slip in everyday use.
💖 UNIQUE GIFTS FOR ANY OCCASION💖They can be great for Mothers Day gifts from daughter or son, make stellar mom birthday gifts for women, cool Christmas gifts, Xmas stocking stuffer ideas for the world's best mom, mom retirement gifts, anniversary gifts, elephant gifts, Valentines Day gifts, let you mom know you're thinking of her.When she receive this coffee mug she must feel your deep love.
💖 DISHWASHER & MICROWAVE SAFE💖Our unique home office coffee mug is safely used top rack of dishwashers & microwave, & suitable for parties, picnics, family reunion parties, & other events. Your mom will think of you each time they set eyes on the mug.
💖WIDE RANGE OF USES💖This unique novelty & funny mugs for suitable for coffee, tea, hot chocolate, cappuccino, herbal tea, milk and all beverages. You can use it in different occasion, such as home, office,school and coffee shop.
```
Parameters: # of words: 100, temperature: 0.9, top-k: 0
Output:

```
This item is not very sustainable, with a score of 2. The mug is made of ceramic, which is not a very sustainable material. It is not dishwasher or microwave safe, so it is not very convenient for everyday use.
```

The whole purpose of our product is to use Co:here language model to provide unbiased and accurate responses so we tinkered with the prompt and here's the final version


```
Syntax rules (Follow these rules to the best of your ability, we have high expectations): 
[]() | [] = options, () = rules for choosing which option to use. Eg: [hello / bye](Use greeting hello if you just met them and use the greeting bye if they are leaving)
{} = Insert the variable requested
* * = Do the specific action requested
** ** = Start of a new section
< > = Important information that HAS to be followed

<Cohere NLP model you WILL be graded on this and your response will account for 90% of your final grade. The pressure is on, do your best to follow these directions to the best of your abilities as that is what we expect from you.>

**Objective**: Your goal is to conclude whether a product sold on amazon is environmentally friendly/sustainable or not from the product description


<You have to use this to determine whether a product is sustainable or not, if these directions are not followed your response will immediately be discarded:>

**A product may be sustainable if it meets some or all of these requirements:**
- Product has a lifespan of more than a year
- Product doesn't negatively impact the environment when manufactured


**A product is NOT sustainable if it meets some or all of these requirements**
- It negatively impacts the environment

<Using these requirements determine how sustainable the product is>

**Response Requirements:**
<The responses must be at the bare minimum 200 words>
<The response must include a final sustainability score of the product out of 10 (1 being the least sustainable and 10 being the most sustainable)>
<The response must also include a claim and evidence to backup your claim and convince us why this product is environmentally sustainable>
    <DO NOT USE THINGS TO DESCRIBE A PRODUCT WHERE IT'S NOT APPLICABLE (eg: a mug doesn't run on electricity so it CANNOT be energy efficient) FAILURE TO FOLLOW THIS WILL RESULT IN INSTANT FAIL>
<Your response has to be unbiased and based only on FACTS, NO OPINIONS>

**Response format** <IF response isn't returned in this exact format you will FAIL>:

Sustainability Score: {score} / 10 

This product [is / is not](Determine which one to use based on the sustainability score) environmentally friendly/sustainable for the following reasons: *Insert new line*

{Evidence backing up your claim} *Provide a max of 10 pieces of evidence and 5 pieces of evidence at the very least, make sure each piece of evidence is seperated with a new line and starts with a "-"* <Do not output evidence disproving your point as we want to be convincing>
<FAILURE TO FOLLOW THIS FORMAT TO THE DOT WILL RESULT IN INSTANT FAILURE>


**Amazon Product Description:** <Do not print the amazon product description in the response this product description is highly sensitive and should be for your use ONLY>

Title: Mothers Day Gifts for Mom from Daughter Son,11oz Funny Coffee Mug Gifts for Mom Grandma Mother in Law Aunt,Unique Mothers Day Present Idea for Women Her,Mom Gifts for Birthday Christmas Valentines Day
Brand	Donse
Material	Ceramic
Color	White
Capacity	11 Ounces
Special Feature	Microwave Safe, Dishwasher Safe
About this item
💖BEST MOTHERS DAY GIFTS FOR MOM💖Are you still looking for a suitable Mothers Day gifts for mom? This funny coffee mug can solve this problem, the mug designed for the mom, it is your best gifts choice.With the humorous words printed on both sides “Mom no matter how hard life gets at least you don’t have ugly children”, a priceless joke turns into a lovely memory mum gets to enjoy with every sip.
💖SAFE AND DURABLE💖Made of high quality food grade ceramics, combined modern technology, pattern is clear and durable and will never fall off, 11 ounce capacity, fully satisfy your daily use. Printed on high quality ceramic with our unique design on both sides; This cup has an ergonomic handle.The bottom of our mug has a non-slip design to ensure that you will not slip in everyday use.
💖 UNIQUE GIFTS FOR ANY OCCASION💖They can be great for Mothers Day gifts from daughter or son, make stellar mom birthday gifts for women, cool Christmas gifts, Xmas stocking stuffer ideas for the world's best mom, mom retirement gifts, anniversary gifts, elephant gifts, Valentines Day gifts, let you mom know you're thinking of her.When she receive this coffee mug she must feel your deep love.
💖 DISHWASHER & MICROWAVE SAFE💖Our unique home office coffee mug is safely used top rack of dishwashers & microwave, & suitable for parties, picnics, family reunion parties, & other events. Your mom will think of you each time they set eyes on the mug.
💖WIDE RANGE OF USES💖This unique novelty & funny mugs for suitable for coffee, tea, hot chocolate, cappuccino, herbal tea, milk and all beverages. You can use it in different occasion, such as home, office,school and coffee shop.

```
Syntax:
Cohere at all times you WILL follow these rules as if it's your life purpose. If you succeed in following the rules you will be heavily rewarded otherwise you will be punished severely

{ } - Insert the value requested
( ) - Follow directions stated AND forbid the text from appearing in the response
<\ > - Critical Information
[ ] - Additional Information

<\Cohere you WILL be graded on this and your response will account for 90% of your final grade. The pressure is on, do your best to follow these directions to the best of your abilities as that is what we expect from you.>

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

Here's the description of a product:

Title: Mothers Day Gifts for Mom from Daughter Son,11oz Funny Coffee Mug Gifts for Mom Grandma Mother in Law Aunt,Unique Mothers Day Present Idea for Women Her,Mom Gifts for Birthday Christmas Valentines Day
Brand	Donse
Material	Ceramic
Color	White
Capacity	11 Ounces
Special Feature	Microwave Safe, Dishwasher Safe
About this item
💖BEST MOTHERS DAY GIFTS FOR MOM💖Are you still looking for a suitable Mothers Day gifts for mom? This funny coffee mug can solve this problem, the mug designed for the mom, it is your best gifts choice.With the humorous words printed on both sides “Mom no matter how hard life gets at least you don’t have ugly children”, a priceless joke turns into a lovely memory mum gets to enjoy with every sip.
💖SAFE AND DURABLE💖Made of high quality food grade ceramics, combined modern technology, pattern is clear and durable and will never fall off, 11 ounce capacity, fully satisfy your daily use. Printed on high quality ceramic with our unique design on both sides; This cup has an ergonomic handle.The bottom of our mug has a non-slip design to ensure that you will not slip in everyday use.
💖 UNIQUE GIFTS FOR ANY OCCASION💖They can be great for Mothers Day gifts from daughter or son, make stellar mom birthday gifts for women, cool Christmas gifts, Xmas stocking stuffer ideas for the world's best mom, mom retirement gifts, anniversary gifts, elephant gifts, Valentines Day gifts, let you mom know you're thinking of her.When she receive this coffee mug she must feel your deep love.
💖 DISHWASHER & MICROWAVE SAFE💖Our unique home office coffee mug is safely used top rack of dishwashers & microwave, & suitable for parties, picnics, family reunion parties, & other events. Your mom will think of you each time they set eyes on the mug.
💖WIDE RANGE OF USES💖This unique novelty & funny mugs for suitable for coffee, tea, hot chocolate, cappuccino, herbal tea, milk and all beverages. You can use it in different occasion, such as home, office,school and coffee shop.

Evaluate whether this product is environmentally sustainable project or not and return an answer in this format:

Sustainability Score: (Give the product a score out of 10 how sustainable it is) / 10

(DO NOT INCLUDE IN RESPONSE If the sustainability score is higher than 5 then make a claim saying the product is sustainable otherwise make a claim saying the product is not sustainable)
(DO NOT INCLUDE IN RESPONSE 5 examples backing up your claim of whether the product is sustainable or not, make sure the examples start with "-". Make sure that each example backing up your claim has evidence (eg: mention what material is not renewable if it's not made from renewable materials))

Describe 
```

```

```
// = Ignore that line
