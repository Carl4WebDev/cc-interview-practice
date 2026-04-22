import { useEffect, useMemo, useRef, useState } from "react";

const levels = ["Beginner", "Intermediate", "Advanced"];

const practiceModes = ["General Mixed Assessment", "Sales Account Interview"];

const typingPrompts = {
  Beginner:
    "Thank you for calling our support team today. I understand your concern and I will do my best to assist you.",
  Intermediate:
    "I have reviewed your account and confirmed the issue. Please stay on the line while I check the next available solution for you.",
  Advanced:
    "I understand how frustrating repeated billing errors can be. Let me verify the transaction history, document the case properly, and explain the next steps clearly.",
};

const salesTypingPrompts = {
  Beginner:
    "Thank you for your interest in our service. Let me ask a few quick questions so I can recommend the best option for your needs today.",
  Intermediate:
    "I understand price matters, so let me briefly compare the available plans and explain which one gives you the strongest value.",
  Advanced:
    "Before I recommend a package, I want to understand your goals, current setup, budget, timeline, and the main result you want to achieve.",
};

const typingTargets = {
  Beginner: 20,
  Intermediate: 30,
  Advanced: 40,
};

const questionBank = [
  // BEGINNER — 18 QUESTIONS
  {
    id: 1,
    level: "Beginner",
    category: "Language Fluency",
    question: "Choose the correct sentence.",
    choices: [
      "She go to work every day.",
      "She goes to work every day.",
      "She going to work every day.",
      "She gone to work every day.",
    ],
    answer: "She goes to work every day.",
  },
  {
    id: 2,
    level: "Beginner",
    category: "Language Fluency",
    question: "Choose the most professional greeting.",
    choices: [
      "Yeah, what do you want?",
      "Support. Speak now.",
      "Good day. Thank you for calling. How may I assist you?",
      "Yes?",
    ],
    answer: "Good day. Thank you for calling. How may I assist you?",
  },
  {
    id: 3,
    level: "Beginner",
    category: "Language Fluency",
    question: "Choose the correct sentence.",
    choices: [
      "He don't like waiting on the line.",
      "He doesn't likes waiting on the line.",
      "He doesn't like waiting on the line.",
      "He not like waiting on the line.",
    ],
    answer: "He doesn't like waiting on the line.",
  },
  {
    id: 4,
    level: "Beginner",
    category: "Reading Comprehension",
    passage:
      "Customer email: I was charged twice for my monthly subscription. Please refund the extra charge and confirm once done.",
    question: "What is the customer's main concern?",
    choices: [
      "They want to cancel their subscription.",
      "They were charged twice and want a refund.",
      "They forgot their password.",
      "They want to upgrade their plan.",
    ],
    answer: "They were charged twice and want a refund.",
  },
  {
    id: 5,
    level: "Beginner",
    category: "Reading Comprehension",
    passage:
      "Message: Please update my email address from oldmail@example.com to newmail@example.com.",
    question: "What does the customer want?",
    choices: [
      "To reset a password.",
      "To change the email address on file.",
      "To delete the account.",
      "To add a new payment method.",
    ],
    answer: "To change the email address on file.",
  },
  {
    id: 6,
    level: "Beginner",
    category: "Customer Service",
    question:
      "A customer says, 'I am very frustrated. Nobody has helped me.' What is the best first response?",
    choices: [
      "Calm down first.",
      "That is not my fault.",
      "I understand your frustration, and I will do my best to help you today.",
      "You need to explain better.",
    ],
    answer:
      "I understand your frustration, and I will do my best to help you today.",
  },
  {
    id: 7,
    level: "Beginner",
    category: "Customer Service",
    question:
      "A customer says they have been waiting too long. What should you do first?",
    choices: [
      "Tell them waiting is normal.",
      "Acknowledge the delay and apologize.",
      "Ignore the complaint and continue.",
      "Ask them to call back later.",
    ],
    answer: "Acknowledge the delay and apologize.",
  },
  {
    id: 8,
    level: "Beginner",
    category: "Customer Service",
    question: "Which response shows empathy?",
    choices: [
      "That is your problem.",
      "I understand why this situation is upsetting.",
      "You should have read the policy.",
      "That happens all the time.",
    ],
    answer: "I understand why this situation is upsetting.",
  },
  {
    id: 9,
    level: "Beginner",
    category: "Problem Solving",
    question:
      "A customer cannot log in because they forgot their password. What should you do first?",
    choices: [
      "Ask them to create a new account.",
      "Guide them through the password reset process.",
      "Tell them to try again later.",
      "Transfer them to sales.",
    ],
    answer: "Guide them through the password reset process.",
  },
  {
    id: 10,
    level: "Beginner",
    category: "Problem Solving",
    question:
      "A customer says the wrong item was delivered. What is the first sensible step?",
    choices: [
      "Close the case.",
      "Verify the order details and item received.",
      "Tell them to keep it.",
      "Transfer to billing immediately.",
    ],
    answer: "Verify the order details and item received.",
  },
  {
    id: 11,
    level: "Beginner",
    category: "Problem Solving",
    question:
      "A customer cannot hear the call clearly. What is the best first step?",
    choices: [
      "Hang up.",
      "Check if the line is stable and ask if they can hear better after reconnecting.",
      "Ignore it.",
      "Transfer to sales.",
    ],
    answer:
      "Check if the line is stable and ask if they can hear better after reconnecting.",
  },
  {
    id: 12,
    level: "Beginner",
    category: "Technical Skills",
    question:
      "Which skill matters most when using multiple support tools during a call?",
    choices: [
      "Typing random notes quickly.",
      "Navigating tabs accurately while listening to the customer.",
      "Keeping only one tab open at all times.",
      "Ignoring internal tools and relying on memory.",
    ],
    answer:
      "Navigating tabs accurately while listening to the customer.",
  },
  {
    id: 13,
    level: "Beginner",
    category: "Technical Skills",
    question: "Why is it important to take notes during a customer interaction?",
    choices: [
      "To waste time.",
      "To remember key details and document the case properly.",
      "To avoid listening.",
      "To impress the customer.",
    ],
    answer: "To remember key details and document the case properly.",
  },
  {
    id: 14,
    level: "Beginner",
    category: "Cognitive Aptitude",
    question: "What number comes next: 2, 4, 6, 8, ?",
    choices: ["9", "10", "11", "12"],
    answer: "10",
  },
  {
    id: 15,
    level: "Beginner",
    category: "Cognitive Aptitude",
    question: "What is 15 + 9?",
    choices: ["21", "22", "23", "24"],
    answer: "24",
  },
  {
    id: 16,
    level: "Beginner",
    category: "Cognitive Aptitude",
    question: "Which word does not belong: phone, headset, keyboard, banana",
    choices: ["phone", "headset", "keyboard", "banana"],
    answer: "banana",
  },
  {
    id: 17,
    level: "Beginner",
    category: "Cognitive Aptitude",
    question: "What number comes next: 5, 10, 15, 20, ?",
    choices: ["22", "24", "25", "30"],
    answer: "25",
  },
  {
    id: 18,
    level: "Beginner",
    category: "Typing Speed",
    type: "typing_test",
    question: "Type the paragraph below as accurately as you can.",
    typingPrompt: typingPrompts.Beginner,
    duration: 60,
    answer: null,
  },

  // INTERMEDIATE — 18 QUESTIONS
  {
    id: 19,
    level: "Intermediate",
    category: "Language Fluency",
    question: "Choose the sentence with the best grammar and tone.",
    choices: [
      "I already forwarded your issue and kindly wait.",
      "Your issue was forwarded already kindly wait.",
      "I have already forwarded your concern, and I appreciate your patience.",
      "Your concern forwarded. Wait for updates.",
    ],
    answer:
      "I have already forwarded your concern, and I appreciate your patience.",
  },
  {
    id: 20,
    level: "Intermediate",
    category: "Language Fluency",
    question:
      "Choose the best rephrased sentence: 'We can't do that because policy says no.'",
    choices: [
      "We can't do that. That's policy.",
      "Policy says no, so no.",
      "At the moment, that option is not available under our current policy, but I can check the closest alternative for you.",
      "No, that's not allowed.",
    ],
    answer:
      "At the moment, that option is not available under our current policy, but I can check the closest alternative for you.",
  },
  {
    id: 21,
    level: "Intermediate",
    category: "Language Fluency",
    question: "Choose the sentence with the most natural professional tone.",
    choices: [
      "I will be checking this concern now.",
      "Allow me a moment while I review the details of your concern.",
      "Wait there.",
      "I am checking now okay.",
    ],
    answer: "Allow me a moment while I review the details of your concern.",
  },
  {
    id: 22,
    level: "Intermediate",
    category: "Reading Comprehension",
    passage:
      "Internal note: If the customer reports a delayed order, first verify the tracking number, then confirm the delivery address, and only then escalate to logistics if no movement appears after 48 hours.",
    question: "What should the agent do before escalating to logistics?",
    choices: [
      "Offer a refund immediately.",
      "Verify the tracking number and confirm the delivery address.",
      "Transfer the call to billing.",
      "Ask the customer to call back next week.",
    ],
    answer: "Verify the tracking number and confirm the delivery address.",
  },
  {
    id: 23,
    level: "Intermediate",
    category: "Reading Comprehension",
    passage:
      "Policy update: Agents may waive one late fee per year if the account is active, not past due for more than 30 days, and the customer requests the waiver politely during the current billing cycle.",
    question: "When can an agent waive a late fee?",
    choices: [
      "Any time the customer asks.",
      "Only if the customer is angry.",
      "If the account meets all listed conditions.",
      "Only after supervisor approval in every case.",
    ],
    answer: "If the account meets all listed conditions.",
  },
  {
    id: 24,
    level: "Intermediate",
    category: "Customer Service",
    question:
      "A customer is angry because their issue has not been resolved after two calls. What should you do first?",
    choices: [
      "Tell them to wait for another department.",
      "Acknowledge the frustration, review the account, and explain the next step clearly.",
      "End the call if they raise their voice.",
      "Promise an outcome you cannot confirm.",
    ],
    answer:
      "Acknowledge the frustration, review the account, and explain the next step clearly.",
  },
  {
    id: 25,
    level: "Intermediate",
    category: "Customer Service",
    question:
      "A customer says, 'This is the third time I called about this issue.' What is the strongest reply?",
    choices: [
      "That is not in my notes.",
      "I understand the repeated calls have been frustrating. Let me review this carefully and move it forward.",
      "You need to be more patient.",
      "Try again later.",
    ],
    answer:
      "I understand the repeated calls have been frustrating. Let me review this carefully and move it forward.",
  },
  {
    id: 26,
    level: "Intermediate",
    category: "Customer Service",
    question: "Which response balances empathy and control best?",
    choices: [
      "I already told you what to do.",
      "I understand your concern. Let me walk you through the next step.",
      "That is not covered.",
      "Please stop repeating yourself.",
    ],
    answer: "I understand your concern. Let me walk you through the next step.",
  },
  {
    id: 27,
    level: "Intermediate",
    category: "Problem Solving",
    question:
      "A customer says they were billed but did not receive a confirmation email. Which step makes the most sense first?",
    choices: [
      "Refund immediately.",
      "Verify the billing status and the email address on file.",
      "Tell them the system is wrong.",
      "Ask them to place another order.",
    ],
    answer: "Verify the billing status and the email address on file.",
  },
  {
    id: 28,
    level: "Intermediate",
    category: "Problem Solving",
    question:
      "An account shows a payment posted, but the service is still suspended. What should you check first?",
    choices: [
      "If the payment was applied to the correct account.",
      "If the customer sounds honest.",
      "If sales can upsell them.",
      "If they want a new password.",
    ],
    answer: "If the payment was applied to the correct account.",
  },
  {
    id: 29,
    level: "Intermediate",
    category: "Problem Solving",
    question:
      "The customer's order is marked delivered, but they say they never received it. What should you do first?",
    choices: [
      "Call them a liar.",
      "Review tracking details and confirm delivery location.",
      "Block the account.",
      "Issue store credit with no review.",
    ],
    answer: "Review tracking details and confirm delivery location.",
  },
  {
    id: 30,
    level: "Intermediate",
    category: "Technical Skills",
    question:
      "A customer says the app is not loading. What should you check first?",
    choices: [
      "Ask them to buy a new phone.",
      "Check for basic troubleshooting steps like connection, restart, and app version.",
      "Close the ticket immediately.",
      "Escalate without any checks.",
    ],
    answer:
      "Check for basic troubleshooting steps like connection, restart, and app version.",
  },
  {
    id: 31,
    level: "Intermediate",
    category: "Technical Skills",
    question:
      "A customer says they cannot receive OTP codes. What is the strongest first check?",
    choices: [
      "Ask them to create another account.",
      "Verify the registered number and check for network or device issues.",
      "Transfer to sales.",
      "Delete the app.",
    ],
    answer:
      "Verify the registered number and check for network or device issues.",
  },
  {
    id: 32,
    level: "Intermediate",
    category: "Cognitive Aptitude",
    question:
      "If 5 machines make 5 parts in 5 minutes, how many parts can 100 machines make in 5 minutes?",
    choices: ["20", "25", "100", "500"],
    answer: "100",
  },
  {
    id: 33,
    level: "Intermediate",
    category: "Cognitive Aptitude",
    question: "What number comes next: 3, 6, 12, 24, ?",
    choices: ["30", "36", "48", "54"],
    answer: "48",
  },
  {
    id: 34,
    level: "Intermediate",
    category: "Cognitive Aptitude",
    question:
      "If all calls are interactions and some interactions are complaints, which statement is definitely true?",
    choices: [
      "All complaints are calls.",
      "Some calls are complaints.",
      "Calls are interactions.",
      "No complaints are interactions.",
    ],
    answer: "Calls are interactions.",
  },
  {
    id: 35,
    level: "Intermediate",
    category: "Cognitive Aptitude",
    question:
      "A task takes 12 minutes. How long will 5 tasks take if done one after another?",
    choices: ["48", "50", "60", "72"],
    answer: "60",
  },
  {
    id: 36,
    level: "Intermediate",
    category: "Typing Speed",
    type: "typing_test",
    question: "Type the paragraph below as accurately as you can.",
    typingPrompt: typingPrompts.Intermediate,
    duration: 60,
    answer: null,
  },

  // ADVANCED — 18 QUESTIONS
  {
    id: 37,
    level: "Advanced",
    category: "Language Fluency",
    question: "Choose the most professional closing statement.",
    choices: [
      "Okay done bye.",
      "That is all. End call.",
      "Thank you for your time today. Please let us know if you need any further assistance.",
      "You can hang up now.",
    ],
    answer:
      "Thank you for your time today. Please let us know if you need any further assistance.",
  },
  {
    id: 38,
    level: "Advanced",
    category: "Language Fluency",
    question:
      "Which response sounds most natural and confident under pressure?",
    choices: [
      "I don't know yet, so just wait.",
      "Let me check that carefully so I can give you the correct information.",
      "Maybe it is your connection.",
      "That is not my area.",
    ],
    answer:
      "Let me check that carefully so I can give you the correct information.",
  },
  {
    id: 39,
    level: "Advanced",
    category: "Language Fluency",
    question: "Choose the best sentence for de-escalation.",
    choices: [
      "You need to calm down first.",
      "I understand this is frustrating, and I want to help resolve it with you.",
      "If you keep shouting I cannot help.",
      "You are not listening to me.",
    ],
    answer:
      "I understand this is frustrating, and I want to help resolve it with you.",
  },
  {
    id: 40,
    level: "Advanced",
    category: "Reading Comprehension",
    passage:
      "Script update: Agents may process a replacement only if the item is defective within 7 days of delivery and the customer can provide either a photo or a video. If the item was damaged after delivery, advise the customer to file a separate damage claim.",
    question: "When is a replacement allowed?",
    choices: [
      "Any time within 30 days.",
      "If the customer is upset enough.",
      "If the item is defective within 7 days and proof is provided.",
      "Only if a supervisor is unavailable.",
    ],
    answer: "If the item is defective within 7 days and proof is provided.",
  },
  {
    id: 41,
    level: "Advanced",
    category: "Reading Comprehension",
    passage:
      "Escalation guide: If billing, delivery, and account access issues are reported in the same interaction, the agent must first secure account access if blocked, then verify billing exposure, and finally document the delivery concern for the logistics team.",
    question: "What should the agent prioritize first?",
    choices: [
      "Delivery concern.",
      "Billing refund.",
      "Securing account access.",
      "Closing the ticket.",
    ],
    answer: "Securing account access.",
  },
  {
    id: 42,
    level: "Advanced",
    category: "Customer Service",
    question:
      "A customer demands an exception to company policy that you are not allowed to give. What is the best response?",
    choices: [
      "Break the policy to avoid conflict.",
      "Refuse without explanation.",
      "Acknowledge the concern, explain the policy clearly, and offer the closest available solution.",
      "Transfer immediately without checking alternatives.",
    ],
    answer:
      "Acknowledge the concern, explain the policy clearly, and offer the closest available solution.",
  },
  {
    id: 43,
    level: "Advanced",
    category: "Customer Service",
    question:
      "A customer keeps interrupting and raising their voice. What is the best approach?",
    choices: [
      "Match their tone so they listen.",
      "Stay calm, acknowledge the frustration, and guide the call back to the issue.",
      "End the call immediately.",
      "Ignore everything they say.",
    ],
    answer:
      "Stay calm, acknowledge the frustration, and guide the call back to the issue.",
  },
  {
    id: 44,
    level: "Advanced",
    category: "Customer Service",
    question:
      "You cannot solve the issue on the first call. What should you do before ending the interaction?",
    choices: [
      "Say nothing until the customer follows up.",
      "Set clear expectations, summarize next steps, and explain any follow-up timeline.",
      "Blame another team.",
      "Promise it will be fixed today no matter what.",
    ],
    answer:
      "Set clear expectations, summarize next steps, and explain any follow-up timeline.",
  },
  {
    id: 45,
    level: "Advanced",
    category: "Problem Solving",
    question:
      "A customer reports three issues at once: delayed delivery, wrong billing address, and no SMS updates. What is the strongest approach?",
    choices: [
      "Handle whichever problem sounds easiest.",
      "Tell the customer to call back for each issue separately.",
      "Clarify each issue, prioritize the time-sensitive one, and walk through them in order.",
      "Transfer the call without notes.",
    ],
    answer:
      "Clarify each issue, prioritize the time-sensitive one, and walk through them in order.",
  },
  {
    id: 46,
    level: "Advanced",
    category: "Problem Solving",
    question:
      "A system shows two possible causes of failure and both require different teams. What should you do first?",
    choices: [
      "Escalate to both teams with no notes.",
      "Gather enough details to narrow the root cause before escalating.",
      "Tell the customer to wait one week.",
      "Guess which team is responsible.",
    ],
    answer:
      "Gather enough details to narrow the root cause before escalating.",
  },
  {
    id: 47,
    level: "Advanced",
    category: "Problem Solving",
    question:
      "Which problem-solving habit is strongest in support work?",
    choices: [
      "Assuming patterns without checking.",
      "Rushing to close tickets.",
      "Verifying facts before choosing an action.",
      "Escalating every issue instantly.",
    ],
    answer: "Verifying facts before choosing an action.",
  },
  {
    id: 48,
    level: "Advanced",
    category: "Technical Skills",
    question:
      "You need to update notes, check billing history, and confirm delivery details during one call. What is the key skill being tested?",
    choices: [
      "Multitasking with accuracy.",
      "Guessing quickly.",
      "Talking continuously without pausing.",
      "Avoiding internal systems.",
    ],
    answer: "Multitasking with accuracy.",
  },
  {
    id: 49,
    level: "Advanced",
    category: "Technical Skills",
    question:
      "Which behavior best shows strong technical support discipline?",
    choices: [
      "Escalating every issue immediately.",
      "Following troubleshooting steps and documenting outcomes clearly.",
      "Skipping verification if the customer sounds urgent.",
      "Memorizing everything instead of using tools.",
    ],
    answer:
      "Following troubleshooting steps and documenting outcomes clearly.",
  },
  {
    id: 50,
    level: "Advanced",
    category: "Cognitive Aptitude",
    question:
      "A store increases a price by 20% then reduces the new price by 20%. Compared with the original price, the final price is:",
    choices: ["The same", "4% lower", "4% higher", "8% lower"],
    answer: "4% lower",
  },
  {
    id: 51,
    level: "Advanced",
    category: "Cognitive Aptitude",
    question:
      "Three consecutive integers total 72. What is the largest integer?",
    choices: ["23", "24", "25", "26"],
    answer: "25",
  },
  {
    id: 52,
    level: "Advanced",
    category: "Cognitive Aptitude",
    question: "What number comes next: 2, 6, 12, 20, 30, ?",
    choices: ["36", "40", "42", "44"],
    answer: "42",
  },
  {
    id: 53,
    level: "Advanced",
    category: "Cognitive Aptitude",
    question:
      "If every Zim is either a Wex or a Tov, and no Wex is a Tov, which statement must be true?",
    choices: [
      "Every Zim is both a Wex and a Tov",
      "No Zim is a Wex",
      "No Wex is a Tov",
      "Every Tov is a Zim",
    ],
    answer: "No Wex is a Tov",
  },
  {
    id: 54,
    level: "Advanced",
    category: "Typing Speed",
    type: "typing_test",
    question: "Type the paragraph below as accurately as you can.",
    typingPrompt: typingPrompts.Advanced,
    duration: 60,
    answer: null,
  },
];

