# Security Policy

## Implemented Security Features

### Authentication
- ✅ Supabase Auth for secure authentication
- ✅ Protected routes using React Router
- ✅ Session management via AuthContext
- ✅ Automatic token refresh

### Environment Variables
- ✅ Required environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
- ✅ .env.example provided for reference
- ✅ Application throws error if environment variables are not configured
- ✅ .env file properly excluded from git via .gitignore

### Supabase Security
- 🔨 **TODO**: Implement Row Level Security (RLS) policies
- 🔨 **TODO**: Set up proper user roles and permissions
- 🔨 **TODO**: Enable audit logging

## Security Recommendations

### Before Production Deployment

1. **Environment Variables**
   - ✅ Environment variables are now required (no fallback values)
   - Create a `.env` file from `.env.example` with your Supabase credentials
   - For production: Set environment variables in your hosting platform (Vercel, Netlify, etc.)
   - Never commit `.env` files to git (already configured in .gitignore)

2. **Supabase Configuration**
   - Enable Row Level Security (RLS) on all tables
   - Create appropriate policies for each table
   - Set up user roles (admin, manager, operator)
   - Enable audit logging in Supabase

3. **Database Security**
   ```sql
   -- Example RLS policy for produtos table
   ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view products from their company"
     ON produtos FOR SELECT
     USING (auth.uid() IN (
       SELECT user_id FROM user_companies WHERE company_id = produtos.company_id
     ));
   ```

4. **Frontend Security**
   - Implement input validation on all forms
   - Sanitize user inputs to prevent XSS
   - Implement rate limiting on API calls
   - Use HTTPS only in production

5. **Dependency Security**
   - Regularly run `npm audit` to check for vulnerabilities
   - Keep dependencies up to date
   - Review security advisories

## Known Issues

### Current Vulnerabilities (as of last audit)

1. **esbuild/vite** (Moderate - Development Only)
   - Affects: Development server only
   - Impact: Limited to local development environment
   - Status: Acceptable for development; does not affect production builds
   - Fix: Requires major version upgrade of Vite (v7+)

## Reporting Security Issues

If you discover a security vulnerability, please:
1. **DO NOT** open a public issue
2. Email security concerns to the project maintainers
3. Include detailed information about the vulnerability
4. Allow reasonable time for a fix before public disclosure

## Multi-Tenancy (Multiempresa)

The system is designed for multi-tenancy. Implement these security measures:

1. **Company Isolation**
   - Use RLS to ensure users only see their company's data
   - Validate company_id on all operations
   - Implement company switching with proper authorization

2. **User Permissions**
   - Define clear role hierarchies (Super Admin, Company Admin, Manager, User)
   - Implement permission checks at both frontend and backend
   - Log all sensitive operations for audit

## Audit Trail

Planned audit features:
- Log all data modifications (who, what, when)
- Track user login/logout events
- Monitor sensitive operations (price changes, stock adjustments)
- Generate audit reports

## Best Practices

1. **Never expose sensitive data in client-side code**
2. **Always validate and sanitize user inputs**
3. **Use parameterized queries (Supabase handles this)**
4. **Implement proper error handling without exposing system details**
5. **Regular security audits and penetration testing**
6. **Keep all dependencies updated**
7. **Use HTTPS only in production**
8. **Implement Content Security Policy (CSP)**

## Contact

For security-related questions or concerns, contact the development team.
