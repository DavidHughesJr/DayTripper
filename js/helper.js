// Used to get API data // 
export const getJSON = async (API) => {
  try {
     const response = await fetch(`${API}`);
     const data = await response.json();
     return data 
  } catch(err) {
    console.error(err.message);
  }
};


