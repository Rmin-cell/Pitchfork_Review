import requests
from bs4 import BeautifulSoup

url = "https://pitchfork.com/best/high-scoring-albums/"

#print(f"Fetching: {url}")

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

items = soup.select('div.review')
print(f"Found {len(items)} +8.0 album reviews of Last Week")
print("* * * * * *")
top_albums = []

for item in items:

  title = item.select_one('h2')
  if title:
    title = title.get_text(strip=True)
  else:
    title = "No title"
  
  print(f"Title: {title}")

  artist = item.select_one('li')
  if artist:
    artist = artist.get_text(strip=True)
  else: 
    artist = "No artist"

  print(f"Artist: {artist}")
  
  '''score = None
  score_tag = item.select_one('p.')

  if score_tag:
    score_str = score_tag.get_text(strip=True)
    score = float(score_str.split('/')[0])
  print(f"Score: {score}")
'''
  genre = item.select_one('a.genre-list__link')   
  if genre:
    genre = genre.get_text(strip=True)
  else:
    genre = "No genre"
  print(f"Genre: {genre}")  
  print("-.-.-.-.-.-.-.")
  

'''print()
print(f"Found {len(top_albums)} top albums")

# Print sample album  
if top_albums:
  print(top_albums[0])

print()

# Print album details 
for album in top_albums:

  print(f"{album['title']} by {album['artist']}")
  
  print(f"Score: {album['score']}")

  print(f"Genre: {album['genre']} \n")
  
for album in top_albums:
  print(album['title'], 'by', album['artist'])
  print('Score:', album['score'], '- Genre:', album['genre'])
  print()'''