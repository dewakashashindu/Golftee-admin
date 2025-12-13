const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY
);

async function createEventsTable() {
  try {
    console.log("Creating events table in Supabase...");

    // Create events table using SQL
    const { data, error } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS public.events (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT DEFAULT 'tournament',
          date TEXT NOT NULL,
          time TEXT,
          location TEXT,
          format TEXT,
          description TEXT,
          registrationDeadline TEXT,
          maxParticipants INTEGER DEFAULT 50,
          entryFee TEXT DEFAULT '$0',
          prizePool TEXT DEFAULT '$0',
          poster TEXT,
          status TEXT DEFAULT 'upcoming',
          participants TEXT[] DEFAULT ARRAY[]::TEXT[],
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW(),
          deletedAt TIMESTAMP
        );
      `,
    });

    if (error) {
      // Try direct SQL execution instead
      console.log("RPC method not available, attempting direct SQL...");
      
      // Use the SQL editor query method
      const sqlQuery = `
        CREATE TABLE IF NOT EXISTS public.events (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          type TEXT DEFAULT 'tournament',
          date TEXT NOT NULL,
          time TEXT,
          location TEXT,
          format TEXT,
          description TEXT,
          registrationDeadline TEXT,
          maxParticipants INTEGER DEFAULT 50,
          entryFee TEXT DEFAULT '$0',
          prizePool TEXT DEFAULT '$0',
          poster TEXT,
          status TEXT DEFAULT 'upcoming',
          participants TEXT[] DEFAULT ARRAY[]::TEXT[],
          createdAt TIMESTAMP DEFAULT NOW(),
          updatedAt TIMESTAMP DEFAULT NOW(),
          deletedAt TIMESTAMP
        );
      `;
      
      console.log("⚠️  RPC method not available. Please create the events table manually in Supabase:");
      console.log("\n1. Go to Supabase Dashboard");
      console.log("2. Click 'SQL Editor'");
      console.log("3. Click 'New Query'");
      console.log("4. Paste this SQL:\n");
      console.log(sqlQuery);
      console.log("\n5. Click 'Run'");
      return;
    }

    console.log("✅ Events table created successfully!");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  }
}

createEventsTable();
