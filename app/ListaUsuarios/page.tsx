"use client"
import UsersList from "@/src/components/users-lists";
import { FC, useEffect, useState } from "react";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

const ListaUsuarios : FC = () => {
  /*Funcion  */
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener usuarios");
        }
        return res.json();
      })
      .then((data) => {
        const usuariosMapeados: Usuario[] = data.map((u: any) => ({
          id: u.id,
          nombre: u.name,
          email: u.email,
        }));

        setUsuarios(usuariosMapeados);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (usuarios.length === 0)
    return <p className="text-gray-500">No hay usuarios para mostrar.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Lista de Usuarios</h2>

  
      <UsersList users={usuarios}></UsersList>
    </div>
    
  );
};

export default ListaUsuarios;
