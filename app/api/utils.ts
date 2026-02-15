import db from '@/db/database'
import { Area, Empleado } from '../areas/dto'

export const areaCrud = {
  getAll: () => db.prepare('SELECT * FROM areas').all(),

  getAllWithDetails: () => {
    const r = db
      .prepare(
        `
            SELECT 
              a.*,
              COUNT(e.id) as empleados_count,
              COALESCE(e2.nombres || ' ' || e2.apellidos, 'Sin supervisor') as supervisor_nombre
            FROM areas a
            LEFT JOIN empleados e ON e.area_id = a.id
            LEFT JOIN empleados e2 ON e2.id = a.supervisor_id
            GROUP BY a.id
          `
      )
      .all()

    return r as Area[]
  },

  getById: (id: number) => db.prepare('SELECT * FROM areas WHERE id = ?').get(id),

  create: (nombre: string, supervisorId: number | null = null): number => {
    const stmt = db.prepare('INSERT INTO areas (nombre, supervisor_id) VALUES (?, ?)')
    const result = stmt.run(nombre, supervisorId)

    return Number(result.lastInsertRowid)
  },

  update: (id: number, nombre: string, supervisorId: number | null = null) => {
    const stmt = db.prepare('UPDATE areas SET nombre = ?, supervisor_id = ? WHERE id = ?')
    stmt.run(nombre, supervisorId, id)
    return areaCrud.getById(id)
  },

  delete: (id: number) => db.prepare('DELETE FROM areas WHERE id = ?').run(id),
}

export const empleadoCrud = {
  getAll: () => db.prepare('SELECT * FROM empleados').all() as Empleado[],

  getById: (id: number) => db.prepare('SELECT * FROM empleados WHERE id = ?').get(id),

  create: (nombres: string, apellidos: string, correo: string, rut: string, areaId: number | null = null) => {
    const stmt = db.prepare('INSERT INTO empleados (nombres, apellidos, correo, rut, area_id) VALUES (?, ?, ?, ?, ?)')
    const result = stmt.run(nombres, apellidos, correo, rut, areaId)
    return {
      id: result.lastInsertRowid,
      nombres,
      apellidos,
      correo,
      rut,
      area_id: areaId,
    }
  },

  update: (
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    rut: string,
    areaId: number | null = null
  ) => {
    const stmt = db.prepare(
      'UPDATE empleados SET nombres = ?, apellidos = ?, correo = ?, rut = ?, area_id = ? WHERE id = ?'
    )
    stmt.run(nombres, apellidos, correo, rut, areaId, id)
    return empleadoCrud.getById(id)
  },

  delete: (id: number) => db.prepare('DELETE FROM empleados WHERE id = ?').run(id),
}
