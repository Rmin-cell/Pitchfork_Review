from flask import Flask, render_template, jsonify
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__)


def scrape_pitchfork():
    """Scrape Pitchfork high-scoring albums"""
    url = "https://pitchfork.com/reviews/best/high-scoring-albums/"

    try:
        # Set up proxy if available
        proxies = {}
        if os.getenv("https_proxy"):
            proxies = {
                "http": os.getenv("http_proxy"),
                "https": os.getenv("https_proxy"),
            }

        response = requests.get(url, proxies=proxies if proxies else None, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, "html.parser")
        items = soup.select(".summary-item")

        albums = []

        for item in items:
            # Extract title
            title_elem = item.select_one("h3")
            title = title_elem.get_text(strip=True) if title_elem else "Unknown Title"

            # Extract artist - multiple strategies
            artist = "Unknown Artist"

            # Strategy 1: Extract from URL slug (most reliable)
            album_link = item.select_one('a[href*="/reviews/albums/"]')
            if album_link:
                href = album_link.get("href", "")
                # URL format: /reviews/albums/artist-album-title/
                if "/reviews/albums/" in href:
                    slug = href.replace("/reviews/albums/", "").rstrip("/")
                    # Split by last hyphen to separate artist from album
                    parts = slug.split("-")
                    if len(parts) > 1:
                        # Find where the album title starts by matching with actual title
                        title_words = (
                            title.lower()
                            .replace(" ", "-")
                            .replace("'", "")
                            .replace('"', "")
                            .replace(",", "")
                            .replace(".", "")
                            .replace("(", "")
                            .replace(")", "")
                            .split("-")
                        )
                        title_slug = "-".join([word for word in title_words if word])

                        if title_slug in slug:
                            artist_slug = (
                                slug.replace("-" + title_slug, "")
                                .replace(title_slug + "-", "")
                                .replace(title_slug, "")
                            )
                            if artist_slug:
                                # Convert slug back to proper name
                                artist = artist_slug.replace("-", " ").title()

            # Strategy 2: Parse from concatenated text if URL method failed
            if artist == "Unknown Artist":
                all_text = item.get_text().strip()
                # Pattern: GenreAlbumTitleArtistName or GenreAlbumTitleArtistNameBest New Album

                # Remove "Best New Album" or "Best New Reissue" from the end
                clean_text = (
                    all_text.replace("Best New Album", "")
                    .replace("Best New Reissue", "")
                    .strip()
                )

                # Remove known genres from the beginning
                genre_keywords = [
                    "Rock",
                    "Pop",
                    "Electronic",
                    "Folk",
                    "Country",
                    "Metal",
                    "Rap",
                    "Experimental",
                    "R&B",
                    "Pop/R&B",
                    "Electronic / Pop/R&B",
                    "Folk/Country / Rock",
                ]
                for genre in genre_keywords:
                    if clean_text.startswith(genre):
                        clean_text = clean_text[len(genre) :].strip()
                        break

                # Now we should have: AlbumTitleArtistName
                # Remove the album title from the beginning
                if clean_text.startswith(title):
                    artist = clean_text[len(title) :].strip()
                    if artist:
                        # Clean up common issues
                        artist = artist.replace("  ", " ").strip()

            # Extract genre from concatenated text
            genre = "Unknown Genre"
            all_text = item.get_text().strip()

            # Genre appears at the beginning of the text
            genre_keywords = [
                "Rock",
                "Pop",
                "Electronic",
                "Folk",
                "Country",
                "Metal",
                "Rap",
                "Experimental",
                "R&B",
                "Pop/R&B",
                "Electronic / Pop/R&B",
                "Folk/Country",
                "Folk/Country / Rock",
            ]

            for keyword in genre_keywords:
                if all_text.startswith(keyword):
                    genre = keyword
                    break

            # Check for "Best New" designation
            best_new = "Best New Album" in all_text or "Best New Reissue" in all_text

            albums.append(
                {
                    "title": title,
                    "artist": artist,
                    "genre": genre,
                    "score": "8.0+",
                    "best_new": best_new,
                }
            )

        return albums

    except Exception as e:
        print(f"Error scraping: {e}")
        return []


@app.route("/")
def index():
    """Main page displaying all albums"""
    return render_template("index.html")


@app.route("/api/albums")
def get_albums():
    """API endpoint to get album data"""
    albums = scrape_pitchfork()
    return jsonify(albums)


@app.route("/refresh")
def refresh():
    """Refresh the data"""
    albums = scrape_pitchfork()
    return render_template("index.html", albums=albums, refreshed=True)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
