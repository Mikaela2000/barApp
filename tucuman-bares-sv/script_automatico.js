require('dotenv').config();
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function ejecutarSincronizacion() {
  const url = 'http://localhost:3001/sync-bars';
  const fechaActual = new Date().toLocaleString();

  console.log(`[${fechaActual}] Iniciando sincronización de establecimientos...`);

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error en el servidor ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[${fechaActual}] Sincronización exitosa.`);
    
    await enviarCorreo(true, 'La sincronización se ejecutó correctamente.', fechaActual);

  } catch (error) {
    console.error(`[${fechaActual}] Error durante la sincronización:`, error.message);
    await enviarCorreo(false, error.message, fechaActual);
  }
}

async function enviarCorreo(esExitoso, mensajeDetalle, fecha) {
  const asunto = esExitoso 
    ? '[ÉXITO] Sincronización Automática de Bares' 
    : '[ERROR] Sincronización Automática de Bares';

  const texto = `
Hola equipo,

El proceso automático de sincronización de establecimientos ha concluido.

- Fecha y hora: ${fecha}
- Estado: ${esExitoso ? 'Éxito' : 'Fallido'}
- Detalles: ${mensajeDetalle}

Atentamente,
El equipo de la app
  `;

  const mailOptions = {
    from: process.env.GMAIL_USER, 
    to: 'mikaelamonroy9@gmail.com', 
    subject: asunto,
    text: texto
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notificación por correo enviada con éxito.');
  } catch (emailError) {
    console.error('No se pudo enviar el correo de notificación:', emailError);
  }
}

ejecutarSincronizacion();