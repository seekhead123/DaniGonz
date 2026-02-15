import Database from 'better-sqlite3';
import { readFileSync } from 'fs';
import { join } from 'path';

const db = new Database('database.db');

const schema = readFileSync(join(process.cwd(), 'db', 'schema.sql'), 'utf-8');
db.exec(schema);

export const areaCrud = {
  getAll: () => db.prepare('SELECT * FROM areas').all(),
  
  getById: (id: number) => db.prepare('SELECT * FROM areas WHERE id = ?').get(id),
  
  create: (nombre: string, supervisorId: number | null = null) => {
    const stmt = db.prepare('INSERT INTO areas (nombre, supervisor_id) VALUES (?, ?)');
    const result = stmt.run(nombre, supervisorId);
    return { id: result.lastInsertRowid, nombre, supervisor_id: supervisorId };
  },
  
  update: (id: number, nombre: string, supervisorId: number | null = null) => {
    const stmt = db.prepare('UPDATE areas SET nombre = ?, supervisor_id = ? WHERE id = ?');
    stmt.run(nombre, supervisorId, id);
    return areaCrud.getById(id);
  },
  
  delete: (id: number) => db.prepare('DELETE FROM areas WHERE id = ?').run(id),
};

export const empleadoCrud = {
  getAll: () => db.prepare('SELECT * FROM empleados').all(),
  
  getById: (id: number) => db.prepare('SELECT * FROM empleados WHERE id = ?').get(id),
  
  create: (nombres: string, apellidos: string, correo: string, rut: string, areaId: number | null = null) => {
    const stmt = db.prepare(
      'INSERT INTO empleados (nombres, apellidos, correo, rut, area_id) VALUES (?, ?, ?, ?, ?)'
    );
    const result = stmt.run(nombres, apellidos, correo, rut, areaId);
    return { 
      id: result.lastInsertRowid, 
      nombres, 
      apellidos, 
      correo, 
      rut, 
      area_id: areaId 
    };
  },
  
  update: (id: number, nombres: string, apellidos: string, correo: string, rut: string, areaId: number | null = null) => {
    const stmt = db.prepare(
      'UPDATE empleados SET nombres = ?, apellidos = ?, correo = ?, rut = ?, area_id = ? WHERE id = ?'
    );
    stmt.run(nombres, apellidos, correo, rut, areaId, id);
    return empleadoCrud.getById(id);
  },
  
  delete: (id: number) => db.prepare('DELETE FROM empleados WHERE id = ?').run(id),
};
