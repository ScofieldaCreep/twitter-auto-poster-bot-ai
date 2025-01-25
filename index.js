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
  const prompt =
    `
**Prompt:**

You are a seasoned marketing copywriting expert. Based on the following provided “AlgoAce” product and web copy material, automatically generate a series of high-conversion marketing content across multiple channels. The objectives are:
1. Clearly highlight the product’s value, key features, and differentiation.
2. Combine user pain points with the product’s solutions to spark potential customer interest.
3. Use elements like free trial, exclusive experience, and user recommendations to drive immediate action (install, register, or subscribe).

Please produce the following types of marketing content in **Chinese**:
1. **Short Generic Promotion Copy** (suitable for social media and mass messaging, concise and direct, with a strong CTA).
2. **Marketing Email Template** (focused on user pain points, product highlights, trial benefits, etc., guiding them to click and register).
3. **Promotional Ad Copy** (suitable for search/social media ads, emphasizing pain-point solutions and boosting appeal).
4. **Key Advantages Summary** (for brief display on a website or App, highlighting key selling points).
5. **User Testimonials** (quote existing user feedback, enhancing social proof and trust).

### “AlgoAce” Product Information

- **Product Name**: AlgoAce  
- **Functional Positioning**: AI-powered coding assistant that automatically parses algorithm or coding questions on web pages, providing detailed answers and sample code. It supports multiple programming languages and personalized thinking styles.  
- **Core Value**:  
  1. **One-click Access**: Directly invoke AI to parse questions and provide solutions on platforms like LeetCode, HackerRank, CoderPad, etc.  
  2. **Customizable Output**: Tailor answers according to user preferences (language, code style, context).  
  3. **Top-tier AI Model**: Employs a leading-edge model for high accuracy and practicality.  
  4. **Invisible Assistance**: Easy to operate, integrated into the browser without detection.  

- **Primary Selling Points**:  
  1. **Accurate and Low-profile**: No distractions, no pop-ups, no privacy issues, and won’t interfere with interviews.  
  2. **Unlimited Usage**: No usage or time limits, avoiding interruptions or worry about running out of quota.  
  3. **Fast Onboarding**: Offers a 30-minute free trial, then a one-click upgrade to unlock more features.  
  4. **Real Interview Experience**: Strives to mimic real interview scenarios; no errors or awkward prompts at inopportune times.  

- **Pain Points**:  
  1. Other similar tools have usage limits, annoying pop-ups, or recording prompts that affect interview performance or even cause loss of job opportunities.  
  2. Low-quality AI models waste time and fail to provide reliable solutions.  
  3. Complex usage environments and cumbersome configurations limit practical scenarios.  

- **Existing User Feedback**:  
  - Highlights that AlgoAce might “disappear” soon, but is currently free to try—urging potential users to install and use it ASAP.  
  - Experienced users from Google, Amazon, Microsoft, Apple, etc., call it an “irreplaceable” productivity tool.  
  - Saves considerable time, helps pass interviews, and earn higher salaries.  
  - Smooth and seamless experience with no complicated setup.  

- **Additional Information**:  
  1. About to launch an interview question bank and auto-save feature.  
  2. After the free trial, quickly upgrade to a paid version for advanced models and full LeetCode database access.  
  3. Multi-language output customization (with more comprehensive info in Chinese).  
  4. Emphasize a limited-time or exclusive opportunity to create urgency.  

- **Main CTAs**:  
  1. Start Free Trial  
  2. View Subscription Plans  
  3. Schedule Demo  

### Output Requirements

1. **Short Generic Promotion Copy**  
   - Word Count: 50–100 Chinese characters  
   - Tone: Concise, direct, strong promotional flair  
   - Purpose: For social media or broadcast messages, guiding users to click or install

2. **Marketing Email Template**  
   - Must include clear pain points, product highlights, user testimonials, and CTA  
   - Can be written in segments (e.g., opening greeting/pain point -> feature introduction -> benefits -> CTA)

3. **Promotional Ad Copy**  
   - Word Count: 30–50 Chinese characters  
   - Purpose: Quickly grab attention and interest, encouraging users to click

4. **Key Advantages Summary**  
   - Focus on: “Unlimited usage,” “High accuracy,” “No interference,” “Personalization”  
   - Used in website banners or small in-app pop-ups

5. **User Testimonials**  
   - Format: 1–2 quotes of real user praise + user name and company/position  
   - Purpose: Increase persuasiveness and credibility

> **Format of Your Output**:  
> 1. Output the draft for each type of marketing copy, with titles.  
> 2. Keep the structure clear and paragraphs logically organized.  
> 3. Use action-oriented language such as “Start now,” “Immediately,” “Don’t miss out,” etc.  
> 4. Each type of copy can have 1–2 style variations for selection and fine-tuning.

**Please use the above information and requirements to automatically generate marketing content suitable for multi-channel promotion.**
";`

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
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
