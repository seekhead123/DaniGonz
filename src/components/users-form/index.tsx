"use client"
import { Usuario } from "@/app/ListaUsuarios/page";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import { useState } from "react";


export default function UsersForm() {
    const [formData, setFormData] = useState<Usuario>({nombre: "", email:""});

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value })
        console.log("TTTTTTTTT", name, value)
    }
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Usuario enviado:", formData);
    };

    return <form onChange={handleChange} onSubmit={handleSubmit} className="space-y-4 max-w-md rounded-md border p-4"
    >
        <h2 className="text-lg font-semibold">Editar Usuario</h2>
        <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
                type="text"
                name="nombre"
                defaultValue={formData.nombre}
                className="w-full rounded border px-3 py-2"
                required
            ></input>
        </div>
        <div>
            <label className="block text-sm font-medium">Email</label>
            <input
                type="email"
                name="email"
                defaultValue={formData.email}
                className="w-full rounded border px-3 py-2"
                required

            ></input>
        </div>

        <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
            Guardar
        </button>
    </form>;

}