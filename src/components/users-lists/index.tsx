import { Usuario } from "@/app/ListaUsuarios/page";


interface UserListProps {
    users: Usuario[]
}
export default function UsersList({ users }: UserListProps) {

    return <ul className="divide-y rounded-md border">
        {users.map((users) => (
            <li key={users.id} className="p-4 hover:bg-gray-50">
                <p className="font-medium">{users.nombre}</p>
                <p className="text-sm text-gray-600">{users.email}</p>
            </li>
        ))}
    </ul>;
}