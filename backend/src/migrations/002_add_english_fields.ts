import pool from '../config/database.js';

export async function up() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    console.log('🔄 Adding English language fields to conditions table...');

    // Add English fields to conditions table
    await client.query(`
      ALTER TABLE conditions 
      ADD COLUMN IF NOT EXISTS max_carrier_size_en VARCHAR(100),
      ADD COLUMN IF NOT EXISTS max_weight_en VARCHAR(50),
      ADD COLUMN IF NOT EXISTS allowed_animals_en TEXT[],
      ADD COLUMN IF NOT EXISTS additional_info_en TEXT;
    `);

    // Create index for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_conditions_airline_method 
      ON conditions(airline_id, transport_method);
    `);

    await client.query('COMMIT');
    console.log('✅ Migration 002: English fields added successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration 002 failed:', error);
    throw error;
  } finally {
    client.release();
  }
}

export async function down() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('🔄 Removing English language fields...');

    await client.query(`
      ALTER TABLE conditions 
      DROP COLUMN IF EXISTS max_carrier_size_en,
      DROP COLUMN IF EXISTS max_weight_en,
      DROP COLUMN IF EXISTS allowed_animals_en,
      DROP COLUMN IF EXISTS additional_info_en;
    `);

    await client.query(`
      DROP INDEX IF EXISTS idx_conditions_airline_method;
    `);
    
    await client.query('COMMIT');
    console.log('✅ Rollback 002 completed successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Rollback 002 failed:', error);
    throw error;
  } finally {
    client.release();
  }
}
