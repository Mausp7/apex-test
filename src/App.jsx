import { useState } from "react";
import searchTitle from "./api/tmdbApi";
import Spinner from "./util/Spinner";
import MovieCard from "./components/MovieCard";
import Grid from "@mui/material/Grid";

function App() {
	const [inputText, setInputText] = useState("");
	const [movieData, setMovieData] = useState(null);

	const [spinner, setSpinner] = useState(false);

	const getSearchResults = async () => {
		setMovieData(null);
		setSpinner(true);
		const response = await searchTitle(inputText);

		if (response.status === 200) {
			setMovieData(response.data.data.searchMovies);
		}

		setSpinner(false);
	};

	return (
		<div>
			<h1 style={{ width: "100%", textAlign: "center" }}>Movie Search App</h1>
			<input
				type="text"
				value={inputText}
				onChange={(event) => setInputText(event.target.value)}
			/>
			<button disabled={inputText === ""} onClick={getSearchResults}>
				Search
			</button>
			{spinner && <Spinner />}
			{movieData && (
				<Grid container spacing={2}>
					{movieData.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</Grid>
			)}
		</div>
	);
}

export default App;
