import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    // Aqui você pode salvar os dados em um banco ou apenas logar
    console.log("Matrícula recebida:", data);
    return NextResponse.json({ message: "Matrícula recebida com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro na matrícula:", error);
    return NextResponse.json({ error: "Erro ao processar matrícula." }, { status: 500 });
  }
}
