/**
 * Seed script: Create the first admin user
 * Run with: npx tsx src/db/seed.ts
 */
import { neon } from "@neondatabase/serverless";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { hashPassword } from "better-auth/crypto";

const envPath = path.resolve(process.cwd(), ".env");
const envContent = fs.readFileSync(envPath, "utf-8");
const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);

if (!match || !match[1]) {
  console.error("DATABASE_URL not found in .env file!");
  process.exit(1);
}

const connectionString = match[1];
const sql = neon(connectionString);

async function seed() {
  console.log("🌱 Seeding database...\n");

  const userId = crypto.randomUUID();
  const accountId = crypto.randomUUID();

  // Hash the password using better-auth hashPassword algorithm
  const hashedPassword = await hashPassword("admin123");

  try {
    // Check if admin user already exists
    const existing = await sql`SELECT id FROM "user" WHERE email = 'admin@kafetarik.com'`;
    if (existing.length > 0) {
      const existingUserId = existing[0].id;
      // Update account password to ensure hash matches better-auth algorithm
      await sql`
        UPDATE "account" 
        SET password = ${hashedPassword}, updated_at = NOW() 
        WHERE user_id = ${existingUserId}
      `;
      console.log("✅ Updated existing admin password");
    } else {
      // Create admin user
      await sql`
        INSERT INTO "user" (id, name, email, email_verified, role, created_at, updated_at)
        VALUES (${userId}, 'Admin Kafe', 'admin@kafetarik.com', true, 'admin', NOW(), NOW())
      `;
      console.log("✅ Created admin user: admin@kafetarik.com");

      // Create account (email/password credential)
      await sql`
        INSERT INTO "account" (id, account_id, provider_id, user_id, password, created_at, updated_at)
        VALUES (${accountId}, ${userId}, 'credential', ${userId}, ${hashedPassword}, NOW(), NOW())
      `;
      console.log("✅ Created admin credential account");
    }

    console.log("\n🎉 Seed completed!");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("  Email    : admin@kafetarik.com");
    console.log("  Password : admin123");
    console.log("  Role     : admin");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();

