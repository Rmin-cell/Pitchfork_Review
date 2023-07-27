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
  

