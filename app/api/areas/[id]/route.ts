import { NextResponse } from 'next/server';
import { areaCrud } from '../../utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const area = areaCrud.getById(Number(id));
  
  if (!area) {
    return NextResponse.json({ error: 'Area no encontrada' }, { status: 404 });
  }
  
  return NextResponse.json(area);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { nombre, supervisor_id } = await request.json();
  
  const area = areaCrud.update(Number(id), nombre, supervisor_id || null);
  return NextResponse.json(area);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  areaCrud.delete(Number(id));
  return new NextResponse(null, { status: 204 });
}
