import { checkDuplicate } from '@/services/api';

export async function validarNombreDuplicado(nuevoNombre, listaBares, isEditing, nombreOriginal) {
  let listaNombres = listaBares.map(b => b.nombre);

  if (isEditing) {
    listaNombres = listaNombres.filter(n => n !== nombreOriginal);
  }

  const isDuplicate = await checkDuplicate(nuevoNombre, listaNombres);

  if (isDuplicate.esDuplicado) {
    return {
      esDuplicado: true,
      mensaje: `⚠ Este nombre es similar a "${isDuplicate.barSimilar}"`
    };
  }

  return { esDuplicado: false, mensaje: null };
}