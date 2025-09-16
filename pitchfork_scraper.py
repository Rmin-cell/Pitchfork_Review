import requests
from bs4 import BeautifulSoup

url = "https://pitchfork.com/reviews/best/high-scoring-albums/"

print(f"Fetching: {url}")

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

items = soup.select(".summary-item")
print(f"Found {len(items)} album reviews")
print("* * * * * *")
top_albums = []

for item in items:

    # Extract title
    title = item.select_one("h3")
    if title:
        title = title.get_text(strip=True)
    else:
        title = "No title"

    print(f"Title: {title}")

    # Extract artist - multiple strategies
    artist = "Unknown Artist"
    
    # Strategy 1: Extract from URL slug (most reliable)
    album_link = item.select_one('a[href*="/reviews/albums/"]')
    if album_link:
        href = album_link.get('href', '')
        # URL format: /reviews/albums/artist-album-title/
        if '/reviews/albums/' in href:
            slug = href.replace('/reviews/albums/', '').rstrip('/')
            # Split by last hyphen to separate artist from album
            parts = slug.split('-')
            if len(parts) > 1:
                # Find where the album title starts by matching with actual title
                title_words = title.lower().replace(' ', '-').replace("'", "").replace('"', '').replace(',', '').replace('.', '').replace('(', '').replace(')', '').split('-')
                title_slug = '-'.join([word for word in title_words if word])
                
                if title_slug in slug:
                    artist_slug = slug.replace('-' + title_slug, '').replace(title_slug + '-', '').replace(title_slug, '')
                    if artist_slug:
                        # Convert slug back to proper name
                        artist = artist_slug.replace('-', ' ').title()
    
    # Strategy 2: Parse from concatenated text if URL method failed
    if artist == "Unknown Artist":
        all_text = item.get_text().strip()
        # Pattern: GenreAlbumTitleArtistName or GenreAlbumTitleArtistNameBest New Album
        
        # Remove "Best New Album" or "Best New Reissue" from the end
        clean_text = all_text.replace("Best New Album", "").replace("Best New Reissue", "").strip()
        
        # Remove known genres from the beginning
        genre_keywords = ["Rock", "Pop", "Electronic", "Folk", "Country", "Metal", "Rap", "Experimental", "R&B", "Pop/R&B", "Electronic / Pop/R&B", "Folk/Country / Rock"]
        for genre in genre_keywords:
            if clean_text.startswith(genre):
                clean_text = clean_text[len(genre):].strip()
                break
        
        # Now we should have: AlbumTitleArtistName
        # Remove the album title from the beginning
        if clean_text.startswith(title):
            artist = clean_text[len(title):].strip()
            if artist:
                # Clean up common issues
                artist = artist.replace("  ", " ").strip()

    print(f"Artist: {artist}")

    # For this page, score is implied to be 8.0+ (all albums are high-scoring)
    score = "8.0+"
    print(f"Score: {score}")

    # Extract genre from concatenated text
    genre = "Unknown Genre"
    all_text = item.get_text().strip()
    
    # Genre appears at the beginning of the text
    genre_keywords = [
        "Rock", "Pop", "Electronic", "Folk", "Country", "Metal", 
        "Rap", "Experimental", "R&B", "Pop/R&B", "Electronic / Pop/R&B", 
        "Folk/Country", "Folk/Country / Rock"
    ]
    
    for keyword in genre_keywords:
        if all_text.startswith(keyword):
            genre = keyword
            break

    print(f"Genre: {genre}")
    print("-.-.-.-.-.-.-.")
