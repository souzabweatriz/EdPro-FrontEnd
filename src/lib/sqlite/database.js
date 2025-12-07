import Database from "better-sqlite3";
import { join } from "path";

// Conecta no banco
export function connect() {
    const dbPath = join(process.cwd(), "auth.db");
    return new Database(dbPath);
}

// Fecha conexão
export function disconnect(db) {
    if (db) db.close();
}