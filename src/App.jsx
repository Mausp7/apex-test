import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./util/theme";

import FormControl from "@mui/material/FormControl";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";

import searchTitle from "./api/tmdbApi";
import MovieCard from "./components/MovieCard";
import Spinner from "./util/Spinner";

function App() {
	const [inputText, setInputText] = useState("");
	const [movieData, setMovieData] = useState(null);

	const [spinner, setSpinner] = useState(false);

	const getSearchResults = async (event, searchText) => {
		event.preventDefault();
		if (inputText === "") return;

		setMovieData(null);
		setSpinner(true);
		const response = await searchTitle(searchText);

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
						onSubmit={(event) => getSearchResults(event, inputText)}
					>
						<TextField
							type="inputText"
							variant="outlined"
							label="Movie tile"
							placeholder="e. g. Jurassic Park"
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
					<Grid container spacing={5} style={{ padding: "30px 50px" }}>
						{movieData.map((movie) => (
							<MovieCard
								key={movie.id}
								movie={movie}
								setInputText={setInputText}
								getSearchResults={getSearchResults}
							/>
						))}
					</Grid>
				)}
			</ThemeProvider>
		</>
	);
}

export default App;
