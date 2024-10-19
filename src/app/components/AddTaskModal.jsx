
function EditTaskModal({ isOpen, onClose }) {
    // Si el modal no está abierto, no se renderiza
    if (!isOpen) return null;

    return (
      // Contenedor de fondo oscuro y semitransparente, que cubre toda la pantalla
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        {/* Modal con fondo, contenido centrado y sombra */}
        <div className="bg-custom-bg2 p-8 rounded-lg shadow-lg w-full max-w-lg sm:w-3/4 md:w-1/2 lg:w-1/3">
          {/* Título del modal */}
          <h2 className="text-3xl font-semibold mb-4 text-custom-color font-montserrat">
            Añadir Nueva Tarea
          </h2>
          {/* Formulario con campos de entrada espaciados verticalmente */}
          <form className="space-y-4">
            <div>
              {/* Etiqueta para el campo de nombre */}
              <label className="block text-sm font-medium text-gray-700 font-montserrat">
                Nombre de la Tarea
              </label>
              {/* Campo de texto para añadir el nombre */}
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-montserrat"
              />
            </div>
            <div>
              {/* Etiqueta para el campo de seleccion de columna */}
              <label className="block text-sm font-medium text-gray-700 font-montserrat">
                Columna
              </label>
            {/* Campo de selección de columna para añadir la tarea */}
            <select
                className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-montserrat mb-4 bg-white"
            >
                <option value="">Seleccionar Columna</option>
                <option value="tarea1">To Do</option>
                <option value="tarea2">In Progress</option>
                <option value="tarea3">Done</option>
            </select>
              <label className="block text-sm font-medium text-gray-700 font-montserrat">
                Descripción de la Tarea
              </label>
              {/* Campo de texto para añadir la descripcion */}
              <textarea
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-montserrat resize-none h-24"
              />
            </div>
          </form>
          {/* Botones de cancelar y guardar */}
          <div className="flex justify-end mt-6">
            {/* Botón para cerrar el modal */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 font-montserrat font-medium"
            >
              Cancelar
            </button>
            {/* Botón para guardar los cambios */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-custom-btn2 text-white rounded-md font-montserrat font-medium"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    );
  }

export default EditTaskModal;
