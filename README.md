# StudyMate AI — Amazon Developer Hackathon prototype

A responsive local-first study dashboard with notes summarization, recall questions, study tasks, 25-minute focus timer, speech synthesis, and browser voice commands. Includes a **separate** Alexa custom skill Lambda starter with two intents.

## Run the web app

Requires Node.js 18+.

```bash
npm install
npm start
```

Open http://localhost:3000

The web app is a **working offline-style prototype**, not an LLM-powered AI product: summarization uses keyword-frequency scoring; quizzes use recall prompts; voice uses browser speech APIs. Data is saved in localStorage. No cloud account or API key required.

## Alexa skill starter

`alexa/index.js` exports a Lambda handler for an Alexa custom skill. `alexa/interaction-model.json` supplies the invocation name and intents. To deploy:

1. Create a custom skill in the Amazon Alexa Developer Console.
2. Set invocation name and paste/import the interaction model from `alexa/interaction-model.json`; build model.
3. Deploy `alexa/index.js` as an AWS Lambda handler with `ask-sdk-core` installed (or use an Alexa-hosted Node.js skill and copy the handler code).
4. Configure the Lambda ARN as the skill endpoint and test in the developer console.
5. Implement actual shared data/API integration if you want the web app and Alexa skill to share tasks or notes.

**Important:** This is a basic Alexa custom skill, NOT proof of Alexa+ integration. Review the current Amazon Developer Hackathon rules, resources, and Alexa+ track requirements. The project may need major track-specific work before it qualifies. Do not claim unsupported Alexa+ functionality in your submission.

## Before submitting

- Verify track eligibility, supported APIs, and technical requirements in official rules.
- Deploy a public working demo and test the real Alexa skill in the developer console.
- Add a suitable open-source LICENSE if required by hackathon rules.
- Record a truthful demo video of what actually works.
- Submit the project through Devpost before the deadline.
# 🎓 StudyMate AI

### 📚 Study Smarter • Stay Focused • Learn Better

![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-orange?logo=html5)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)
![Deployment](https://img.shields.io/badge/Deployment-Render-blue)

**StudyMate AI** is a responsive, local-first student productivity and voice learning application developed as a prototype for the **Amazon Developer Hackathon**.

It helps students organize notes, generate summaries, practice recall questions, manage study tasks, and stay focused using a Pomodoro timer.

The project also includes a separate Amazon Alexa custom skill starter.

### 🌐 Live Demo

**🚀 [Launch StudyMate AI](https://studymate-ai-tqr6.onrender.com)**

**💻 [View Source Code](https://github.com/AnkitSahu-032/StudyMate-AI)**

---

## ✨ Key Features

### 📝 1. Smart Notes Summarization

* Summarize lengthy study notes.
* Identify important sentences using keyword-frequency scoring.
* Quickly revise essential concepts.
* Works without external AI APIs.

### 🧠 2. Recall Questions

* Generate study questions from notes.
* Practice active recall.
* Use fill-in-the-blank questions.
* Reveal answers for

## Demo commands

Browser voice: “show tasks”, “read summary”, “start focus”.
Alexa skill: “Alexa, open study mate companion”, then “give me a study tip” or “start a quiz”.


## Free Offline 2.0 upgrade
- Rule-based local chat assistant: finds matching passages in pasted notes; not a generative AI model.
- Fill-in-the-blank recall questions with revealable answers.
- Browser microphone and speech synthesis (Chrome support varies).
- All notes and tasks remain in browser localStorage. No paid AI API needed.
- The Alexa folder is starter skill code only. The browser simulation is NOT an Alexa+ integration. Confirm hackathon requirements before claiming track eligibility.
- Run `npm.cmd install` and `npm.cmd start` in PowerShell.
- Review `npm.cmd audit` before public deployment.
