import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import { getWikiId, getWikiPage, getWikiExtract } from "../api/wikiApi";
import Spinner from "../util/Spinner";
import { getImdbId } from "../api/imdbApi";

const MovieCard = ({
	movieDetails,
	setMovieDetails,
	setInputText,
	getSearchResults,
}) => {
	const [wikiData, setWikiData] = useState(null);
	const [wikiExtract, setWikiExtract] = useState(null);
	const [spinner, setSpinner] = useState(false);

	const getWikiData = async () => {
		setSpinner(true);
		const wikiIdResponse = await getWikiId(movieDetails.name);
		if (wikiIdResponse.status !== 200) return setSpinner(false);

		const wikiPageId = wikiIdResponse.data.query.search[0].pageid;
		const wikiPageResponse = await getWikiPage(wikiPageId);
		if (wikiPageResponse.status !== 200) return setSpinner(false);

		setWikiData(wikiPageResponse.data.query.pages[wikiPageId]);

		const response = await getWikiExtract(wikiPageId);
		if (response.status !== 200) return setSpinner(false);
		if (response.data.errorMessage) return setSpinner(false);

		setWikiExtract(response.data.query.pages[wikiPageId]);
		setSpinner(false);
	};

	useEffect(() => {
		getWikiData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const openImdbPage = async () => {
		setSpinner(true);
		const response = await getImdbId(movieDetails.name);
		if (response.status !== 200) return setSpinner(false);

		setSpinner(false);
		window.open(`https://www.imdb.com/title/${response.data.results[0].id}`, {
			target: "_blank",
		});
	};

	return (
		<div
			style={{ maxWidth: "700px", margin: "10px auto 20px", padding: "35px" }}
		>
			{spinner && <Spinner />}
			<h2 style={{ minHeight: "45px", textAlign: "center" }}>
				{movieDetails.name} ({new Date(movieDetails.releaseDate).getFullYear()})
			</h2>

			<p style={{ textAlign: "center" }}>
				Genre:{" "}
				{movieDetails.genres.length !== 0
					? movieDetails.genres.map((genre) => genre.name).join(", ")
					: "Unknown"}
			</p>

			<p style={{ textAlign: "center" }}>
				Rating:{" "}
				{movieDetails.score > 0 ? movieDetails.score.toFixed(1) : "Not rated"}
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
				onClick={() => window.open(wikiData.fullurl, { target: "_blank" })}
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
					setInputText(movieDetails.name);
					getSearchResults(event, movieDetails.name);
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
				Back
			</Button>
		</div>
	);
};

export default MovieCard;
