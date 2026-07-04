const API_KEY = "44b11a6b";

export async function getMoviePoster(title) {
  const response = await fetch(
    `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`
  );

  const data = await response.json();

  if (data.Response === "True" && data.Poster !== "N/A") {
    return data.Poster;
  }

  return "";
}