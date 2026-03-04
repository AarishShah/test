---
description: Automatically scaffolds and format a new Postman endpoint folder based on API routes.
---

# Generate Postman Endpoint Workflow

Follow these sequential steps when asked to map a backend codebase route into the Postman Collections.

1. **Create the Folder Structure**
   Parse the module/router from the codebase and create a new Postman Folder by creating a directory inside the "AI Generated" collection located at `postman/collections/AI Generated/` (e.g., `postman/collections/AI Generated/Users API`).
   - All newly generated endpoints must be placed within `AI Generated/` so developers can review them before moving them to the final API collections.
   - Describe the Folder's purpose by creating a `.resources/definition.yaml` file inside the created folder with `$kind: collection` and a `description` field. Do NOT use `$kind: folder`.

2. **Map the Endpoints (Collection 3.0 YAML)**
   Map the REST endpoints (GET, POST, PATCH, DELETE) to Postman `item` structures by creating individual `.yaml` files for each endpoint request (e.g., `Get Rules.request.yaml`).
   - Do NOT include a `name: ` field in the `.request.yaml` file. The filename acts as the request name.
   - Use the sample at `.agent/samples/sample-endpoint.yaml` to understand the Postman Collection 3.0 YAML syntax.
   - Assign appropriate `Content-Type` headers where needed.
   - You MUST explicitly include the `Authorization: Bearer {{access_token}}` header unless the endpoint is public.

3. **Bind Environment Variables & Path Routing**
   Ensure URLs map dynamically: `{{base_url}}{{api_version}}/your_route`.
   For targets requiring an ID, explicitly use the colon parameters syntax in the URL (e.g., `{{base_url}}{{api_version}}/users/:userId`). Do NOT inject `{{resourceId}}` straight into the URL string.
   Instead, map the route component in the `pathVariables:` object, mapping the property exactly to the URL colon key, and assigning it the value `"{{resourceId}}"`.
   Refer to Environments (`postman/environments/Local Environment.environment.yaml`) to figure out which service variable to use.

4. **Inject Tests Scripts**
   Add the standard Postman Test script strictly on the `POST` (Creation) endpoint's `.yaml` file under the `scripts:` node (using `type: afterResponse` per v3 format). It should parse the JSON response and overwrite the `resourceId` environment variable so subsequent requests interact with the newly minted item.
   - Do NOT add scripts to the Folder level.

5. **Document Everything**
   Add `description` attributes comprehensively:
   - To the endpoint request itself.
   - To all Path variables (`ruleId`, `userId`, etc.).
   
   **Query Parameters (Important)**:
   - Identify *all possible* query parameters for the endpoint (e.g. `page`, `limit`, `search`, `sort`, `filters`).
   - Add them to the `queryParams:` list.
   - You MUST add `disabled: true` to every query parameter.
   - You MUST add a `description` to every query parameter.

6. **Generate Mock Examples (Critical Step)**
   - DO NOT ATTEMPT TO GENERATE EXAMPLES AT THIS TIME.
   - The user has disabled example generation (`.example.yaml` and `examples:`) because of internal formatting issues that crash the importer.
   - Specifically, do not append `examples: ...` to `.request.yaml` files.