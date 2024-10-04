"use client"; // Indica que este componente es un componente de cliente y puede usar hooks de React como useState y useEffect.

import { useEffect, useState } from 'react'; // Importa hooks necesarios de React.
import Image from 'next/image'; // Importa el componente de imagen optimizada de Next.js.
import user_icon from '../../public/assets/icons/person.svg'; // Icono del usuario.
import email_icon from '../../public/assets/icons/email.svg'; // Icono del correo.
import password_icon from '../../public/assets/icons/password.svg'; // Icono de la contraseña.
import bg_vec from '../../public/assets/bg/pc/Vector.svg'; // Imagen de fondo para pantallas grandes (mancha).
import bg_vecC from '../../public/assets/bg/pc/VectorC.svg'; // Imagen de fondo secundaria para pantallas grandes (circulos).
import bg_vecM from '../../public/assets/bg/cel/Vector.svg'; // Imagen de fondo para pantallas pequeñas (mancha).
import bg_vecCM from '../../public/assets/bg/cel/VectorC.svg'; // Imagen de fondo secundaria para pantallas pequeñas (circulos).

export default function Signup() {
  // Estado para manejar las imágenes de fondo, inicializadas para pantallas grandes.
  const [bgImage, setBgImage] = useState({ primary: bg_vec, secondary: bg_vecC });

  useEffect(() => {
    // Función para manejar el cambio de tamaño de la ventana.
    const handleResize = () => {
      // Cambia las imágenes de fondo dependiendo del ancho de la ventana.
      if (window.innerWidth < 640) {
        setBgImage({ primary: bg_vecM, secondary: bg_vecCM });
      } else {
        setBgImage({ primary: bg_vec, secondary: bg_vecC });
      }
    };

    // Llama a la función de manejo de tamaño de ventana al cargar el componente.
    handleResize();

    // Agrega un listener para el evento de cambio de tamaño de la ventana.
    window.addEventListener('resize', handleResize);

    // Limpia el listener al desmontar el componente.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // La dependencia vacía significa que esto solo se ejecutará al montar y desmontar el componente.

  return (
    <div
      className="signup grid place-items-center min-h-screen bgBlue px-4 bg-no-repeat" // Clases de Tailwind para diseño.
      style={{
        backgroundImage: `url(${bgImage.primary.src}), url(${bgImage.secondary.src})`, // Establece las imágenes de fondo.
        backgroundPosition: 'right top, left bottom', // Posiciona las imágenes.
        backgroundSize: 'contain, auto', // Escala las imágenes de fondo.
      }}
    >
      <div className="signup__container w-full text-center"> {/* Contenedor principal del formulario. */}
        <h1 className="signup__title text-4xl sm:text-5xl lg:text-6xl font-montserrat text-white font-light">
          REGISTRATE {/* Título principal. */}
        </h1>
        <h3 className="signup_subtitle text-xl sm:text-2xl lg:text-3xl font-montserrat text-white my-4 font-light lg:w-full">
          Y EMPIEZA A GESTIONAR TUS TAREAS ACADÉMICAS {/* Subtítulo. */}
        </h3>
        <form className="signup__form my-8 text-center mt-14 w-full sm:w-3/4 lg:w-1/4 mx-auto"> {/* Formulario de registro. */}
          <div className="signup__form-group flex items-center border border-white rounded-md w-3/4 sm:w-full mx-auto p-2 my-4">
            <Image src={user_icon} alt="user icon" className="signup__icon p-0" width={20} height={20} /> {/* Icono de usuario. */}
            <input
              type="text"
              className="signup__input border-none text-base w-5/6 bg-transparent text-white placeholder:text-white font-montserrat ml-2 focus:outline-none" // Input para el nombre de usuario.
              placeholder="USUARIO"
            />
          </div>
          <div className="signup__form-group flex items-center border border-white rounded-md w-3/4 sm:w-full mx-auto p-2 my-4">
            <Image src={email_icon} alt="email icon" className="signup__icon p-0" width={20} height={20} /> {/* Icono de correo. */}
            <input
              type="email"
              className="signup__input border-none text-base w-5/6 bg-transparent text-white placeholder:text-white font-montserrat ml-2 focus:outline-none" // Input para el correo electrónico.
              placeholder="CORREO ELECTRONICO"
            />
          </div>
          <div className="signup__form-group flex items-center border border-white rounded-md w-3/4 sm:w-full mx-auto p-2 my-4">
            <Image src={password_icon} alt="password icon" className="signup__icon p-0" width={20} height={20} /> {/* Icono de contraseña. */}
            <input
              type="password"
              className="signup__input border-none text-base w-5/6 bg-transparent text-white placeholder:text-white font-montserrat ml-2 focus:outline-none" // Input para la contraseña.
              placeholder="CONTRASEÑA"
            />
          </div>
          <button className="signup__btn border border-white my-4 w-1/2 sm:w-full p-2 rounded-md bg-white text-blue-700 font-montserrat text-base font-semibold shadow-lg">
            REGISTRATE {/* Botón para enviar el formulario. */}
          </button>
        </form>
      </div>
    </div>
  );
}
