import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";

const MovieCard = ({ movie, setMovieDetails }) => {
	return (
		<>
			<Grid
				item
				xs={12}
				sm={6}
				md={4}
				lg={3}
				xl={2}
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
					height: "300px",
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

				<Button
					variant="contained"
					fullWidth={true}
					onClick={() => setMovieDetails(movie)}
				>
					Show more details
				</Button>
			</Grid>
		</>
	);
};

export default MovieCard;
