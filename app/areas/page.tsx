"use client";

import { useEffect, useRef, useState } from "react";
import "./areas.css";

interface Area {
    id: number;
    nombre: string;
    supervisor_id: number | null;
    supervisor_nombre: string;
    empleados_count: number;
}

interface Empleado {
    id: number;
    nombres: string;
    apellidos: string;
}


// function areasReducer
//
// function useAreas() {
//   const [areas, setAreas] = useState<Area[]>([]);
//
// }

export default function Page() {
    const [areas, setAreas] = useState<Area[]>([]);
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [areaEditando, setAreaEditando] = useState<Area | null>(null);
    const [esNuevo, setEsNuevo] = useState(false);
    const [nombre, setNombre] = useState("");
    const [supervisorId, setSupervisorId] = useState<string>("");

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        Promise.all([
            fetch("/api/areas").then(r => r.json()),
            fetch("/api/empleados").then(r => r.json()),
        ]).then(([areasData, empleadosData]) => {
            setAreas(areasData);
            setEmpleados(empleadosData);
        });
    }, []);

    const abrirCrear = () => {
        setEsNuevo(true);
        setAreaEditando(null);
        setNombre("");
        setSupervisorId("");
        dialogRef.current?.showModal();
    };

    const abrirEditar = (area: Area) => {
        setEsNuevo(false);
        setAreaEditando(area);
        setNombre(area.nombre);
        setSupervisorId(area.supervisor_id?.toString() || "");
        dialogRef.current?.showModal();
    };

    const cerrarDialog = () => {
        dialogRef.current?.close();
        setAreaEditando(null);
        setEsNuevo(false);
    };

    const guardar = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            nombre,
            supervisor_id: supervisorId ? parseInt(supervisorId) : null,
        };

        if (esNuevo) {
            await fetch("/api/areas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } else if (areaEditando) {
            await fetch(`/api/areas/${areaEditando.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }

        const res = await fetch("/api/areas");
        const areasData = await res.json();
        setAreas(areasData);

        cerrarDialog();
    };

    return (
        <div className="page">
            <header>
                <h1>Áreas</h1>
                <button className="boton" onClick={abrirCrear}>
                    + Nueva Área
                </button>
            </header>

            <ul className="lista">
                {areas.map((area) => (
                    <li
                        key={area.id}
                        className="item"
                        onClick={() => abrirEditar(area)}
                    >
                        <div className="info">
                            <span className="nombre">{area.nombre}</span>
                            <div className="meta">
                                <span>{area.empleados_count} empleado{area.empleados_count !== 1 ? "s" : ""}</span>
                                <span>{area.supervisor_nombre}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <dialog ref={dialogRef} className="dialog" onClick={(e) => {
                if (e.target === dialogRef.current) cerrarDialog();
            }}>
                <h2>{esNuevo ? "Nueva Área" : "Editar Área"}</h2>
                <form className="form" onSubmit={guardar}>
                    <label>
                        Nombre
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Supervisor
                        <select value={supervisorId} onChange={(e) => setSupervisorId(e.target.value)}>
                            <option value="">Sin supervisor</option>
                            {empleados.map((emp) => (
                                <option key={emp.id} value={emp.id}>
                                    {emp.nombres} {emp.apellidos}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="acciones">
                        <button type="submit" className="boton">
                            Guardar
                        </button>
                        <button type="button" className="boton boton-secundario" onClick={cerrarDialog}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}
