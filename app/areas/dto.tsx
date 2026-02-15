
export interface Area {
    id: number
    nombre: string
    supervisor_id: number | null
    supervisor_nombre: string
    empleados_count: number
}

export interface Empleado {
    id: number
    nombres: string
    apellidos: string
}
