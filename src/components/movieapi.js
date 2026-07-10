export async function getMoviePoster(movie) {
    const response = await fetch(`/api/movies/search/${movie}`);
    const data = await response.json();

    return data;
}