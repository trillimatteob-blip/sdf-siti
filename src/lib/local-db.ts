import Database from "better-sqlite3";
import { join } from "path";

const DB_PATH = join(process.cwd(), "data", "sdf-health-local.db");

export const localDb = new Database(DB_PATH);
localDb.pragma("journal_mode = WAL");
localDb.pragma("busy_timeout = 5000");

export function initLocalDb() {
  localDb.exec(`
    CREATE TABLE IF NOT EXISTS health_data (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      weight REAL, height REAL, body_fat REAL, muscle_mass REAL, bmi REAL, body_water REAL,
      waist REAL, hips REAL, chest REAL, arms REAL, thigh REAL, calves REAL,
      systolic_bp REAL, diastolic_bp REAL, resting_hr REAL, oxygen_saturation REAL, hrv REAL,
      fasting_glucose REAL, post_meal_glucose REAL, ketones REAL, body_temp REAL,
      sleep_hours REAL, sleep_quality INTEGER, sleep_start TEXT, sleep_end TEXT, night_awakenings INTEGER,
      steps INTEGER, calories_burned INTEGER, activity_minutes INTEGER, distance_km REAL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  localDb.exec(`
    CREATE TABLE IF NOT EXISTS reminders (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      due_date TEXT NOT NULL,
      type TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      notify_doctor INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  localDb.exec(`
    CREATE TABLE IF NOT EXISTS doctors (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      specialization TEXT NOT NULL,
      style TEXT NOT NULL,
      passions TEXT,
      price REAL NOT NULL,
      availability TEXT,
      rating REAL DEFAULT 0,
      reviews_count INTEGER DEFAULT 0
    )
  `);

  localDb.exec(`
    CREATE TABLE IF NOT EXISTS access_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      doctor_id TEXT,
      action TEXT NOT NULL,
      resource TEXT NOT NULL,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  localDb.exec(`
    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      category TEXT,
      description TEXT,
      uploaded_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const insertDoc = localDb.prepare(`
    INSERT OR IGNORE INTO doctors (id, name, specialization, style, passions, price, availability, rating, reviews_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertDoc.run("doc-1", "Andrea Militello", "Endocrinologia", "direct", "powerlifting,bodybuilding", 150, "Lun-Ven 9-18", 4.8, 42);
  insertDoc.run("doc-2", "Gabriele Abate", "Cardiologia", "analytical", "bodybuilding,TRT", 180, "Mar-Gio 10-16", 4.9, 38);
  insertDoc.run("doc-3", "Giovanni Rossini", "Andrologia", "empathetic", "powerlifting", 120, "Lun-Mer-Ven 9-13", 4.7, 27);
  insertDoc.run("doc-4", "Roberto Vignando", "Medicina dello Sport", "direct", "strongman,bodybuilding", 200, "Mar-Gio 14-20", 5.0, 55);
}

initLocalDb();
