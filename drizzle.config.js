
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: "postgresql",
   schema: "./utils/schema.jsx",
  dbCredentials: {
    url: "postgresql://developer-portfolio_owner:xo8THEIcNn1f@ep-wandering-block-a5ayxn2m.us-east-2.aws.neon.tech/developer-portfolio?sslmode=require",
  }
})
