import Database from "better-sqlite3";
import { join } from "path";
import { hashSync } from "bcryptjs";

const dbPath = join(process.cwd(), "auth.db");

export function seedDatabase() {
    const db = new Database(dbPath);

    // Criar tabela se não existir
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

    // Verificar se já tem usuários
    const count = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
    if (count > 0) {
        console.log(`[seed] Banco já tem ${count} usuários. Pulando seed.`);
        db.close();
        return;
    }

    console.log("[seed] Populando banco com usuários iniciais...");

    // Professores
    db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "https://pin.it/3zgRjMHMe",
      "Maria Luisa Gimenez",
      "magimenez_prof",
      "maria.gimenez@edpro.edu.br",
      "11999990000",
      hashSync("M4ria!2025xy", 10),
      "professor"
    );

    db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "https://pin.it/1jcrWPy72",
      "Luccas Augusto",
      "luccasaugusto79",
      "luccas.augusto@edpro.edu.br",
      "11988880001",
      hashSync("L4ucc4s#2025", 10),
      "professor"
    );

    // Alunos
    db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "https://pin.it/3HATo6nh7",
      "Mariana Alves",
      "marialves",
      "mariana.alves@edpro.edu.br",
      "11933330001",
      hashSync("M4r!ana2025xy", 10),
      "aluno"
    );

    db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
      "https://i.pinimg.com/1200x/b4/3a/3e/b43a3e37f66f9161a5d31a87fb48a145.jpg",
      "Ana Souza",
      "anasouza",
      "anasouza@gmail.com",
      "41955551234",
      hashSync("ana123", 10),
      "aluno"
    );

    console.log("[seed] Banco populado com sucesso!");
    db.close();
}
