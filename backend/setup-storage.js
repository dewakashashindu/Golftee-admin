/**
 * Supabase Storage Bucket Setup Script
 * Creates the 'event-posters' bucket for storing tournament/event poster images
 * 
 * Run this script once to set up the storage bucket:
 * node setup-storage.js
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_KEY must be set in .env file');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupStorageBucket() {
  console.log('🚀 Setting up Supabase Storage for event posters...\n');

  try {
    // Check if bucket already exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      return;
    }

    const bucketExists = buckets.some(bucket => bucket.name === 'event-posters');

    if (bucketExists) {
      console.log('ℹ️  Bucket "event-posters" already exists');
      
      // Update bucket to ensure it's public
      const { error: updateError } = await supabase.storage.updateBucket('event-posters', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      });

      if (updateError) {
        console.log('⚠️  Could not update bucket settings:', updateError.message);
      } else {
        console.log('✅ Bucket settings updated successfully');
      }
    } else {
      // Create new bucket
      const { data, error } = await supabase.storage.createBucket('event-posters', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
      });

      if (error) {
        console.error('❌ Error creating bucket:', error.message);
        return;
      }

      console.log('✅ Bucket "event-posters" created successfully!');
    }

    // Display bucket info
    console.log('\n📦 Bucket Configuration:');
    console.log('   Name: event-posters');
    console.log('   Public: ✅ YES');
    console.log('   Max File Size: 5MB');
    console.log('   Allowed Types: JPEG, PNG, WebP, GIF');
    console.log('\n✅ Storage setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Update your events API to handle file uploads');
    console.log('   2. Use the storage URL format: ${SUPABASE_URL}/storage/v1/object/public/event-posters/{filename}');

  } catch (err) {
    console.error('❌ Unexpected error:', err);
  }
}

// Run the setup
setupStorageBucket();
