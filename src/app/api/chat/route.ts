import { NextResponse } from 'next/server';

export const runtime = 'edge';

const openai_url = "https://api.openai.com/v1/chat/completions";
const api_key = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${api_key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens: 256,
      temperature: 0.7,
    }),
  };

  try {
    const response = await fetch(openai_url, options);

    if (!response.ok) {
      console.error("Erro na resposta da OpenAI:", response.status, response.statusText);
      return new NextResponse(
        JSON.stringify({ error: "Erro na API da OpenAI", status: response.status }),
        { status: 500 }
      );
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      return new NextResponse(
        JSON.stringify({ error: "Nenhuma resposta da IA" }),
        { status: 500 }
      );
    }

    const content = data.choices[0]?.message?.content?.trim();
    return new NextResponse(JSON.stringify({ content }), { status: 200 });
  } catch (error) {
    console.error("Erro ao processar a solicitação:", error);
    return new NextResponse(
      JSON.stringify({ error: "Erro interno no servidor" }),
      { status: 500 }
    );
  }
}
