import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { getWikiExtract } from "../api/wikiApi";
import Spinner from "../util/Spinner";
import { getImdbId } from "../api/imdbApi";

const MovieCard = ({ movie, movieDetails }) => {
	const [wikiExtract, setWikiExtract] = useState(null);
	const [imdbLink, setImdbLink] = useState("");

	const getExtract = async () => {
		const response = await getWikiExtract(movieDetails.pageid);
		if (response.status !== 200) return setWikiExtract("");

		setWikiExtract(response.data.query.pages[movieDetails.pageid]);
	};

	const getImdbLink = async () => {
		const response = await getImdbId(movie.name);
		if (response.status !== 200) return;

		setImdbLink(`https://www.imdb.com/title/${response.data.results[0].id}`);
	};

	useEffect(() => {
		getExtract();
		getImdbLink();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h3>Wikipedia Extract:</h3>
			{wikiExtract ? (
				<p
					style={{}}
					dangerouslySetInnerHTML={{
						__html: wikiExtract.extract.split("</p><p>")[0],
					}}
				></p>
			) : (
				<Spinner />
			)}

			<Button
				variant="outlined"
				fullWidth={true}
				onClick={() => window.open(movieDetails.fullurl, { target: "_blank" })}
			>
				Read more on Wikipedia
			</Button>
			<Button
				variant="outlined"
				fullWidth={true}
				onClick={() =>
					window.open(imdbLink, {
						target: "_blank",
					})
				}
			>
				Read more on IMDB
			</Button>
		</>
	);
};

export default MovieCard;
