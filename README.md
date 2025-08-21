# 🧾 Intelligent Ticket Tagging System

## 📌 Project Overview
The Intelligent Ticket Tagging System is a DevRev Snap-in designed to automatically classify and tag incoming tickets.  
It leverages OpenAI GPT-4 NLP, DevRev APIs, and Slack integration to streamline ticket management, routing, and prioritization.
  
---

## 🎯 Objective
Manually tagging tickets is time-consuming, inconsistent, and error-prone.  
This system solves the problem by:  
- Automating ticket tagging and part assignment  
- Providing explanations for classifications  
- Enabling manual overrides for continuous improvement  

---

## 🚨 Problem Statement
- Manual ticket tagging leads to inconsistencies and delays  
- Misclassification results in improper routing and resource waste  
- Support teams spend extra time on repetitive tasks  

✅ The solution: Automated, explainable, and override-friendly ticket tagging system.  

---

## ✨ Core Features
- Ticket Analysis (NLP):  
  - Uses GPT-4 to read ticket content.  
  - Classifies tickets into categories (Bug, Feature Request, Inquiry, Complaint).  
  - Extracts reasoning for classification.  

- Part Assignment:  
  - Retrieves product parts using `search.hybrid`.  
  - Matches ticket keywords to parts.  
  - Updates ticket assignment automatically.  

- Ticket Classification & Tagging:  
  - Adds contextual tags (Bug, Feature Request, etc.).  
  - Allows manual overrides.  

- Reasoning Extraction:  
  - Captures why a ticket was classified in a certain way.  
  - Stores reasoning in ticket metadata.  

- Manual Override Interface:  
  - Snap-in UI allows agents to modify tags.  
  - Corrections are logged back → feedback loop to improve accuracy.  

- Scalability & Accuracy:  
  - Can handle large ticket volumes.  
  - Accuracy improves via continuous learning on historical tickets.  

---

## ⚙️ Implementation Details

### Platform and Tools
- Platform: DevRev Snap-in Framework  
- Languages: TypeScript and JavaScript  
- APIs: DevRev APIs, OpenAI API, Slack API  

### Components
- NLP Module: Integrates GPT-4 for classification and reasoning.  
- Part Assignment: Uses `search.hybrid` and business logic to map tickets.  
- Ticket Classification: Tags with contextual labels.  
- Manual Override: Agents edit tags in Snap-in → feedback loop.  

---

## 🔄 Workflow
1. Event Trigger:  
   - Listens to `work_created` events in DevRev.  

2. Ticket Processing:  
   - NLP analyzes ticket content.  
   - Assigns product parts.  
   - Classifies and tags the ticket.  

3. Updating the Ticket:  
   - Writes results back using `works.update`.  

4. Slack Notification:  
   - Posts ticket summary to Slack via `chat.postMessage`.  

5. Manual Corrections:  
   - Agents override tags in Snap-in UI.  
   - Updates are logged and improve model accuracy.  

---

## 📡 APIs Used

### DevRev APIs
- search.hybrid → Retrieve product parts (semantic and keyword)  
- works.list → List all work items  
- tags.list → Fetch available tags  
- works.update → Update ticket info (classification, parts, reasoning)  
- timeline-entries.create → Log comments and explanations on tickets  

### OpenAI API
- Provides NLP-driven ticket analysis and classification reasoning  

### Slack API
- Endpoint: https://slack.com/api/chat.postMessage  
- SDK: @slack/web-api  
- Sends tagged ticket updates to Slack channels  

---

## 🏗️ Architecture
```mermaid
flowchart TD
    A[Ticket Created in DevRev] --> B[NLP Processing via OpenAI]
    B --> C[Part Assignment via DevRev API]
    C --> D[Update Ticket with Tags]
    D --> E[Slack Notification]
    D --> F[Manual Override in Snap-in UI]
    F --> B
