import axios from 'axios';
import message from "../util/message";

const searchTitle = async (inputText) => {
    try {
        const response = await axios.post(
			`https://tmdb.sandbox.zoosh.ie/dev/graphql`,
			{
				query: `query SearchMovies{
					searchMovies(query: "${inputText}") {
						id
						name
						releaseDate
						score
						genres {
							name
						}
					}
				}`,
			},
			{
				"Content-Type": "application/json",
				Accept: "application/json",
			}
		);
        return response;
    } catch (error) {
        if (!error.response) return error;
        message(error.response.data.message ? error.response.data.message : error.response.data);
        return error.response;
    };
};

export default searchTitle;