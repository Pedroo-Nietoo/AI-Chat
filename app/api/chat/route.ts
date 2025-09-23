import { NextResponse } from 'next/server';

export const runtime = 'edge';

const api_url = process.env.GEMINI_API_URL;
const api_key = process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
 if (!api_key) {
  console.error('API key não configurada');
  return new NextResponse(
   JSON.stringify({ error: 'API key não configurada' }),
   { status: 500 }
  );
 }

 const { messages } = await req.json();

 const options = {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify({
   contents: messages.map((m: any) => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.content }],
   })),
  }),
 };

 const timeoutPromise = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('Request timeout')), 30000)
 );

 try {
  const response = (await Promise.race([
   fetch(`${api_url}?key=${api_key}`, options),
   timeoutPromise,
  ])) as Response;

  if (!response.ok) {
   const text = await response.text();
   console.error('Erro na API do Gemini:', response.status, text);
   return new NextResponse(
    JSON.stringify({
     error: 'Erro na API do Gemini',
     status: response.status,
     details: text,
    }),
    { status: 500 }
   );
  }

  const data = await response.json();

  const content =
   data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;

  if (!content) {
   console.error('Nenhuma resposta da IA recebida');
   return new NextResponse(
    JSON.stringify({ error: 'Nenhuma resposta da IA' }),
    { status: 500 }
   );
  }

  return new NextResponse(JSON.stringify({ content }), { status: 200 });
 } catch (error) {
  console.error('Erro interno no servidor:', error);
  return new NextResponse(
   JSON.stringify({
    error: 'Erro interno no servidor',
    details: String(error),
   }),
   { status: 500 }
  );
 }
}
