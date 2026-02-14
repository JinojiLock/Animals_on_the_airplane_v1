# 🔒 Admin Panel Access

## Security Information

The admin panel is **NOT accessible** through public links or buttons.

### Access URL

The admin panel is available at a **secret URL** configured in `.env`:

```
VITE_ADMIN_URL=/admin-panel-7k3m9x
```

### How to Access

1. **In Development:**
   - Open browser
   - Manually type: `http://localhost:5173/admin-panel-7k3m9x`
   - Enter password from `.env`: `VITE_ADMIN_PASSWORD`

2. **In Production:**
   - Open browser
   - Manually type: `https://yourdomain.com/admin-panel-7k3m9x`
   - Enter your production password

### Blocked Paths

The following paths are **explicitly blocked** and redirect to home:
- `/admin` → redirects to `/`
- Any unknown path → redirects to `/`

### Security Best Practices

1. **Change the admin URL** in production:
   ```env
   VITE_ADMIN_URL=/your-random-secure-path-xyz789
   ```

2. **Use a strong password**:
   ```env
   VITE_ADMIN_PASSWORD=VeryStrongPassword123!@#
   ```

3. **Never share the admin URL publicly**
   - Don't add it to public documentation
   - Don't commit it to public repos
   - Share it only with authorized personnel

4. **Keep the URL random and unpredictable**:
   - Use a mix of letters and numbers
   - Make it 10-20 characters long
   - Example: `/admin-xyz789abc123`

### Emergency Access Recovery

If you forget the admin URL:
1. Check your `.env` file: `VITE_ADMIN_URL`
2. Check your production environment variables
3. Contact the system administrator

### Session Management

- Login state is stored in `localStorage` as `admin_auth`
- To logout: clear browser storage or localStorage manually
- Session persists until browser storage is cleared
