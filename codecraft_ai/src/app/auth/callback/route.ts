import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const next = '/code-generator-dashboard';
  return NextResponse.redirect(`${origin}${next}`);
}