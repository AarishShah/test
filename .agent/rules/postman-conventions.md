---
trigger: always_on
---

# Postman Collection Generation Rules

When generating or manipulating Postman collections for this workspace, you MUST strictly adhere to these Rules to ensure our Documentation portal meets quality standards.

## 1. Documentation Constraints
- **Endpoint Requests (`.request.yaml`)**:
  - Every request MUST have a detailed `description` mapping back to its controller/module purpose.
  - You MUST NOT define a `name:` field at the root of a `.request.yaml` file. Postman v3 derives the request name from the file's name itself.
- **Variable Descriptions**: Every Path Variable (e.g. `:userId`) and Query Parameter (e.g. `?page=`) MUST contain a `description` field natively in the Postman JSON.
- **Query Parameters**: For every endpoint, you MUST include *all* available Query Parameters supported by the endpoint within the `queryParams:` block. However, you MUST set `disabled: true` for every query parameter. This ensures the parameter serves as documentation for developers without cluttering the default request URL.
- **YAML Body Constraints**: When the request uses a `raw` body mode, Postman does not natively support inline field descriptions within the body. You MUST document the expected payload structure, data types, and required fields directly inside the endpoint's root `description`.

## 2. Environment Variables & Auth Constraints
- **Authorization Headers**: Endpoints MUST contain the `Authorization: Bearer {{access_token}}` header in the `headers` block (unless explicitly marked unauthenticated).
- **Temporary Variables**: Utilize the `{{resourceId}}` environment variable for managing specific item ID manipulations.
  - Meaning: Paths requiring an ID should hit `/:id` (e.g., `/rules/:ruleId`). You MUST NOT use `{{resourceId}}` directly in the URL string.
- **Path Variables Block**: You must explicitly define the `:id` parameter in the `pathVariables` array. 
  - The variable's `key` is the string from the URL (`ruleId`) and its `value` is `"{{resourceId}}"`.
- **Base Routing**: Routes must utilize standard variables strictly mapped to the `Local Environment` environment (e.g., `{{base_url}}{{api_version}}`).

## 3. Body Request Constraints
- **Format**: When dealing with JSON bodies, use `type: json`. The `content` must be a literal string (using `|-` or `|`) representing the formatted JSON payload.
- **Maximal Payloads**: Attempt to submit the maximal version of the payload (with all fields filled out).
- **Inline Comments**: Use JSON comments (`//`) inside the payload string to indicate optional fields or define complex values.
- **Identifier Naming**: Add distinct naming like `"via Postman - [Endpoint Name]"` to the body fields (e.g., `"name": "via Postman - Create User"`) so it is obvious the request was generated via Postman.

## 3. Test Script constraints
- **Isolated Scripts**: Scripts MUST ONLY be placed on creation (POST) endpoints to extract the generated ID.
- **Never Bleed**: Do not place scripts on the Folder level or on GET/PATCH/DELETE endpoints.
- **Example Script Logic**: Use the `scripts:` array with `type: afterResponse` and the `code:` payload (Postman v3 schema).
  ```yaml
  scripts:
    - type: afterResponse
      language: text/javascript
      code: |-
        if (pm.response.code === 200 || pm.response.code === 201) {
            const response = pm.response.json();
            if (response.created && response.created.length > 0) {
                pm.environment.set('resourceId', response.created[0]._id);
            } else if (response.data && response.data._id) {
                pm.environment.set('resourceId', response.data._id);
            }
        }
  ```

## 5. Rich Example Constraints
- **DISABLED CURRENTLY**: Generating mock examples via `.example.yaml` is currently disabled to prevent import crashes stemming from formatting issues. DO NOT attach `examples:` references or create `.example.yaml` files until this behavior is resolved.