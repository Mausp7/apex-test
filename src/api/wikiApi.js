import axios from 'axios';
import message from "../util/message";

const getWikiId = async (movieName) => {
    try {
			const response = await axios.get(
				`https://en.wikipedia.org/w/api.php?
					action=query&
					list=search&
					format=json&
					origin=*&
					srsearch=${movieName} film`
			);

			return response;

    } catch (error) {
        if (!error.response) return error;
        message(error.response.data.message ? error.response.data.message : error.response.data);
        return error.response;
    };
};

const getWikiPage = async (wikiId) => {
    try {
				const response = await axios.get(
					`https://en.wikipedia.org/w/api.php?
						action=query&
						prop=info&
						inprop=url&
						format=json&
						origin=*&
						pageids=${wikiId}`
				);
				return response;
    } catch (error) {
        if (!error.response) return error;
        message(error.response.data.message ? error.response.data.message : error.response.data);
        return error.response;
    };
};

const getWikiExtract = async (pageId) => {
    try {
		const response = await axios.get(
			`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&pageids=${pageId}`
		);

		return response;

    } catch (error) {
        if (!error.response) return error;
        message(error.response.data.message ? error.response.data.message : error.response.data);
        return error.response;
    };
};

export {getWikiId, getWikiPage, getWikiExtract};