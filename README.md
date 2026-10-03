# Bilingual Insurance Plan Comparator

An English/Mandarin tool that helps members compare insurance plans through interactive cost scenarios.

Built during my Operations Analyst internship at **Student Medicover** (Summer 2026), where it launched to members.

<!-- TODO: add a screenshot or GIF here, e.g. ![Plan Comparator screenshot](assets/screenshot.png) -->

## The problem

Feedback from enrollment agents showed that members found plan costs hard to understand and compare.
<!-- TODO: add 1–2 sentences on what agents told you, e.g. the questions members asked most often -->

## What I did

- **Discovery:** Ran ride-alongs with 5 enrollment agents to see where members got stuck when comparing plans.
- **Requirements:** Turned those observations into a feature set built around concrete cost scenarios, in both English and Mandarin.
- **Build:** Prototyped and built the app in about two weeks using Google AI Studio (Gemini), React, and TypeScript.
- **Launch:** Took the tool through management review and approval to launch.

## Results

- About **500 members** used the tool in its first week after launch.
- Tool users enrolled at a **30% higher rate** than non-users. (This is an observed difference between groups, not a controlled experiment.)

## Features

- Bilingual interface (English / Mandarin)
- Interactive cost scenarios for comparing plans
<!-- TODO: add 2–3 more features specific to the app -->

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · Motion · lucide-react · Google Gen AI SDK (`@google/genai`) · Express. Originally built in Google AI Studio.

## Run locally

**Prerequisite:** Node.js

```bash
npm install
cp .env.example .env.local   # then set GEMINI_API_KEY if you use the Gemini features
npm run dev                  # runs on http://localhost:3000
```

## Notes

This is a portfolio copy of the tool. Figures above are from internal usage data during my internship. This repository is not an official Student Medicover product.
