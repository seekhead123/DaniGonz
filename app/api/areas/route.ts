import { NextResponse } from 'next/server';
import { areaCrud } from '../utils';

export async function GET() {
  const areas = areaCrud.getAll();
  return NextResponse.json(areas);
}

export async function POST(request: Request) {
  const { nombre, supervisor_id } = await request.json();
  const area = areaCrud.create(nombre, supervisor_id || null);
  return NextResponse.json(area, { status: 201 });
}
