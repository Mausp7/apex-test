import { useState } from "react";
import Grid from "@mui/material/Grid";
import { getWikiId, getWikiPage } from "../api/wikiApi";
import MovieDetails from "./MovieDetails";
import Spinner from "../util/Spinner";

const MovieCard = ({ movie }) => {
	const [movieDetails, setMovieDetails] = useState(null);
	const [spinner, setSpinner] = useState(false);

	const showMovieDetais = async () => {
		setSpinner(true);

		const wikiIdResponse = await getWikiId(movie.name);

		if (wikiIdResponse.status === 200) {
			const wikiPageId = wikiIdResponse.data.query.search[0].pageid;
			const wikiPageResponse = await getWikiPage(wikiPageId);

			if (wikiPageResponse.status === 200) {
				setMovieDetails(wikiPageResponse.data.query.pages[wikiPageId]);
			}
		}

		setSpinner(false);
	};

	return (
		<>
			<Grid
				item
				xs={12}
				sm={movieDetails ? 12 : 6}
				md={movieDetails ? 8 : 4}
				lg={movieDetails ? 9 : 3}
				xl={movieDetails ? 6 : 2}
			>
				<h3 style={{ width: "100%", textAlign: "center" }}>
					{movie.name} ({new Date(movie.releaseDate).getFullYear()})
				</h3>
				<p>Genre: {movie.genres.map((genre) => genre.name).join(", ")}</p>

				<p>Rating: {movie.score.toFixed(1)}</p>
				{!movieDetails && <button onClick={showMovieDetais}>Show more</button>}
				{spinner && <Spinner />}
				{movieDetails && (
					<MovieDetails
						movie={movie}
						movieDetails={movieDetails}
						setMovieDetails={setMovieDetails}
					/>
				)}
			</Grid>
		</>
	);
};

export default MovieCard;
