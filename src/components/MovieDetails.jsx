import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

import { getWikiExtract } from "../api/wikiApi";
import Spinner from "../util/Spinner";
import { getImdbId } from "../api/imdbApi";

const MovieCard = ({
	movie,
	movieDetails,
	setMovieDetails,
	setInputText,
	getSearchResults,
}) => {
	const [wikiExtract, setWikiExtract] = useState(null);

	const getExtract = async () => {
		const response = await getWikiExtract(movieDetails.pageid);
		if (response.status !== 200) return;
		if (response.data.errorMessage) return;

		setWikiExtract(response.data.query.pages[movieDetails.pageid]);
	};

	useEffect(() => {
		getExtract();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openImdbPage = async () => {
		const response = await getImdbId(movie.name);
		if (response.status !== 200) return;

		window.open(`https://www.imdb.com/title/${response.data.results[0].id}`, {
			target: "_blank",
		});
	};

	return (
		<Grid
			item
			xs={12}
			sm={12}
			md={8}
			lg={6}
			xl={4}
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				minHeight: "300px",
			}}
		>
			<h2 style={{ minHeight: "45px", textAlign: "center" }}>
				{movie.name} ({new Date(movie.releaseDate).getFullYear()})
			</h2>

			<p style={{ textAlign: "center" }}>
				Genre:{" "}
				{movie.genres.length !== 0
					? movie.genres.map((genre) => genre.name).join(", ")
					: "Unknown"}
			</p>

			<p style={{ textAlign: "center" }}>
				Rating: {movie.score > 0 ? movie.score.toFixed(1) : "Not rated"}
			</p>

			{wikiExtract && (
				<p
					style={{ textAlign: "justify" }}
					dangerouslySetInnerHTML={{
						__html: wikiExtract.extract.split("</p><p>")[0],
					}}
				></p>
			)}

			<Button
				variant="outlined"
				fullWidth={true}
				style={{ margin: "5px 0px" }}
				onClick={() => window.open(movieDetails.fullurl, { target: "_blank" })}
			>
				Read more on Wikipedia
			</Button>

			<Button
				variant="outlined"
				fullWidth={true}
				style={{ margin: "5px 0px" }}
				onClick={openImdbPage}
			>
				Read more on IMDB
			</Button>

			<Button
				variant="outlined"
				fullWidth={true}
				style={{ margin: "5px 0px" }}
				onClick={(event) => {
					setInputText(movie.name);
					getSearchResults(event, movie.name);
				}}
			>
				Show related movies
			</Button>

			<Button
				variant="contained"
				fullWidth={true}
				style={{ margin: "10px 0px" }}
				onClick={() => {
					setMovieDetails(null);
				}}
			>
				Close
			</Button>

			{!wikiExtract && <Spinner />}
		</Grid>
	);
};

export default MovieCard;
