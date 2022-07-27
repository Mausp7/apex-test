import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import theme from "./util/theme";

import searchTitle from "./api/tmdbApi";
import Spinner from "./util/Spinner";
import MovieCard from "./components/MovieCard";
import Grid from "@mui/material/Grid";

function App() {
	const [inputText, setInputText] = useState("");
	const [movieData, setMovieData] = useState(null);

	const [spinner, setSpinner] = useState(false);

	const getSearchResults = async (event) => {
		event.preventDefault();
		if (inputText === "") return;

		setMovieData(null);
		setSpinner(true);
		const response = await searchTitle(inputText);

		if (response.status !== 200) return setSpinner(false);

		setMovieData(response.data.data.searchMovies);
		setSpinner(false);
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<h1 style={{ width: "100%", textAlign: "center" }}>Movie Search App</h1>

				<FormControl fullWidth={true} style={{ margin: "20px 0px" }}>
					<form
						action=""
						style={{
							maxWidth: "400px",
							margin: "0px auto",
							padding: "0px 15px",
						}}
						onSubmit={(event) => getSearchResults(event)}
					>
						<TextField
							type="inputText"
							variant="outlined"
							label="Movie tile"
							placeholder="i.e. Jurassic Park"
							fullWidth={true}
							margin="normal"
							value={inputText}
							onChange={(event) => setInputText(event.target.value)}
						/>
						<Button
							variant="contained"
							fullWidth={true}
							startIcon={<SearchIcon />}
							type={"Submit"}
							disabled={inputText === ""}
						>
							Search
						</Button>
					</form>
				</FormControl>

				{spinner && <Spinner />}
				{movieData && (
					<Grid container spacing={2}>
						{movieData.map((movie) => (
							<MovieCard key={movie.id} movie={movie} />
						))}
					</Grid>
				)}
			</ThemeProvider>
		</>
	);
}

export default App;
