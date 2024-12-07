const API_URL = 'http://10.0.3.2:3000';
//const API_URL = 'http://localhost:3000/';


// Obtener datos (GET)
export const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
};

// Crear recurso (POST)
export const postData = async (endpoint: string, data:any) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  };