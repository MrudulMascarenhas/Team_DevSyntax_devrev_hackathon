Intelligent Ticket Tagging System

Objective The primary goal of this project is to develop an Intelligent Ticket Tagging System using the DevRev Snap-in platform. This system automates the tagging of incoming tickets, enabling faster routing, prioritization, and resolution.

Components NLP Module: Integrates with the OpenAI API to classify tickets and extract reasoning. Outputs include ticket type and explanation.

Part Assignment: Maps ticket content to product parts using keywords and other criteria via the DevRev API.

Ticket Classification: Tags tickets with contextual labels using NLP and business logic.

Manual Override Interface: Allows agents to modify tags via the DevRev Snap-in interface. A feedback loop enhances the accuracy of the NLP system.

Implementation:

Platform: DevRev Snap-in Framework

Languages: TypeScript and JavaScript

APIs: DevRev APIs for tickets, parts, and workflows

OpenAI API for NLP

Slack API for notifications

Workflow:

Event Trigger: The Snap-in listens to the work_created event from the DevRev platform.

Ticket Processing: NLP analyzes ticket content. Parts are assigned and classifications are provided.

Updating the Ticket: Results are written back to the ticket using the DevRev API.

Manual Corrections: Agents modify tags through the Snap-in interface, and changes are automatically updated in the system.

APIs Used:

DevRev APIs:

1)search.hybrid: Performs syntactic and semantic search (beta).

2)works.list: Lists a collection of work items.

3)tags.list: Lists available tags.

4)works.update: Updates work item information.

5)timeline-entries.create: Creates timeline entries (used for commenting).

Slack API Purpose: Sends messages to Slack channels. Endpoint: https://slack.com/api/chat.postMessage SDK: @slack/web-api
