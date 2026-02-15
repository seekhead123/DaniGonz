import { NextResponse } from 'next/server';
import { empleadoCrud } from '../utils';

export async function GET() {
    const empleados = empleadoCrud.getAll();
    return NextResponse.json(empleados);
}

export async function POST(request: Request) {
    const { nombres, apellidos, correo, rut, area_id } = await request.json();
    const empleado = empleadoCrud.create(nombres, apellidos, correo, rut, area_id || null);
    return NextResponse.json(empleado, { status: 201 });
}
