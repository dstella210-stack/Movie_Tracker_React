export async function getMoviePoster(movie) {
    const response = await fetch(`/api/movies/search/${movie}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie poster');
    }
    return response.json();
}