const salesQuestionBank = [
  // BEGINNER — 18 QUESTIONS
  {
    id: 1001,
    level: "Beginner",
    category: "Sales Opening",
    question: "What is the best opening line in a sales account call?",
    choices: [
      "Do you want to buy or not?",
      "Good day. Thank you for your interest. May I ask a few questions to understand your needs better?",
      "We have many products. Pick one.",
      "Let me tell you everything we sell right away.",
    ],
    answer:
      "Good day. Thank you for your interest. May I ask a few questions to understand your needs better?",
  },
  {
    id: 1002,
    level: "Beginner",
    category: "Sales Opening",
    question: "What should a sales agent do first before offering a product?",
    choices: [
      "Push the most expensive plan immediately.",
      "Understand the customer's needs first.",
      "Ask for payment details right away.",
      "Read the script without listening.",
    ],
    answer: "Understand the customer's needs first.",
  },
  {
    id: 1003,
    level: "Beginner",
    category: "Needs Analysis",
    question: "Which is the best discovery question?",
    choices: [
      "Why are you wasting time?",
      "What are you currently looking for in a service like this?",
      "Can you just buy today?",
      "Do you even need this?",
    ],
    answer: "What are you currently looking for in a service like this?",
  },
  {
    id: 1004,
    level: "Beginner",
    category: "Needs Analysis",
    question: "Why is asking questions important in sales?",
    choices: [
      "To make the call longer.",
      "To understand what matters to the customer.",
      "To avoid recommending anything.",
      "To sound busy.",
    ],
    answer: "To understand what matters to the customer.",
  },
  {
    id: 1005,
    level: "Beginner",
    category: "Product Fit",
    question: "What is the best way to present a product?",
    choices: [
      "List random features only.",
      "Connect the product benefits to the customer's needs.",
      "Talk only about price.",
      "Rush the explanation.",
    ],
    answer: "Connect the product benefits to the customer's needs.",
  },
  {
    id: 1006,
    level: "Beginner",
    category: "Product Fit",
    question: "A customer says they need something affordable. What should you do?",
    choices: [
      "Push the premium plan anyway.",
      "Offer the plan that best matches their budget and needs.",
      "End the call.",
      "Ignore the budget concern.",
    ],
    answer: "Offer the plan that best matches their budget and needs.",
  },
  {
    id: 1007,
    level: "Beginner",
    category: "Handling Objections",
    question: "A customer says, 'It's too expensive.' What is the best first response?",
    choices: [
      "Then don't buy it.",
      "I understand price matters. May I show you what value this plan gives for that cost?",
      "You're wrong.",
      "Price is final. Next.",
    ],
    answer:
      "I understand price matters. May I show you what value this plan gives for that cost?",
  },
  {
    id: 1008,
    level: "Beginner",
    category: "Handling Objections",
    question: "What is the wrong way to respond to objections?",
    choices: [
      "Acknowledge the concern.",
      "Clarify the concern.",
      "Argue with the customer.",
      "Offer relevant value.",
    ],
    answer: "Argue with the customer.",
  },
  {
    id: 1009,
    level: "Beginner",
    category: "Communication",
    question: "Which tone is best for a sales interview answer?",
    choices: [
      "Aggressive and pushy.",
      "Calm, confident, and helpful.",
      "Lazy and casual.",
      "Robotic and cold.",
    ],
    answer: "Calm, confident, and helpful.",
  },
  {
    id: 1010,
    level: "Beginner",
    category: "Communication",
    question: "Which phrase sounds more consultative?",
    choices: [
      "You need this now.",
      "Let me recommend the option that fits your needs best.",
      "Buy this one.",
      "This is the only choice.",
    ],
    answer: "Let me recommend the option that fits your needs best.",
  },
  {
    id: 1011,
    level: "Beginner",
    category: "Closing",
    question: "When should a sales agent try to close?",
    choices: [
      "Before understanding the customer's needs.",
      "After explaining value and confirming fit.",
      "Immediately after greeting.",
      "Only after the customer hangs up.",
    ],
    answer: "After explaining value and confirming fit.",
  },
  {
    id: 1012,
    level: "Beginner",
    category: "Closing",
    question: "Which is the best simple closing question?",
    choices: [
      "So are you ready to proceed with the option that best fits what you shared?",
      "Why haven't you bought yet?",
      "Can you pay now yes or no?",
      "Let's just end the call.",
    ],
    answer:
      "So are you ready to proceed with the option that best fits what you shared?",
  },
  {
    id: 1013,
    level: "Beginner",
    category: "Sales Judgment",
    question: "What matters more in sales than talking too much?",
    choices: [
      "Listening well.",
      "Interrupting fast.",
      "Reading the full script only.",
      "Forcing urgency.",
    ],
    answer: "Listening well.",
  },
  {
    id: 1014,
    level: "Beginner",
    category: "Sales Judgment",
    question: "A customer sounds unsure. What should you do?",
    choices: [
      "Pressure them harder.",
      "Ask questions and reduce uncertainty.",
      "End the call immediately.",
      "Ignore their hesitation.",
    ],
    answer: "Ask questions and reduce uncertainty.",
  },
  {
    id: 1015,
    level: "Beginner",
    category: "Reading Comprehension",
    passage:
      "Customer note: I need a plan for a small team, but my budget is limited. I care most about reliability and monthly flexibility.",
    question: "What matters most to the customer?",
    choices: [
      "Luxury features",
      "Low budget and flexibility",
      "Fast cancellation only",
      "Annual lock-in",
    ],
    answer: "Low budget and flexibility",
  },
  {
    id: 1016,
    level: "Beginner",
    category: "Reading Comprehension",
    passage:
      "Lead note: Prospect wants to compare two packages before deciding and asked for the differences in monthly cost and included support.",
    question: "What should the agent explain clearly?",
    choices: [
      "Only the company history",
      "Monthly cost and included support",
      "The CEO's background",
      "Random extra products",
    ],
    answer: "Monthly cost and included support",
  },
  {
    id: 1017,
    level: "Beginner",
    category: "Cognitive Aptitude",
    question: "If one package costs 500 and another costs 700, what is the price difference?",
    choices: ["100", "150", "200", "250"],
    answer: "200",
  },
  {
    id: 1018,
    level: "Beginner",
    category: "Typing Speed",
    type: "typing_test",
    question: "Type the paragraph below as accurately as you can.",
    typingPrompt: salesTypingPrompts.Beginner,
    duration: 60,
    answer: null,
  },

  // INTERMEDIATE — 18 QUESTIONS
  {
    id: 1019,
    level: "Intermediate",
    category: "Sales Opening",
    question: "What is the strongest purpose of a sales opening?",
    choices: [
      "To start closing immediately.",
      "To build rapport and qualify the customer.",
      "To overwhelm the customer with features.",
      "To avoid asking questions.",
    ],
    answer: "To build rapport and qualify the customer.",
  },
  {
    id: 1020,
    level: "Intermediate",
    category: "Needs Analysis",
    question: "Which question best uncovers buying motivation?",
    choices: [
      "What made you start looking for this solution now?",
      "Can you buy today right now?",
      "Why not just keep your old provider?",
      "Are you done asking questions?",
    ],
    answer: "What made you start looking for this solution now?",
  },
  {
    id: 1021,
    level: "Intermediate",
    category: "Needs Analysis",
    question: "What should a sales agent identify before recommending a plan?",
    choices: [
      "Need, budget, and timeline",
      "Only the customer's name",
      "Only the script",
      "Only the cheapest option",
    ],
    answer: "Need, budget, and timeline",
  },
  {
    id: 1022,
    level: "Intermediate",
    category: "Product Fit",
    question: "What is the strongest way to explain value?",
    choices: [
      "Talk only about features.",
      "Link benefits to the customer's goals.",
      "Repeat the price many times.",
      "Say it is the best because you said so.",
    ],
    answer: "Link benefits to the customer's goals.",
  },
  {
    id: 1023,
    level: "Intermediate",
    category: "Product Fit",
    question: "A customer wants reliability more than low price. What should you do?",
    choices: [
      "Push the cheapest option only.",
      "Recommend the plan that best addresses reliability.",
      "Avoid discussing support coverage.",
      "Tell them price is all that matters.",
    ],
    answer: "Recommend the plan that best addresses reliability.",
  },
  {
    id: 1024,
    level: "Intermediate",
    category: "Handling Objections",
    question: "A customer says, 'I need to think about it.' What is the best reply?",
    choices: [
      "Okay bye.",
      "I understand. Before we end, may I ask what part you’d like to think through so I can help clearly?",
      "You are wasting time.",
      "Then this offer is gone forever.",
    ],
    answer:
      "I understand. Before we end, may I ask what part you’d like to think through so I can help clearly?",
  },
  {
    id: 1025,
    level: "Intermediate",
    category: "Handling Objections",
    question: "What is usually the best first move when an objection appears?",
    choices: [
      "Counter aggressively.",
      "Acknowledge and clarify it.",
      "Ignore it and continue the pitch.",
      "End the call.",
    ],
    answer: "Acknowledge and clarify it.",
  },
  {
    id: 1026,
    level: "Intermediate",
    category: "Closing",
    question: "What is an effective trial close?",
    choices: [
      "So if this plan meets your budget and support needs, would you be open to moving forward?",
      "Buy now or no?",
      "You should just take it.",
      "This is your last chance today.",
    ],
    answer:
      "So if this plan meets your budget and support needs, would you be open to moving forward?",
  },
  {
    id: 1027,
    level: "Intermediate",
    category: "Closing",
    question: "When a customer asks for time, what should you do?",
    choices: [
      "Pressure them repeatedly.",
      "Set a clear follow-up and summarize value.",
      "Delete the lead.",
      "Argue until they agree.",
    ],
    answer: "Set a clear follow-up and summarize value.",
  },
  {
    id: 1028,
    level: "Intermediate",
    category: "Communication",
    question: "Which phrase sounds most consultative?",
    choices: [
      "Here’s the plan that best matches the priorities you mentioned.",
      "This is the one I want you to buy.",
      "Just trust me.",
      "This is expensive for a reason.",
    ],
    answer: "Here’s the plan that best matches the priorities you mentioned.",
  },
  {
    id: 1029,
    level: "Intermediate",
    category: "Communication",
    question: "In sales interviews, what does confidence sound like?",
    choices: [
      "Talking non-stop.",
      "Speaking clearly with control and purpose.",
      "Interrupting often.",
      "Acting superior.",
    ],
    answer: "Speaking clearly with control and purpose.",
  },
  {
    id: 1030,
    level: "Intermediate",
    category: "Reading Comprehension",
    passage:
      "Prospect email: We are considering switching providers because our current setup is unreliable during peak hours. Budget matters, but we are losing time every week because of outages.",
    question: "What is the deeper buying reason?",
    choices: [
      "They want random discounts only.",
      "They mainly want better reliability because outages are hurting operations.",
      "They want a new logo.",
      "They do not care about service quality.",
    ],
    answer:
      "They mainly want better reliability because outages are hurting operations.",
  },
  {
    id: 1031,
    level: "Intermediate",
    category: "Reading Comprehension",
    passage:
      "Lead note: Customer handles a team of 8, wants monthly billing, asked if onboarding support is included, and said they cannot decide until next Friday.",
    question: "Which factor is part of the customer's timeline?",
    choices: [
      "Cannot decide until next Friday",
      "Wants better branding",
      "Needs office chairs",
      "Asked about social media",
    ],
    answer: "Cannot decide until next Friday",
  },
  {
    id: 1032,
    level: "Intermediate",
    category: "Sales Judgment",
    question: "What hurts trust fastest in a sales call?",
    choices: [
      "Listening too carefully.",
      "Promising what you cannot guarantee.",
      "Clarifying concerns.",
      "Summarizing next steps.",
    ],
    answer: "Promising what you cannot guarantee.",
  },
  {
    id: 1033,
    level: "Intermediate",
    category: "Sales Judgment",
    question: "What should a strong sales agent do after identifying a customer's concern?",
    choices: [
      "Ignore it and keep pitching.",
      "Address it directly with relevant value.",
      "Move to payment instantly.",
      "Transfer the customer.",
    ],
    answer: "Address it directly with relevant value.",
  },
  {
    id: 1034,
    level: "Intermediate",
    category: "Cognitive Aptitude",
    question: "A package costs 1,200 monthly. A discount lowers it by 200. What is the new monthly cost?",
    choices: ["900", "1000", "1100", "1200"],
    answer: "1000",
  },
  {
    id: 1035,
    level: "Intermediate",
    category: "Cognitive Aptitude",
    question: "If 3 customers out of 12 converted, what fraction converted?",
    choices: ["1/2", "1/3", "1/4", "1/5"],
    answer: "1/4",
  },
  {
    id: 1036,
    level: "Intermediate",
    category: "Typing Speed",
    type: "typing_test",
    question: "Type the paragraph below as accurately as you can.",
    typingPrompt: salesTypingPrompts.Intermediate,
    duration: 60,
    answer: null,
  },

  // ADVANCED — 18 QUESTIONS
  {
    id: 1037,
    level: "Advanced",
    category: "Sales Opening",
    question: "What is the strongest advanced opening approach?",
    choices: [
      "Pitch immediately.",
      "Set the agenda, qualify the need, and control the conversation professionally.",
      "Read every feature at once.",
      "Ask for payment first.",
    ],
    answer:
      "Set the agenda, qualify the need, and control the conversation professionally.",
  },
  {
    id: 1038,
    level: "Advanced",
    category: "Needs Analysis",
    question: "What separates average discovery from strong discovery?",
    choices: [
      "Asking more random questions.",
      "Finding pain points, urgency, decision process, and desired outcome.",
      "Talking longer than the customer.",
      "Only discussing price.",
    ],
    answer:
      "Finding pain points, urgency, decision process, and desired outcome.",
  },
  {
    id: 1039,
    level: "Advanced",
    category: "Needs Analysis",
    question: "Why is the decision process important in sales?",
    choices: [
      "To waste time.",
      "To understand who decides and when movement is realistic.",
      "To pressure the customer harder.",
      "To avoid follow-up.",
    ],
    answer:
      "To understand who decides and when movement is realistic.",
  },
  {
    id: 1040,
    level: "Advanced",
    category: "Handling Objections",
    question: "A prospect says, 'Your competitor is cheaper.' What is the strongest response?",
    choices: [
      "Then go with them.",
      "I understand price matters. May I show you the difference in support, results, and long-term value before you decide?",
      "Our product is just better.",
      "Price should not matter.",
    ],
    answer:
      "I understand price matters. May I show you the difference in support, results, and long-term value before you decide?",
  },
  {
    id: 1041,
    level: "Advanced",
    category: "Handling Objections",
    question: "What is the goal when handling a serious objection?",
    choices: [
      "Win the argument.",
      "Reduce resistance and move the customer toward clarity.",
      "Make the customer feel wrong.",
      "End the call fast.",
    ],
    answer: "Reduce resistance and move the customer toward clarity.",
  },
  {
    id: 1042,
    level: "Advanced",
    category: "Closing",
    question: "What is the strongest advanced close?",
    choices: [
      "So based on your priorities, this option seems to fit best. Would you like to move forward now or would a scheduled follow-up tomorrow work better?",
      "Buy now.",
      "This is your only chance.",
      "Say yes already.",
    ],
    answer:
      "So based on your priorities, this option seems to fit best. Would you like to move forward now or would a scheduled follow-up tomorrow work better?",
  },
  {
    id: 1043,
    level: "Advanced",
    category: "Closing",
    question: "Why is summarizing value before the close effective?",
    choices: [
      "It reminds the customer why the recommendation fits.",
      "It makes the call longer for no reason.",
      "It confuses the customer.",
      "It replaces qualification.",
    ],
    answer: "It reminds the customer why the recommendation fits.",
  },
  {
    id: 1044,
    level: "Advanced",
    category: "Communication",
    question: "Which answer sounds strongest in a sales interview?",
    choices: [
      "I like talking a lot.",
      "I focus on understanding customer needs, building trust, and guiding the conversation toward the right solution.",
      "I just push until they buy.",
      "I prefer not to ask too many questions.",
    ],
    answer:
      "I focus on understanding customer needs, building trust, and guiding the conversation toward the right solution.",
  },
  {
    id: 1045,
    level: "Advanced",
    category: "Communication",
    question: "What tone works best in high-value sales conversations?",
    choices: [
      "Pushy and dominant.",
      "Calm, credible, and confident.",
      "Passive and unsure.",
      "Fast and careless.",
    ],
    answer: "Calm, credible, and confident.",
  },
  {
    id: 1046,
    level: "Advanced",
    category: "Reading Comprehension",
    passage:
      "Prospect note: We currently use a cheaper provider, but support is slow and downtime affects our client deliveries. I need something dependable, but I also need to justify the cost to my manager.",
    question: "What must the agent do well here?",
    choices: [
      "Push the cheapest option.",
      "Justify value in terms of reliability and business impact.",
      "Avoid discussing cost.",
      "Skip qualification.",
    ],
    answer: "Justify value in terms of reliability and business impact.",
  },
  {
    id: 1047,
    level: "Advanced",
    category: "Reading Comprehension",
    passage:
      "Lead summary: Prospect likes the product, but said they need approval from finance and wants a final comparison sheet by Thursday. They are interested if onboarding time stays under one week.",
    question: "What is the strongest next step?",
    choices: [
      "Push for payment immediately.",
      "Send the comparison sheet, address onboarding timing, and align follow-up with the approval process.",
      "Drop the lead.",
      "Ignore finance and keep pitching.",
    ],
    answer:
      "Send the comparison sheet, address onboarding timing, and align follow-up with the approval process.",
  },
  {
    id: 1048,
    level: "Advanced",
    category: "Sales Judgment",
    question: "What is a strong sign of consultative selling?",
    choices: [
      "The agent dominates the whole call.",
      "The recommendation clearly reflects the customer's goals and concerns.",
      "The cheapest plan is always offered.",
      "Every objection is ignored.",
    ],
    answer:
      "The recommendation clearly reflects the customer's goals and concerns.",
  },
  {
    id: 1049,
    level: "Advanced",
    category: "Sales Judgment",
    question: "What usually kills momentum in a qualified sales conversation?",
    choices: [
      "Clear next steps.",
      "Weak control and vague follow-up.",
      "Summarized value.",
      "Good qualification.",
    ],
    answer: "Weak control and vague follow-up.",
  },
  {
    id: 1050,
    level: "Advanced",
    category: "Objection Strategy",
    question: "A customer says, 'Send me details, I’ll check later.' What is the smartest move?",
    choices: [
      "Say okay and end the call.",
      "Send the details and secure a specific follow-up time.",
      "Pressure them for payment immediately.",
      "Ignore the request.",
    ],
    answer: "Send the details and secure a specific follow-up time.",
  },
  {
    id: 1051,
    level: "Advanced",
    category: "Objection Strategy",
    question: "What is the deeper risk of leaving an objection vague?",
    choices: [
      "Nothing important.",
      "You may solve the wrong problem and lose the sale.",
      "The call gets shorter.",
      "It improves trust automatically.",
    ],
    answer: "You may solve the wrong problem and lose the sale.",
  },
  {
    id: 1052,
    level: "Advanced",
    category: "Cognitive Aptitude",
    question: "A plan costs 2,400 per year or 250 per month. Which option is cheaper over 12 months?",
    choices: ["Yearly", "Monthly", "They are equal", "Not enough data"],
    answer: "Yearly",
  },
  {
    id: 1053,
    level: "Advanced",
    category: "Cognitive Aptitude",
    question: "If a team closes 6 deals out of 20 qualified leads, what is the conversion rate?",
    choices: ["20%", "25%", "30%", "35%"],
    answer: "30%",
  },
  {
    id: 1054,
    level: "Advanced",
    category: "Typing Speed",
    type: "typing_test",
    question: "Type the paragraph below as accurately as you can.",
    typingPrompt: salesTypingPrompts.Advanced,
    duration: 60,
    answer: null,
  },
];

