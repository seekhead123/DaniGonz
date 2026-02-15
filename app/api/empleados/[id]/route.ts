import { NextResponse } from 'next/server';
import { empleadoCrud } from '../../utils';

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const empleado = empleadoCrud.getById(Number(id));

    if (!empleado) {
        return NextResponse.json({ error: 'Empleado no encontrado' }, { status: 404 });
    }

    return NextResponse.json(empleado);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const { nombres, apellidos, correo, rut, area_id } = await request.json();

    const empleado = empleadoCrud.update(
        Number(id),
        nombres,
        apellidos,
        correo,
        rut,
        area_id || null
    );
    return NextResponse.json(empleado);
}

export async function DELETE(
    _: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    empleadoCrud.delete(Number(id));
    return new NextResponse(null, { status: 204 });
}
