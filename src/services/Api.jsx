import axios from "axios";

const API_KEY = "29162129-cd407d8c81083a7eed9c52ced";

export const ApiService = async (query, page) => {
    const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12`
    );
    return response.data
};