const colors = {
  pageBg: "#020617",
  panelBg: "#0f172a",
  cardBg: "#1e293b",
  border: "#334155",
  textMuted: "#94a3b8",
  white: "#ffffff",
  darkText: "#020617",
};

function getTypingTarget(level) {
  return typingTargets[level] || 20;
}

function computeTypingResult(prompt, typed, elapsedSeconds) {
  const safeElapsed = Math.max(1, elapsedSeconds);
  let correctChars = 0;

  for (let i = 0; i < typed.length; i += 1) {
    if (typed[i] === prompt[i]) correctChars += 1;
  }

  const accuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 0;

  const minutes = safeElapsed / 60;
  const wpm = minutes > 0 ? Math.round((typed.trim().length / 5) / minutes) : 0;

  return {
    correctChars,
    accuracy,
    wpm,
  };
}

function buttonStyle(isPrimary = false, disabled = false) {
  return {
    padding: "12px 18px",
    borderRadius: "12px",
    border: isPrimary ? "none" : `1px solid ${colors.border}`,
    backgroundColor: isPrimary ? colors.white : colors.cardBg,
    color: isPrimary ? colors.darkText : colors.white,
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 600,
    opacity: disabled ? 0.5 : 1,
  };
}

function cardStyle() {
  return {
    backgroundColor: colors.panelBg,
    border: `1px solid ${colors.border}`,
    borderRadius: "24px",
    padding: "28px",
  };
}

