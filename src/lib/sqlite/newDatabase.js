import Database from "better-sqlite3";
import { join } from "path";
import { hashSync } from "bcryptjs";
import { existsSync, unlinkSync } from "fs";

const dbPath = join(process.cwd(), "auth.db");

if (existsSync(dbPath)) unlinkSync(dbPath);

const db = new Database(dbPath);


db.exec(`
  CREATE TABLE users (
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


db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/d0/58/de/d058de5ebda75f524443b0c707b84135.jpg",
    "Rodrigo Parma",
    "rodrigoparma02",
    "rodrigoparma@gmail.com",
    "19996661071",
    hashSync("rodrigop02", 10),
    "professor"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/a5/22/20/a5222010f5d71c7b48c36f78573b8896.jpg",
    "Maria Silva",
    "mariasilva",
    "maria.silva@example.com",
    "11999990001",
    hashSync("maria01", 10),
    "professor"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/d2/c9/b7/d2c9b7a1ea6d1306b217b0f3016ad265.jpg",
    "João Pereira",
    "joaopereira",
    "joao.pereira@example.com",
    "11999990002",
    hashSync("joao02", 10),
    "professor"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/f5/3f/e6/f53fe6ba57b9f80c5f9d1125f22deea0.jpg",
    "Mariana Costa",
    "marianacosta",
    "mariana.costa@example.com",
    "21988880003",
    hashSync("mariana03", 10),
    "professor"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/95/67/b1/9567b1043470a9cab04621b3eb58c8ce.jpg",
    "Carlos Alberto",
    "carlosalberto",
    "carlos.alberto@example.com",
    "31977770004",
    hashSync("carlos04", 10),
    "professor"
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
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/81/74/bc/8174bc895d3947c56f504c6d26d1525e.jpg",
    "Bruno Lima",
    "brunolima",
    "brunolima@gmail.com",
    "41955554321",
    hashSync("bruno123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/af/8a/e6/af8ae63c6d0139d807dd1ca16214e3b6.jpg",
    "Carla Mendes",
    "carlamendes",
    "carlamendes@gmail.com",
    "41955557654",
    hashSync("carla123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/65/d0/74/65d0747b42c81a76c9b49a548d7009b2.jpg",
    "Daniel Ferreira",
    "danielferreira",
    "danielferreira@gmail.com",
    "41955559876",
    hashSync("daniel123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/7c/b4/ed/7cb4edc16cee1aaf3bf09fb98f0821c6.jpg",
    "Elisa Gomes",
    "elisagomes",
    "elisagomes@gmail.com",
    "41955553421",
    hashSync("elisa123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/1200x/cb/ba/08/cbba08e7f751a14e536eeca178818c15.jpg",
    "Felipe Rocha",
    "feliperocha",
    "feliperocha@gmail.com",
    "41955556789",
    hashSync("felipe123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/55/71/8a/55718ace3fb9e212ae701606a39d14fe.jpg",
    "Gabriela Alves",
    "gabrielaalves",
    "gabrielaalves@gmail.com",
    "41955551235",
    hashSync("gabriela123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/80/a6/49/80a64977e4a4749d8ce504e54f186f0e.jpg",
    "Hugo Santos",
    "hugosantos",
    "hugosantos@gmail.com",
    "41955554322",
    hashSync("hugo123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/7e/fb/b2/7efbb2a1a8a08bab88c36f9d0d8ec8e4.jpg",
    "Isabela Ribeiro",
    "isabelaribeiro",
    "isabelaribeiro@gmail.com",
    "41955557655",
    hashSync("isabela123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/12/a1/2d/12a12d15c2274c180fa91c5888e8e49e.jpg",
    "João Marcos",
    "joaomarcos",
    "joaomarcos@gmail.com",
    "41955559877",
    hashSync("joao123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/66/00/c5/6600c5f4eb7f250dcf4a292de48e3ccc.jpg",
    "Karla Dias",
    "karladias",
    "karladias@gmail.com",
    "41955553422",
    hashSync("karla123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/0e/d9/ce/0ed9cea94dd7bc4927bc57a2ce74e34f.jpg",
    "Lucas Nascimento",
    "lucasnascimento",
    "lucasnascimento@gmail.com",
    "41955556780",
    hashSync("lucas123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/ae/d5/30/aed5309b656778319a45ecbd4c520590.jpg",
    "Marina Oliveira",
    "marinaoliveira",
    "marinaoliveira@gmail.com",
    "41955551236",
    hashSync("marina123", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://i.pinimg.com/736x/03/ca/54/03ca5433f09ce3431c59c66ea4c82971.jpg",
    "Nicolas Cardoso",
    "nicolascardoso",
    "nicolascardoso@gmail.com",
    "41955554323",
    hashSync("nicolas123", 10),
    "aluno"
);
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
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/7rRMGgs2x",
    "Rafael Moretti",
    "moretti.rafael",
    "rafael.moretti@edpro.edu.br",
    "11977770002",
    hashSync("Raf3lM2025$z", 10),
    "professor"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/5aNwc2dPK",
    "Camila Duarte",
    "camisduuarte",
    "camila.duarte@edpro.edu.br",
    "11966660003",
    hashSync("C4m1la!2025ab", 10),
    "professor"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/4NS9IsWrt",
    "Gislaine Adriano",
    "gislaineadriano16",
    "gislaine.adriano@edpro.edu.br",
    "11955550004",
    hashSync("G1sl4ine2025", 10),
    "professor"
);
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
    "https://pin.it/5gHvGqz9L",
    "Isabel Cristina Lopes",
    "isabelac",
    "isabela.cristina@edpro.edu.br",
    "11933330002",
    hashSync("Is4b3l@2025yz", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/4uurPZWPo",
    "Fernanda Souza",
    "fernandas",
    "fernanda.souza@edpro.edu.br",
    "11933330003",
    hashSync("F3rn@2025abcd", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/wliGUpVas",
    "Sofia Martins",
    "sofiam",
    "sofia.martins@edpro.edu.br",
    "11933330004",
    hashSync("S0f1a!2025xz", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/2s776xBum",
    "Clara Beatriz Oliveira",
    "clarabeatriz",
    "clara.beatriz@edpro.edu.br",
    "11933330005",
    hashSync("Cl4r@B!2025op", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/7zZ1657Dp",
    "Felipe Augusto",
    "felipeaugusto",
    "felipe.augusto@edpro.edu.br",
    "11944440001",
    hashSync("F3l!pe2025qw", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/c9iysgVmW",
    "Diego Matheus Silva",
    "diegomatheus",
    "diego.matheus@edpro.edu.br",
    "11944440002",
    hashSync("D!3goM@2025x", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/2F4smJykC",
    "Gustavo Nunes",
    "gustavon",
    "gustavo.nunes@edpro.edu.br",
    "11944440003",
    hashSync("Gust@v0#2025", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/48OEvpfPl",
    "Caio Henrique",
    "caiohenrique",
    "caio.henrique@edpro.edu.br",
    "11944440004",
    hashSync("C4ioH!2025az", 10),
    "aluno"
);
db.prepare("INSERT INTO users (photo, full_name, username, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)").run(
    "https://pin.it/4b7nPVM0j",
    "Thiago Ribeiro",
    "thiagor",
    "thiago.ribeiro@edpro.edu.br",
    "11944440005",
    hashSync("Th!ago2025jk", 10),
    "aluno"
);


db.close();