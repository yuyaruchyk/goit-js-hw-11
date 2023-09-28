import axios from "axios";

export { getImage };

    
    const baseUrl = 'https://pixabay.com/api/';
const apiKey = '39696630-76278aa8e60be2b194df9a30b';

async function getImage(searchQuery) {
  try {
      const response = await axios.get(`${baseUrl}?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`);
      console.log(response.data); 
  } catch (error) {
    console.error(error);
  }
}
 