function smallCardStyle() {
  return {
    backgroundColor: colors.cardBg,
    borderRadius: "16px",
    padding: "16px",
  };
}

function TypingTest({ question, savedValue, onSave }) {
  const [input, setInput] = useState(savedValue?.text || "");
  const [timeLeft, setTimeLeft] = useState(savedValue?.timeLeft ?? question.duration);
  const [started, setStarted] = useState(Boolean(savedValue?.started));
  const [finished, setFinished] = useState(Boolean(savedValue?.finished));
  const timerRef = useRef(null);

  useEffect(() => {
    if (!started || finished) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, finished]);

  useEffect(() => {
    if (timeLeft === 0 && started && !finished) {
      const result = computeTypingResult(question.typingPrompt, input, question.duration);
      const payload = {
        type: "typing_result",
        text: input,
        timeLeft: 0,
        started: true,
        finished: true,
        ...result,
      };
      setFinished(true);
      onSave(payload);
    }
  }, [timeLeft, started, finished, input, question, onSave]);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    onSave({
      type: "typing_result",
      text: input,
      timeLeft,
      started: true,
      finished: false,
      wpm: 0,
      accuracy: 0,
      correctChars: 0,
    });
  };

  const handleChange = (value) => {
    if (!started || finished) return;
    setInput(value);

    const elapsed = question.duration - timeLeft;
    const live = computeTypingResult(question.typingPrompt, value, elapsed);

    onSave({
      type: "typing_result",
      text: value,
      timeLeft,
      started: true,
      finished: false,
      ...live,
    });
  };

  const liveStats = computeTypingResult(
    question.typingPrompt,
    input,
    Math.max(1, question.duration - timeLeft),
  );

  return (
    <div className="typing-test-wrap">
      <div className="passage-box">{question.typingPrompt}</div>

      <div className="typing-stats-grid">
        <div className="stat-card">
          <div className="muted-label">Timer</div>
          <div className="stat-value">{timeLeft}s</div>
        </div>

        <div className="stat-card">
          <div className="muted-label">Live WPM</div>
          <div className="stat-value">{liveStats.wpm}</div>
        </div>

        <div className="stat-card">
          <div className="muted-label">Accuracy</div>
          <div className="stat-value">{liveStats.accuracy}%</div>
        </div>

        <div className="stat-card">
          <div className="muted-label">Target</div>
          <div className="stat-value">{getTypingTarget(question.level)}+</div>
        </div>
      </div>

      <div className="typing-actions">
        <button
          onClick={handleStart}
          disabled={started}
          style={buttonStyle(true, started)}
        >
          {started ? "Typing Started" : "Start Typing Test"}
        </button>
      </div>

      <textarea
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        disabled={!started || finished}
        placeholder="Start typing here..."
        className="typing-textarea"
      />

      {finished && (
        <div className="typing-result-box">
          <div className="typing-result-title">Typing Result</div>
          <div className="typing-result-line">
            WPM: <strong>{savedValue?.wpm ?? liveStats.wpm}</strong>
          </div>
          <div className="typing-result-line">
            Accuracy: <strong>{savedValue?.accuracy ?? liveStats.accuracy}%</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [selectedMode, setSelectedMode] = useState(practiceModes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

const filteredQuestions = useMemo(() => {
  const activeBank =
    selectedMode === "Sales Account Interview" ? salesQuestionBank : questionBank;

  return activeBank.filter((q) => q.level === selectedLevel);
}, [selectedLevel, selectedMode]);

  const currentQuestion = filteredQuestions[currentIndex];

  const correctCount = filteredQuestions.filter((q) => {
    const saved = answers[q.id];

    if (q.type === "typing_test") {
      return saved?.finished && saved?.wpm >= getTypingTarget(selectedLevel) && saved?.accuracy >= 85;
    }

    return saved === q.answer;
  }).length;

  const attemptedCount = filteredQuestions.filter((q) => {
    const saved = answers[q.id];
    if (q.type === "typing_test") return Boolean(saved?.finished);
    return saved !== undefined;
  }).length;

  const resetPractice = () => {
    setCurrentIndex(0);
    setAnswers({});
  };

const startPractice = () => {
  resetPractice();
  setScreen("practice");
};

  const goHome = () => {
    resetPractice();
    setScreen("home");
  };

  const finishPractice = () => {
    setScreen("results");
  };

  if (screen === "home") {
    return (
      <div className="page-wrap">
        <div className="page-container">
          <div style={cardStyle()}>
            <h1 className="main-title">Call Center Assessment Interview Simulator</h1>

            <p className="hero-text">
Choose between a <strong>General Mixed Assessment</strong> and a separate
<strong> Sales Account Interview </strong> practice mode. Each level contains
<strong> 18 questions</strong> designed to simulate interview-style pressure.
            </p>

            <div className="hero-grid">
              <div style={smallCardStyle()}>
                <div className="muted-label">Format</div>
<div className="stat-title">{selectedMode}</div>              </div>

              <div style={smallCardStyle()}>
                <div className="muted-label">Questions Per Level</div>
                <div className="stat-title">18</div>
              </div>

              <div style={smallCardStyle()}>
                <div className="muted-label">Levels</div>
                <div className="stat-title">Beginner / Intermediate / Advanced</div>
              </div>
            </div>

            <div className="home-grid">
              <div style={smallCardStyle()}>
                <label className="muted-label block-label">Choose Practice Mode</label>

<select
  value={selectedMode}
  onChange={(e) => setSelectedMode(e.target.value)}
  className="select-box"
  style={{ marginBottom: "16px" }}
>
  {practiceModes.map((mode) => (
    <option key={mode} value={mode}>
      {mode}
    </option>
  ))}
</select>
                <label className="muted-label block-label">Choose Level</label>

                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="select-box"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <button
                  onClick={startPractice}
                  style={{ ...buttonStyle(true), width: "100%", marginTop: "20px" }}
                >
                  Start Assessment
                </button>
              </div>

              <div style={smallCardStyle()}>
                <h2 className="section-title">What this simulates</h2>

                <div className="feature-grid">
                  {[
                    "Grammar and sentence clarity",
                    "Reading and instruction handling",
                    "Customer service judgment",
                    "Problem-solving under pressure",
                    "Basic technical awareness",
                    "Typing speed and accuracy",
                  ].map((item) => (
                    <div key={item} className="feature-chip">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <div>© {new Date().getFullYear()} Call Center Assessment Practice</div>
            <a
              href="https://github.com/Carl4WebDev"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              carl4dev
            </a>
            <a
              href="https://carl4dev-ccat-practice.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Prepare for CCAT style Assessment.
            </a>
            <div className="footer-note">
              This is an independent practice tool and is not affiliated with
              any official hiring platform or testing provider.
            </div>
          </footer>
        </div>
      </div>
    );
  }

  if (screen === "results") {
    return (
      <div className="page-wrap">
        <div className="page-container narrow">
          <div style={cardStyle()}>
            <h1 className="results-title">Results</h1>
<p className="results-subtitle">
  {selectedMode} · {selectedLevel} · {filteredQuestions.length} Questions
</p>
            <div className="stats-grid">
              <div style={smallCardStyle()}>
                <div className="muted-label">Correct</div>
                <div className="big-stat">{correctCount}</div>
              </div>

              <div style={smallCardStyle()}>
                <div className="muted-label">Attempted</div>
                <div className="big-stat">{attemptedCount}</div>
              </div>

              <div style={smallCardStyle()}>
                <div className="muted-label">Total</div>
                <div className="big-stat">{filteredQuestions.length}</div>
              </div>
            </div>

            <div className="review-list">
              {filteredQuestions.map((q, index) => {
                const saved = answers[q.id];
                const isTyping = q.type === "typing_test";

                return (
                  <div key={q.id} className="review-card">
                    <div className="muted-label">
                      {index + 1}. {q.category}
                    </div>

                    <div className="review-question">{q.question}</div>

                    {q.passage && <div className="review-passage">{q.passage}</div>}

                    {isTyping ? (
                      <>
                        <div className="review-line">
                          Target: <strong>{getTypingTarget(selectedLevel)}+ WPM</strong> and <strong>85%+</strong> accuracy
                        </div>
                        <div className="review-line">
                          Your WPM: <strong>{saved?.wpm ?? 0}</strong>
                        </div>
                        <div className="review-line">
                          Your Accuracy: <strong>{saved?.accuracy ?? 0}%</strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="review-line">
                          Your answer: <strong>{saved ?? "No answer"}</strong>
                        </div>
                        <div className="review-line">
                          Correct answer: <strong>{q.answer}</strong>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="button-row">
              <button
                onClick={() => {
                  resetPractice();
                  setScreen("practice");
                }}
                style={buttonStyle(true)}
              >
                Retry
              </button>

              <button onClick={goHome} style={buttonStyle(false)}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      <div className="practice-container">
        <aside style={cardStyle()} className="sidebar-card">
          <div className="muted-label">Level</div>
          <div className="sidebar-main">{selectedLevel}</div>

          <div className="muted-label spaced-label">Progress</div>
          <div className="sidebar-sub">
            {filteredQuestions.length ? `${currentIndex + 1} / ${filteredQuestions.length}` : "0 / 0"}
          </div>

          <div className="muted-label spaced-label">Categories</div>
<div className="sidebar-sub">{selectedMode}</div>
          <button
            onClick={finishPractice}
            style={{ ...buttonStyle(true), width: "100%", marginTop: "24px" }}
          >
            Submit Assessment
          </button>

          <button
            onClick={goHome}
            style={{ ...buttonStyle(false), width: "100%", marginTop: "12px" }}
          >
            Back to Home
          </button>
        </aside>

        <main style={cardStyle()} className="main-card">
          {!filteredQuestions.length ? (
            <>
              <h1 className="empty-title">No questions found</h1>
              <p className="empty-text">This level does not have questions yet.</p>
            </>
          ) : (
            <>
              <div className="muted-label">Question {currentIndex + 1}</div>

              <h1 className="question-title">{currentQuestion.question}</h1>

              {currentQuestion.passage && (
                <div className="passage-box">{currentQuestion.passage}</div>
              )}

              {currentQuestion.type === "typing_test" ? (
                <TypingTest
                  question={currentQuestion}
                  savedValue={answers[currentQuestion.id]}
                  onSave={(value) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: value,
                    }))
                  }
                />
              ) : (
                <div className="choices-grid">
                  {currentQuestion.choices.map((choice) => {
                    const selected = answers[currentQuestion.id] === choice;

                    return (
                      <button
                        key={choice}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [currentQuestion.id]: choice,
                          }))
                        }
                        className={`choice-btn ${selected ? "choice-selected" : ""}`}
                      >
                        {choice}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="button-row top-gap">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  style={buttonStyle(false, currentIndex === 0)}
                >
                  Previous
                </button>

                <button
                  onClick={() => {
                    if (currentIndex < filteredQuestions.length - 1) {
                      setCurrentIndex((prev) => prev + 1);
                    } else {
                      finishPractice();
                    }
                  }}
                  style={buttonStyle(true)}
                >
                  {currentIndex < filteredQuestions.length - 1 ? "Next Question" : "Finish"}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}