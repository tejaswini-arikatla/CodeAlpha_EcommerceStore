Instructions to update Render service `MONGO_URI` and redeploy

Option A — Update via Render dashboard (recommended)
1. Open https://dashboard.render.com and log in to your account.
2. Select the service for your backend (name shown in Render).
3. Go to the "Environment" or "Environment Variables" section.
4. Find `MONGO_URI` and set its value to the target database URI (for ecommerceDB). Example:

   mongodb+srv://<user>:<password>@cluster0.dxkohti.mongodb.net/ecommerceDB?retryWrites=true&w=majority

5. Save changes and click "Manual Deploy" or trigger a new deploy. Wait for deploy to finish.

Option B — Update using Render REST API (scripted)
- You'll need your Render API key (create one in Render dashboard -> Account -> API Keys).
- Replace `RENDER_API_KEY` and `SERVICE_ID` below and run the curl command.

Example (replace placeholders):

```bash
export RENDER_API_KEY=your_render_api_key
export SERVICE_ID=your_service_id
curl -X PATCH \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"envVars": [{"key":"MONGO_URI","value":"mongodb+srv://<user>:<pass>@cluster0.dxkohti.mongodb.net/ecommerceDB?retryWrites=true&w=majority","secure":true}]}' \
  "https://api.render.com/v1/services/$SERVICE_ID"
```

Notes:
- The Render API may require a different endpoint for updating env vars depending on your account and service type. If the PATCH above returns an error, use the Render docs or update via dashboard.
- After updating env var, trigger a deploy in the Render dashboard or via the API.

Next steps I can take for you:
- I can prepare a ready-to-run script that uses the Render API; you will need to provide an API key and service ID.
- I can test the admin UI locally (open `frontend/admin.html`) and walk you through manual verification steps in your browser.