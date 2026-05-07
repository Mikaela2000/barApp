
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
base de datos sin necesidad de coincidencia exacta, avisando al usuario directamente en la interfaz mediante una aviso.

- Gestión Completa (CRUD): Permite realizar todas las operaciones de lectura, creación, actualización y 
eliminación de los establecimientos de forma sencilla e integrada con las herramientas de IA.

- Borrado lógico: en lugar de eliminar la información de las tarjetas directamente de la base de datos, implementé el borrado lógico. En el modelo de base de datos, 
en la tabla Bar, existe un campo "is_active" del tipo booleano, asi que cada vez de que se elimina una tarjeta este campo pasa a ser falso.

- Extracción de datos: Recopilación de bares e información de locales mediante técnicas de web scraping.

- Automatización y Notificaciones: Ejecución automática de la sincronización de datos mediante un script y envío de reportes de estado (logs) por correo electrónico.

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
   a- Clonar el repositorio: git clone <url-de-tu-repositorio>
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

⚫ Endoints de la API

- POST:   "/generate-description"  ----> Genera una nueva descripción basada en el contexto anterior usando IA.
- POST:   "/check-duplicate"  ----> Verifica si un nombre es duplicado o similar mediante IA.
- GET:    "/sync-bars" ----> realiza el proceso de scraping y carga los datos en BD
- GET:    "/bars" ----> Obtiene la lista completa de todos los establecimientos registrados en la base de datos.
- PUT:    "/bars/delete/:id" ----> Marca un establecimiento específico como inactivo utilizando su identificador único.
- PUT:    "/bars/:id" ----> Actualiza los datos de un establecimiento existente en la base de datos.
- GET:    "/bars/:id" ----> Obtiene los datos detallados de un establecimiento en particular.

-----------------------------------------------------------------------

🟠 Automatización de Sincronización de Establecimientos

Es un módulo de automatización para la ejecución periódica y el monitoreo de la carga de datos de establecimientos.

Características Principales
- Sincronización Integrada: Realiza llamadas mediante un script al endpoint del backend (/sync-bars) para iniciar la lógica de carga e inserción de datos.

- Notificaciones en Tiempo Real: Envío automático de correos electrónicos con reportes de estado (Éxito / Fallido) utilizando nodemailer.

- Monitoreo y Logs: Registro en consola de cada evento con marcas de tiempo (fecha y hora) para facilitar la auditoría y el debugging.

Prerrequisitos e Instalación
Para que el script funcione correctamente en el entorno de tu servidor, asegúrate de tener instaladas las siguientes dependencias:

- npm install node-fetch@2 nodemailer 

Configuración

- Credenciales de correo: Necesitas generar una Contraseña de aplicación de 16 dígitos en tu cuenta de Google
para poder enviar correos a través del servicio SMTP de Gmail de forma segura.

- Endpoint del servidor: Asegúrate de que tu backend se encuentre corriendo en el puerto 3001 antes de ejecutar el proceso.


🟤 Uso y Ejecución

1. Ejecución Manual
Para probar la sincronización de manera inmediata y enviar el reporte de prueba:

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