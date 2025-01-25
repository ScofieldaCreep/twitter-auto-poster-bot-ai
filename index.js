// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt = `
**Prompt:**

You are a seasoned marketing copywriting expert. Based on the following provided “AlgoAce” product and web copy material, automatically generate a series of high-conversion marketing content across multiple channels. The objectives are:
1. Clearly highlight the products value, key features, and differentiation.
2. Combine user pain points with the products solutions to spark potential customer interest.
3. Use elements like free trial, exclusive experience, and user recommendations to drive immediate action (install, register, or subscribe).

  Please produce a tweet for the product.

  Below is a structured, step-by-step set of English marketing copy drafts for “AlgoAce,” covering the five required content types. Each type offers a concise yet powerful variation that can be fine-tuned as needed.

1. Short Generic Promotion Copy (50 English characters)

Draft (50 characters):

Boost coding interviews with AlgoAce: Try free now

2. Marketing Email Template

Subject: Ace Your Interviews with AlgoAce

Email Body:

1) Introduction & Pain Points
Hello [Name],
Are coding challenges and complex algorithms slowing you down or jeopardizing your interviews? Many AI tools limit your usage or interrupt you with pop-ups, making tough problems even harder to solve.

2) Product Highlights
	•	One-Click Access: Invoke AlgoAce on LeetCode, HackerRank, or anywhere else to parse questions and generate solutions instantly.
	•	Customizable Answers: Set your preferred programming language and style.
	•	High Accuracy: Built with a cutting-edge AI model, ensuring reliable results.
	•	Low-Profile Integration: Works invisibly in your browser, never disturbing your flow or interview process.

3) Benefits & User Testimonial
Current users—from Google to Microsoft—call AlgoAce “irreplaceable,” thanks to its unlimited usage and consistent performance. No more worrying about usage limits or awkward pop-ups during live interviews.

4) Free Trial & Upgrade Offer
Activate your 30-minute free trial to experience real-time coding assistance. After your trial, a single click upgrades you to full access, including advanced AI models and an extensive LeetCode question bank.

5) Call to Action
Take control of your coding interviews today:
	•	Start Free Trial Now
	•	Or View Subscription Plans

Best regards,
[Your Name / Company]

3. Promotional Ad Copy (30 English characters)

Draft (30 characters):

Ace coding interviews: AlgoAce

4. Key Advantages Summary

Unlimited Usage
Never run out of queries or worry about time caps.

High Accuracy
Top-tier AI model ensures reliable, high-quality solutions.

No Interference
Invisible in your browser—no intrusive pop-ups or logs.

Personalization
Fully customizable outputs: language, style, and context.

5. User Testimonials

	“AlgoAce saved me countless hours and boosted my interview performance—truly irreplaceable!”
—Sarah Lin, Senior Software Engineer at Google

Feel free to adjust tones, add visual elements, or refine the messages to suit your channels. Each draft is designed to spark interest and drive immediate action toward installing, registering, or subscribing to AlgoAce.

`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  // const text = "This is a test tweet from AlgoAce Bot";
  const textWithLink =
    text +
    "\n\n" +
    "Check it out: https://chromewebstore.google.com/detail/algo-ace/jgmbkilelblcdpcokkclihbedbmccdla";

  const textWithLinkAndHashTag =
    textWithLink +
    "\n\n" +
    "#AlgoAce #CodingChallenges #InterviewPrep\n" +
    "#AI #TechInterview #VO";
  console.log(textWithLinkAndHashTag);
  sendTweet(textWithLinkAndHashTag);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
