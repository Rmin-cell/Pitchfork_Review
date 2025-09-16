import requests
from bs4 import BeautifulSoup

# Additional imports to help debug
import pprint

url = "https://pitchfork.com/reviews/albums/?day=2023-02-15"
top_albums=[]

response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Print HTML for inspection
print(soup.prettify())

items = soup.select('div.review')

for item in items:

  title = item.select_one('h2').get_text(strip=True)

  # Try broad match first
  artist_tag = item.find(class_="artist")
  
  if not artist_tag:  
    # Try more specific selector
    artist_tag = item.select_one('h3')

  if artist_tag:
    artist = artist_tag.text.strip() 
  else:
    artist = None

  # Print artist for debugging  
  print(artist)

  score_str = item.select_one('div.score').get_text(strip=True)
  score = float(score_str.split('/')[0])

  if score >= 8.0:

    genre = item.select_one('a.genre-tag').get_text(strip=True)

    album = {
      "title": title,
      "artist": artist,
      "score": score,
      "genre": genre 
    }

    top_albums.append(album)

# Rest of code...

pprint.pprint(top_albums)