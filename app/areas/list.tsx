'use client'

import { InputEvent, SubmitEvent, useRef, useState } from 'react'
import { Area, Empleado } from './dto'

import './areas.css'

const newArea: Area = {
  id: 0,
  nombre: '',
  supervisor_id: null,
  supervisor_nombre: '',
  empleados_count: 0,
}

interface AreasListProps {
  areas: Area[]
  empleados: Empleado[]
}

export default function AreasList(props: AreasListProps) {
  const { empleados } = props

  const [areas, setAreas] = useState(props.areas)
  const [formData, setFormData] = useState({ ...newArea })

  const dialogRef = useRef<HTMLDialogElement>(null)

  function resetForm() {
    setFormData({ ...newArea })
  }

  function closeDialog() {
    dialogRef.current?.close()
    resetForm()
  }

  function handleInputChange(e: InputEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.currentTarget

    switch (name) {
      case 'nombre':
        setFormData({ ...formData, nombre: value })
        break

      case 'supervisor':
        setFormData({ ...formData, supervisor_id: Number(value) })
        break

      default:
        console.error(new Error(`input name not recognized: ${name}`))
        break
    }
  }
  function handleClickNuevo() {
    resetForm()
    dialogRef.current?.showModal()
  }

  function handleClickEdit(area: Area) {
    setFormData({ ...area })
    dialogRef.current?.showModal()
  }

  async function handleSubmitForm(e: SubmitEvent<HTMLFormElement>) {
    console.log({ e }, 'aksldjhflaksjhdf')
    e.preventDefault()

    // TODO: validate form

    let url = '/api/areas/'
    if (formData.id) {
      url += formData.id
    }

    const res = await fetch(url, {
      method: formData.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!res.ok) {
      alert('ERROR! ' + res.statusText)
      return
    }

    updateList()
    closeDialog()
  }

  async function updateList() {
    const listRes = await fetch('/api/areas')

    if (!listRes.ok) {
      console.warn(listRes)
      // If for some reason the list cannot be updated, we refresh the page
      location.reload()
      return
    }

    const areasData = await listRes.json()
    setAreas(areasData)
  }

  async function handleClickDelete() {
    await fetch(`/api/areas/${formData.id}`, { method: 'DELETE' })
    updateList()
    closeDialog()
  }

  return (
    <div className="page">
      <header>
        <h1>Áreas</h1>
        <button className="boton" onClick={handleClickNuevo}>
          + Nueva Área
        </button>
      </header>

      <ul className="lista">
        {areas.map((area) => (
          <li key={area.id} className="item" onClick={() => handleClickEdit(area)}>
            <div className="info">
              <span className="nombre">{area.nombre}</span>
              <div className="meta">
                <span>
                  {area.empleados_count || 0} empleado
                  {area.empleados_count !== 1 ? 's' : ''}
                </span>
                <span>{area.supervisor_nombre}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="dialog">
        <h2>{formData.id ? 'Editar Área' : 'Nueva Área'}</h2>
        <form className="form" onSubmit={handleSubmitForm}>
          <label htmlFor="nombre">
            Nombre
            <input id="nombre" name="nombre" type="text" value={formData.nombre} onInput={handleInputChange} required />
          </label>
          <label htmlFor="supervisor">
            Supervisor
            <select
              id="supervisor"
              name="supervisor"
              value={formData.supervisor_id?.toString() ?? ''}
              onInput={handleInputChange}
            >
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
            <button type="button" className="boton boton-secundario" onClick={closeDialog}>
              Cancelar
            </button>

            {formData.id ? (
              <button type="button" className="boton" onClick={handleClickDelete}>
                Eliminar
              </button>
            ) : null}
          </div>
        </form>
      </dialog>
    </div>
  )
}
