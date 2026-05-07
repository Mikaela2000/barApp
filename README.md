
🟡 Descripcion del Proyecto

Esta aplicación permite gestionar diferentes bares de la provincia de Tucumán integrando herramientas de Inteligencia Artificial 
para asistir en la redacción de descripciones y en la validación de nombres duplicados, . 
Mediante la técnica de web scraping aplicada sobre el enlace de La Noche de las Birrerías, 
pude extraer la información correspondiente a los establecimientos.
Enlace: https://lanochedelasbirrerias.com.ar/cerveceria/page/4/?s=Tucum%C3%A1n&business_location

------------------------------------------------------------------------ 
🟢 Características principales

- Generación de Descripciones con IA: Utiliza Gema a través de Ollama para reescribir y mejorar las descripciones de los establecimientos de manera automática, 
manteniendo el contexto original de alguna descripción previa.

- Detección Inteligente de Nombres Duplicados: Valida en tiempo real si un nuevo nombre ingresado es similar a otros ya existentes en la 
base de datos sin necesidad de coincidencia exacta, avisando al usuario directamente en la interfaz mediante una aviso (utilizando IA).

- Gestión Completa (CRUD): Permite realizar todas las operaciones de lectura, creación, actualización y 
eliminación de los establecimientos de forma sencilla e integrada con las herramientas de IA.

- Borrado lógico: en lugar de eliminar la información de las tarjetas directamente de la base de datos, implementé el borrado lógico. En el modelo de base de datos, 
en la tabla Bar, existe un campo "is_active" del tipo booleano, asi que cada vez que se elimina una tarjeta este campo pasa a ser falso.

- Extracción de datos: Recopilación de bares e información de locales mediante técnicas de web scraping.

- Automatización del flujo de trabajo: Ejecución automática para la sincronización y la carga de datos en la BD mediante un WorkFlow en n8n

- Gestión de Sincronización y Notificaciones: Ejecución controlada de la carga de datos mediante scripts integrados y envío de reportes de estado (logs) por correo electrónico.

- Historial de Cambios: Implementé un sistema de registro automático utilizando Hooks de Sequelize. Cada vez que un establecimiento es editado, el sistema guarda una copia del estado anterior y el nuevo en una tabla de historial (Historial.js) usando el formato JSONB de PostgreSQL.

------------------------------------------------------------------------

🔵 Estructura del Proyecto

app-arTuc/
├── tucuman-bares(FE)/
│   ├── app/    
│   ├── components/ 
│   ├── services/     
│   └── utils        
└── tucuman-bares-sv(BE)/
    ├── controllers/      
    ├── handlers/      
    ├── models/ 
    ├── routes/   
    ├── scraper/ 
    └── index.js        

---------------------------------------------------------------------

🟣 Instalación y Configuración

1- Tener instalado Ollama en tu máquina o servidor.

2- Pasos de ejecución
   a- Clonar el repositorio: git clone <https://github.com/Mikaela2000/barApp.git>
   b-Instalar dependencias del Backend:
        cd tucuman-bares-sv 
        npm install

3- Iniciar el servidor:
        npm run dev

4- Instalar y ejecutar el Frontend:
        cd ../tucuman-bares
        npm install
        npm run dev

-----------------------------------------------------------------------

⚫ Endpoints de la API

- POST:   "/generate-description"  ----> Genera una nueva descripción basada en el contexto anterior usando IA.
- POST:   "/check-duplicate"  ----> Verifica si un nombre es duplicado o similar mediante IA.
- POST:    "/bars/create" ----> Permite crear un nuevo bar manualmente y cargarlo en la BD.
- GET:    "/sync-bars" ----> realiza el proceso de scraping y carga los datos en BD
- GET:    "/bars" ----> Obtiene la lista completa de todos los establecimientos registrados en la base de datos.
- PUT:    "/bars/delete/:id" ----> Marca un establecimiento específico como inactivo utilizando su identificador único.
- PUT:    "/bars/:id" ----> Actualiza los datos de un establecimiento existente en la base de datos.
- GET:    "/bars/:id" ----> Obtiene los datos detallados de un establecimiento en particular.

-----------------------------------------------------------------------

🟠 Automatización de Sincronización de Establecimientos

Es un módulo de automatización para la ejecución periódica y el monitoreo de la carga de datos de establecimientos.

Características Principales

- Flujo de trabajo automático: implementé un flujo de trabajo en n8n que actúa como orquestador del sistema disparando la sincronización automática. 
Su función principal es disparar el proceso de scraping de forma automática y desatendida

![configuracion del nodo](/utils/image.png) ![workFlow funcionando](/utils/image-1.png) ![alt text](/utils/config.png)

