
# API Usage

The API service modules in `src/services/api` wrap `fetch` calls to your backend.
Set the base URL with the `EXPO_PUBLIC_API_BASE_URL` environment variable
(defaults to `http://localhost:3000`).

**Quick start**

```javascript
import { login } from '../src/services/api/authAPI';
const session = await login('test@example.com', 'pass123');
```

API endpoint paths are defined in [`src/utils/constants.js`](../src/utils/constants.js).
All requests should be sent to your configured API base URL.

## Endpoints

```text
Auth
  POST /auth/login
  POST /auth/register
  POST /auth/logout
  POST /auth/refresh
  POST /auth/forgot-password
  POST /auth/reset-password

Lists
  GET    /lists
  POST   /lists
  PUT    /lists/:id
  DELETE /lists/:id
  POST   /lists/:id/share
  POST   /lists/:id/unshare

Items
  GET    /items
  POST   /items
  PUT    /items/:id
  DELETE /items/:id
  POST   /items/:id/toggle

User
  GET    /user/profile
  PUT    /user/profile
  DELETE /user/delete
  GET    /user/subscription
```

Replace `:id` with the correct resource identifier. When building API calls you can import the `API_ENDPOINTS` object and prefix each path with your API base URL.
