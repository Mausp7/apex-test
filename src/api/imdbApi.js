import axios from 'axios';
import message from "../util/message";

const getImdbId = async (movieName) => {
    try {
			const response = await axios.get(
				`https://imdb-api.com/en/API/SearchMovie/${process.env.REACT_APP_IMDB_PUBLIC_KEY}/${movieName}`
			);
            
            if (response.data?.errorMessage) {
                message("IMDB error: " + response.data.errorMessage);
                return response.config;
            }

			return response;

    } catch (error) {
        if (!error.response) return error;
        message(error.response.data.message ? error.response.data.message : error.response.data);
        return error.response;
    };
};

export {getImdbId};