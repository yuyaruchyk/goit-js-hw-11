import axios from 'axios';

export default class GetImageApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;

    

  }

  async getImage(searchQuery) {
    
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=39696630-76278aa8e60be2b194df9a30b&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
      this.incrementPage();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }
  incrementPage() {
    this.page += 1;

  }
  
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery; 
  }
}


   





    
 
 



