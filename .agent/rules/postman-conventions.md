---
trigger: always_on
---

# Postman Collection Generation Rules

When generating or manipulating Postman collections for this workspace, you MUST strictly adhere to these Rules to ensure our Documentation portal meets quality standards.

## 1. Documentation Constraints
- **Endpoint Descriptions**: Every request MUST have a detailed `description` mapping back to its controller/module purpose.
- **Variable Descriptions**: Every Path Variable (e.g. `:userId`), Query Parameter (e.g. `?page=`), and Header (e.g. `Content-Type`) MUST contain a `description` field natively in the Postman JSON.
- **JSON Body Constraints**: When the request uses a `raw` JSON body mode, Postman does not natively support inline field descriptions. You MUST document the expected JSON structure, data types, and required fields directly inside the endpoint's root `request.description`.

## 2. Environment Variables & Auth Constraints
- **Inherit Auth**: Endpoints MUST NOT duplicate the Auth headers (e.g., `Authorization: Bearer {{authToken}}`). The entire Collection inherently uses `{{access_token}}`. Remove redundant Auth headers.
- **Temporary Variables**: Utilize the `{{resourceId}}` environment variable for managing specific item ID manipulations. 
  - Meaning: Paths requiring an ID should hit `/:id` with variable value `{{resourceId}}` (e.g., `/users/{{resourceId}}`).
- **Base Routing**: Routes must utilize standard variables strictly mapped to the `Your Production` environment (e.g., `{{base_url}}{{service}}`).

## 3. Test Script constraints
- **Isolated Scripts**: Scripts MUST ONLY be placed on creation (POST) endpoints to extract the generated ID.
- **Never Bleed**: Do not place scripts on the Folder level or on GET/PATCH/DELETE endpoints.
- **Example Script Logic**:
  ```javascript
  if (pm.response.code === 200 || pm.response.code === 201) {
      const response = pm.response.json();
      if (response.created && response.created.length > 0) {
          pm.environment.set('resourceId', response.created[0]._id);
      } else if (response.data && response.data._id) {
          pm.environment.set('resourceId', response.data._id);
      }
  }
  ```

## 4. Rich Example Constraints
- **Mandatory Examples**: You MUST generate and inject a mock `response` object into the `response` array for every endpoint.
- **Format**: The mock object must include `name: "Successful Response"`, the `originalRequest` block, `status: "OK"`, `code: 200`, and a mocked JSON stringified payload in the `body`.
- **Error Responses**: In addition to the "Successful Response", you must synthesize at least one expected error response (e.g., "Validation Error" (400) or "Not Found" (404)) to demonstrate the standard error payload structure.
- **Purpose**: This ensures the Postman Documentation portal visibly renders both the code snippet AND the example JSON response data to the user without them needing to run the query first.
