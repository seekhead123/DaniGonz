import { areaCrud, empleadoCrud } from "../api/utils";
import AreasList from "./list"

export default async function Page() {
    const areas = areaCrud.getAllWithDetails();
    const empleados = empleadoCrud.getAll();

    return <AreasList areas={areas} empleados={empleados} />
}
