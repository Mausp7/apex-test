import { useState } from "react";

import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import { getWikiId, getWikiPage } from "../api/wikiApi";
import MovieDetails from "./MovieDetails";
import Spinner from "../util/Spinner";

const MovieCard = ({ movie, setInputText, getSearchResults }) => {
	const [movieDetails, setMovieDetails] = useState(null);
	const [spinner, setSpinner] = useState(false);

	const getMovieDetais = async () => {
		setSpinner(true);

		const wikiIdResponse = await getWikiId(movie.name);
		if (wikiIdResponse.status !== 200) return setSpinner(false);

		const wikiPageId = wikiIdResponse.data.query.search[0].pageid;
		const wikiPageResponse = await getWikiPage(wikiPageId);
		if (wikiPageResponse.status !== 200) return setSpinner(false);

		setMovieDetails(wikiPageResponse.data.query.pages[wikiPageId]);
		setSpinner(false);
	};

	return (
		<>
			<Grid
				item
				xs={12}
				sm={movieDetails ? 12 : 6}
				md={movieDetails ? 12 : 4}
				lg={movieDetails ? 6 : 3}
				xl={movieDetails ? 6 : 2}
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					minHeight: "250px",
				}}
			>
				<h3 style={{ minHeight: "45px", textAlign: "center" }}>
					{movie.name} ({new Date(movie.releaseDate).getFullYear()})
				</h3>

				<p style={{ textAlign: "center" }}>
					Genre:{" "}
					{movie.genres.length !== 0
						? movie.genres.map((genre) => genre.name).join(", ")
						: "Unknown"}
				</p>

				<p>Rating: {movie.score > 0 ? movie.score.toFixed(1) : "Not rated"}</p>

				{spinner && <Spinner />}
				{movieDetails && (
					<MovieDetails
						movie={movie}
						movieDetails={movieDetails}
						setMovieDetails={setMovieDetails}
					/>
				)}

				<div style={{ width: "100%" }}>
					<Button
						variant="outlined"
						fullWidth={true}
						onClick={(event) => {
							setInputText(movie.name);
							getSearchResults(event, movie.name);
						}}
					>
						Show related movies
					</Button>

					{movieDetails ? (
						<Button
							variant="contained"
							fullWidth={true}
							style={{ margin: "10px 0px" }}
							onClick={() => setMovieDetails(null)}
						>
							Close
						</Button>
					) : (
						<Button
							variant="contained"
							fullWidth={true}
							style={{ margin: "10px 0px" }}
							onClick={getMovieDetais}
						>
							Show more details
						</Button>
					)}
				</div>
			</Grid>
		</>
	);
};

export default MovieCard;
