```ts
// Parallelize independent operations
const [authResult, profileCheck] = await Promise.all([
  supabase.auth.signUp(...),
  supabase.from('users').select().eq('email', email)
]);

if (profileCheck.data?.length > 0) {
  throw new Error('Profile already exists');
}
```
