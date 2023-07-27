# Pitchfork +8.0 Album Reviews

This is a simple web scraper to extract details about top-rated albums from Pitchfork reviews.

# Overview

The Pitchfork_last_stage.py script scrapes the Pitchfork website to extract information about highly rated albums that were reviewed in the past week.

It retrieves the album title, artist name, and genre for albums with a review score of 8.0 or higher.

The script prints out the extracted information to the console.


## Usage

### To run the scraper
python Pitchfork_last_stage.py

It will scrape the Pitchfork website and output the album data.

The script has no external dependencies outside the Python standard library.
Implementation

### The script uses:

    requests to retrieve the Pitchfork web page HTML
    BeautifulSoup to parse and extract information from the HTML
    Selectors to target specific elements like album titles and artists
    Text processing to clean and format the extracted text

The entry point handles the overall flow:

    Get Pitchfork HTML
    Parse with BeautifulSoup
    Loop through review items
    Extract album data
    Print results

### License

This project is open source and available under the MIT License.

Let me know if you would like me to modify or expand this sample README!
