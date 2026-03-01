# Postman Collections Template

This repository provides a standardized template for managing REST API collections and Postman documentation. It is rigorously standardized to ensure documentation portals and developer experiences remain top-tier.

## Getting Started

1. **Clone the Repository** to your local machine.
2. **Connect to Postman**: If you haven't already, link this repository to your Postman workspace.
3. **Import the Environment**: Postman security policies prevent environments from syncing automatically. You must manually import the environment file (`postman/collections/Your Production.postman_environment.json`) or copy its JSON contents into a new Postman environment to enable base variables like `{{base_url}}`, `{{access_token}}`, and `{{service}}`.

## Teammate Onboarding Steps

To collaborate effectively, each team member must sync their personal Postman workspace with this central repository. Follow these steps to onboard:

1. **Create a Personal Workspace**: Navigate to workspaces and create a new Personal Workspace. You will act as a "Team of 1" within your own environment.
2. **Navigate to APIs**: Select the "APIs" tab from the sidebar menu in your workspace.
3. **Import the API**: Select the "Import" option.
4. **Connect to Your Repository**: Choose the "Connect Repository" option immediately.
5. **Select the Shared Repository**: Authenticate your GitHub account. You must select your team's central repository (e.g., `your-organization/your-repo`) to ensure you are synced with the team.
6. **Automatic Pull**: Once successfully connected, Postman will detect the existing configurations in the repository. It will automatically pull the API specifications and Collections directly into your personal workspace.

## AI-Assisted Endpoint Generation

To maintain strict documentation standards, we highly recommend utilizing AI assistants (e.g., Anti-gravity, Cursor, or Claude) to scaffold and update new Postman endpoints instead of constructing them manually.

We have embedded agent configurations directly into this repository (`.agent/` directory) to guide AI assistants automatically.

### Template Customization & Usage
To use this template for your own APIs, you will need to customize a few areas:

1. **Placing your Collections**: Add your projects' exported Postman Collections directly into the `postman/collections/` directory. By default, this template provides a boilerplate `AI Generated.json` collection for your AI agents to safely inject new endpoints into. *Note: `REST API ONE.json` and `REST API TWO.json` are just sample collections provided for reference and should be removed.*
2. **Updating the Agent Workflows**: Open `.agent/workflows/generate-endpoint.md`. You **MUST** update the instructional prompt within this file to reference your specific Postman Environment file (e.g., changing it from `Your Production.postman_environment.json` to whichever environment JSON powers your service variables). This guarantees your AI agents structure the generated URLs correctly!

### How to Generate Endpoints
When working within an AI-enabled IDE or pairing with an AI agent:
1. Instruct the AI to **"Generate a Postman endpoint for [Module/Route]"** or use the `/generate-endpoint` slash command.
2. The AI will parse your backend routes and automatically scaffold a new folder inside the **"AI Generated"** collection (`AI Generated.json`).
3. **Review and Move**: Once the AI finishes generating the endpoints, review them within Postman. If the configuration is accurate, drag the new folder into the appropriate finalized collection.

**Automated AI Actions Include:**
- Mapping the endpoint URLs correctly utilizing the standardized environment variables.
- Writing standard Postman scripts on `POST` requests to capture the newly created ID and store it in the `{{resourceId}}` environment variable.
- Stripping redundant `Authorization` headers to ensure endpoints cleanly inherit the collection-level bearer token.
- Authoring comprehensive `description` properties for the root Endpoint, Queries, Path Variables, and Headers extracted from the codebase.
- **Injecting Mock "Example" Responses**, pairing the request code snippet with a synthetic JSON response payload. This guarantees the Postman Documentation renders optimally.

## Manual Authoring Conventions

If manual adjustments or the creation of endpoints are necessary, you **MUST** adhere to the standardized guidelines established in the repository rulebook.

**[Read the Postman Conventions Rulebook](.agent/rules/postman-conventions.md)**

### Quick Reference:
- **Utilize `{{resourceId}}`**: This temporary environment variable stores the ID of the most recently created item. Ensure subsequent GET, PATCH, and DELETE endpoints target `{{resourceId}}` rather than hardcoding static IDs.
- **Comprehensive Descriptions**: You must populate the description fields for all Headers, Path Variables, and Query parameters using Postman's native interface. 
- **Mandatory Examples**: Every endpoint requires saved Examples matching a successful response as well as for errors. This allows developers to view the expected API output without needing to execute the network request.
