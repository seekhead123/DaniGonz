const Database = require('better-sqlite3');

const db = new Database('database.db');

const areaCrud = {
  getAll: () => db.prepare('SELECT * FROM areas').all(),
  
  getById: (id) => db.prepare('SELECT * FROM areas WHERE id = ?').get(id),
  
  create: (nombre, supervisorId = null) => {
    const stmt = db.prepare('INSERT INTO areas (nombre, supervisor_id) VALUES (?, ?)');
    const result = stmt.run(nombre, supervisorId);
    return { id: result.lastInsertRowid, nombre, supervisor_id: supervisorId };
  },
  
  update: (id, nombre, supervisorId = null) => {
    const stmt = db.prepare('UPDATE areas SET nombre = ?, supervisor_id = ? WHERE id = ?');
    stmt.run(nombre, supervisorId, id);
    return areaCrud.getById(id);
  },
  
  delete: (id) => db.prepare('DELETE FROM areas WHERE id = ?').run(id),
};

const empleadoCrud = {
  getAll: () => db.prepare('SELECT * FROM empleados').all(),
  
  getById: (id) => db.prepare('SELECT * FROM empleados WHERE id = ?').get(id),
  
  create: (nombres, apellidos, correo, rut, areaId = null) => {
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
  
  update: (id, nombres, apellidos, correo, rut, areaId = null) => {
    const stmt = db.prepare(
      'UPDATE empleados SET nombres = ?, apellidos = ?, correo = ?, rut = ?, area_id = ? WHERE id = ?'
    );
    stmt.run(nombres, apellidos, correo, rut, areaId, id);
    return empleadoCrud.getById(id);
  },
  
  delete: (id) => db.prepare('DELETE FROM empleados WHERE id = ?').run(id),
};

module.exports = { db, areaCrud, empleadoCrud };
