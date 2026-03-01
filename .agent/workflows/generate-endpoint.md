---
description: Automatically scaffolds and format a new Postman endpoint folder based on API routes.
---

# Generate Postman Endpoint Workflow

Follow these sequential steps when asked to map a backend codebase route into the Postman Collections.

1. **Create the Folder Structure**
   Parse the module/router from the codebase and create a new Postman Folder inside the "AI Generated" collection located at `your-repo\postman\collections\AI Generated.json` (e.g. `Users API`).
   - Do not edit any other collection present in `your-repo\postman\collections`.
   - Do not read the entire `AI Generated.json` collection since it's very large. Instead, review the sample folder structure at `your-repo\.agent\samples\sample-folder.json` to understand what your generated data should look like.
   - Describe the Folder's purpose natively in the `description` attribute utilizing documentation extracted from the backend comments or `abstract/documentation/endpoints` markdown.
   - **Safe JSON Manipulation (CRITICAL)**: ALWAYS use the provided script at `your-repo\.agent\scripts\append-folder.js` to add your new endpoints. Simply edit the script to include your generated JSON folder object, then run it using `node .agent/scripts/append-folder.js`. Do not attempt raw string replacement, as it risks corrupting the JSON structure.
   - **Cleanup (CRITICAL)**: After the script successfully runs and the folder is added to Postman, you MUST edit `append-folder.js` again to revert the `newFolder` variable back to its original empty state. Do not leave your generated endpoints sitting in the script file.

2. **Map the Endpoints**
   Map the REST endpoints (GET, POST, PATCH, DELETE) to Postman `item` structures. 
   - Assign appropriate `Content-Type` headers where needed.
   - Strip out individual endpoint `Authorization` headers to ensure they fall back to the Collection's `access_token` inheritance.

3. **Bind Environment Variables**
   Ensure URLs map dynamically: `{{base_url}}{{microservice_prefix}}/your_route`.
   For targets requiring an ID (e.g. `GET /user/:id`), standardize the Path Variable to consume the `{{resourceId}}` environment value.
   Refer to Environments (`your-repo\postman\collections\Your Production.postman_environment.json`) to figure which service variable to use.

4. **Inject Tests Scripts**
   Add the standard Postman Test script strictly on the `POST` (Creation) endpoint. It should parse the JSON response and overwrite the `resourceId` environment variable so subsequent requests interact with the newly minted item.
   - Do NOT add scripts to the Folder level.

5. **Document Everything**
   Add `description` attributes comprehensively:
   - To the endpoint request itself.
   - To all Query parameters (`page`, `limit`, etc.).
   - To all Path variables (`userId`, `postId`, etc.).
   - To all Headers (`Content-Type`).

6. **Generate Mock Examples (Critical Step)**
   Synthesize a mock response payload matching the expected output of that backend controller.
   Inject this mock response into the endpoint's `response` array. Ensure `originalRequest`, `status` ("OK"), and `body` (JSON string) are complete. This guarantees the user's Postman Documentation UI displays rich Response previews identically to Postman's official documentation.