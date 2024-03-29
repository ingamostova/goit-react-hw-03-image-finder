import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const KEY_URL = "key=31781224-f2235db9c919ebb7ef96866ff"
// let page = 1;

export const fetchImages = async (image, page) => {
    const response = await axios.get(
      `${BASE_URL}?${KEY_URL}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
    );
    // page += 1;
    // total += response.data.hits.length;
    return response.data;
}