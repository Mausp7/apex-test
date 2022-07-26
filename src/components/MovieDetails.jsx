import { useEffect, useState } from "react";
import { getWikiExtract } from "../api/wikiApi";
import Spinner from "../util/Spinner";

const MovieCard = ({ movie, movieDetails, setMovieDetails }) => {
	const [wikiExtract, setWikiExtract] = useState(null);

	useEffect(() => {
		const getExtract = async () => {
			const response = await getWikiExtract(movieDetails.pageid);

			if (response.status === 200) {
				setWikiExtract(response.data.query.pages[movieDetails.pageid]);
			}
		};

		getExtract();
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
			<button
				onClick={() => window.open(movieDetails.fullurl, { target: "_blank" })}
			>
				Read more on Wikipedia
			</button>

			<button onClick={() => setMovieDetails(null)}>Close</button>
		</>
	);
};

export default MovieCard;