- Sincronización Integrada: Realiza llamadas mediante un script al endpoint del backend (/sync-bars) para iniciar la lógica de carga e inserción de datos "script_automatico.js". (Otra forma de cargar los datos mediante un scrpt)

- Notificaciones en Tiempo Real: Envío automático de correos electrónicos con reportes de estado (Éxito / Fallido) utilizando nodemailer.

- Monitoreo y Logs: Registro en consola de cada evento con marcas de tiempo (fecha y hora) para facilitar la auditoría y el debugging.

Prerrequisitos e Instalación
Para que el script funcione correctamente en el entorno del servidor, nos aseguramos de tener instaladas las siguientes dependencias:

- npm install node-fetch@2 nodemailer 

Configuración

- Credenciales de correo: Necesitas generar una Contraseña de aplicación de 16 dígitos en tu cuenta de Google
para poder enviar correos a través del servicio SMTP de Gmail de forma segura.

- Endpoint del servidor: Nos aseguremos de que el backend se encuentre corriendo en el puerto 3001 antes de ejecutar el proceso.


🟤 Uso y Ejecución

1. Ejecución Manual
Para probar la sincronización de manera inmediata y enviar el reporte de prueba hay que ejecutar:

node script_automatico.js

-----------------------------------------------------------------------------------------------------

🔴 Monitoreo y Resultados (Logs)
El sistema genera dos tipos de seguimiento:

- Consola: Muestra el inicio, el éxito/error de la petición al servidor y el estado de la notificación por correo.

- Reporte por Correo: * Asunto (Éxito): [ÉXITO] Sincronización Automática de Bares

Asunto (Error): [ERROR] Sincronización Automática de Bares

Cuerpo: Incluye la fecha, hora, estado y el detalle del mensaje arrojado por el sistema.

------------------------------------------------------------------------------

⚪ Configuración de Variables de Entorno (.env)

El proyecto utiliza variables de entorno para gestionar credenciales sensibles y configuraciones de red. Estas deben almacenarse en un archivo 
.env en la raíz de la carpeta del servidor (backend).

Variables requeridas
Asegúrate de configurar los siguientes parámetros dentro del archivo:

Fragmento de código
# Configuración del Servidor
PORT=3001

# Configuración de la Base de Datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_NAME=nombre_de_tu_db
DB_PORT=5432

# Credenciales para Notificaciones (Gmail)
GMAIL_USER=tu-correo@gmail.com
GMAIL_PASS=xxxx-xxxx-xxxx-xxxx  # Contraseña de aplicación de 16 dígitos

------------------------------------------------------------------------------

🔵 Persistencia de Datos (Base de Datos)

Tecnologías utilizadas:
PostgreSQL: Motor de base de datos relacional elegido por su fiabilidad, 
soporte para tipos de datos complejos y excelente rendimiento.

Sequelize (ORM): Herramienta de mapeo objeto-relacional para Node.js que permite interactuar con la base de datos utilizando objetos JavaScript en lugar de SQL puro, 
facilitando las migraciones y la integridad referencial.


-------------------------------------------------------------------------------

🟡 Criterio técnico

1) ¿Cómo evitás duplicados?
Para evitar duplicado en primer lugar agregué una detección semántica con IA (checkDuplicateWithAI ubicada en la carpeta handlers). Le asigne un prompt detallado para quetenga en cuenta variaciones leves en el nombre o nombres muy similares, implementé un servicio que utiliza el modelo Gemma. El sistema le envia el nuevo nombre y la lista de nombres existentes a la IA y el modeo analiza el significado y la estructura de las palabras ignorando términos genéricos.
También en el backend utilizo el método findOrCreate de Squelize, donde realiza una operación de búsqueda y, si no existe, creación. Define el campo nombre como criterio de búsqueda.

2) ¿Cómo escalarías este sistema?
En primer lugar podría separar el motor de scraping y ek servicio de IA en servicios independientes para que el procesamiento persado no afecte a la disponibilidad de la API.
Desde el lado del Cliente implementaria una gestión de estados global utilizando Redux para que la interfax de usuario reaccione de forma mas fluida a los cambios.
Actualmente las imágenes se manejan mediante URLs externas, así que implementaría una integración directa con Cloudinary para que los usuarios suban fotos directamente desde sus dispositivos.

3) ¿Qué problemas puede tener este flujo?
Uno de los problemas es la dependencia de terceros; Si el sitio web de donde extraigo la información cambia su estructura HTML, el scraper fallará. Requiere mantenimiento constante o el uso de APIs oficiales.
También el uso de lenguajes locales de IA puede ser lento dependiendo deel hardware.

4) ¿Cómo mejorarías la calidad de los datos?
Para mejorar la calidad de los datos, podría realizar una integración con la API de Google Maps, para autocompletar direcciones y evitar errores humanos.
También podriía utilizar IA para que me limpie nombres mal escritos o con errores de tipografía