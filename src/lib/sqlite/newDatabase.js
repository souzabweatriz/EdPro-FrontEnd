import Database from "better-sqlite3";
import { join } from "path";
import { hashSync } from "bcryptjs";
import { existsSync, unlinkSync } from "fs";

// Cria o caminho para o arquivo do banco 
const dbPath = join(process.cwd(), "auth.db");

// Remove banco antigo
if (existsSync(dbPath)) unlinkSync(dbPath);

// Cria banco novo e abre conexão
const db = new Database(dbPath);

// Cria tabela
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'aluno'
  )
`);

// Adiciona admin
db.prepare("INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)").run(
    "vei@senai.com",
    hashSync("amods", 10),
    "Vei",
    "admin"
);

// Fecha conexão
db.close();