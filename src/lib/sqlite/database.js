import Database from "better-sqlite3";
import { join } from "path";

let dbInstance = null;

function initializeDatabase() {
    const dbPath = join(process.cwd(), "auth.db");
    const db = new Database(dbPath);

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo TEXT,
            full_name VARCHAR(255) NOT NULL,
            username VARCHAR(100) UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone VARCHAR(20),
            password TEXT NOT NULL,
            role TEXT DEFAULT 'aluno',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

export function connect() {
    const dbPath = join(process.cwd(), "auth.db");
    
    // Se a instância global não existe, inicializa
    if (!dbInstance) {
        dbInstance = initializeDatabase();
    }
    
    return dbInstance;
}

export function disconnect(db) {
}