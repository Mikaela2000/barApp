const API_URL = 'http://localhost:3001';



export async function createBar(barData) {
  console.log('Enviando datos al backend:', barData);
  const res = await fetch(`${API_URL}/bars/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(barData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error);
  }

  return res.json();
}

export async function fetchBars() {
  try {
    const res = await fetch(`${API_URL}/bars`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error al obtener los datos');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching bars:', error);
    return [];
  }
}

export async function fetchBarById(id) {
  try {
    const res = await fetch(`${API_URL}/bars/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching bar ${id}:`, error);
    return null;
  }
}

export async function updateBar(id, barData) {
  const res = await fetch(`${API_URL}/bars/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(barData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error);
  }

  return res.json();
}


export async function deleteBar(id) {
  const res = await fetch(`${API_URL}/bars/delete/${id}`, {
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
  });
  
  return res.ok;
}

export async function generateDescription(descripcionAnterior) {
  const res = await fetch('http://localhost:3001/generate-description', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descripcionAnterior,
    }),
  });

  if (!res.ok) {
    throw new Error('Error al generar la descripción con la IA');
  }

  return res.json();
}

export async function checkDuplicate(nuevoNombre, listaNombresExistentes) {
  const res = await fetch('http://localhost:3001/check-duplicate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nuevoNombre,
      listaNombresExistentes,
    }),
  });

  if (!res.ok) {
    throw new Error('Error al verificar duplicados');
  }

  return res.json();
}