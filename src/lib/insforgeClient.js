import { createClient } from '@insforge/sdk'

const baseUrl =
  import.meta.env.VITE_INSFORGE_URL ||
  import.meta.env.VITE_INSFORGE_PROJECT_URL ||
  import.meta.env.VITE_INSFORGE_HOST
const anonKey = import.meta.env.VITE_INSFORGE_KEY || import.meta.env.VITE_INSFORGE_ANON_KEY

if (!baseUrl) {
  throw new Error(
    'InsForge client requires VITE_INSFORGE_URL or VITE_INSFORGE_PROJECT_URL in .env or .env.local.\n' +
    'Add the backend URL to your environment file and restart Vite.'
  )
}

if (!anonKey || anonKey === 'your-anon-key-here' || anonKey.includes('your-anon-key')) {
  throw new Error(
    'InsForge client requires a valid anonymous key. Set VITE_INSFORGE_KEY or VITE_INSFORGE_ANON_KEY in your .env with the real anon key from InsForge.'
  )
}

export const insforge = createClient({
  baseUrl,
  anonKey,
  auth: {
    detectOAuthCallback: true
  }
})