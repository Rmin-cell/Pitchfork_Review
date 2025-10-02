# Pitchfork High-Scoring Albums Scraper & Web GUI

A modern web application that scrapes Pitchfork's high-scoring albums (8.0+) and displays them in a beautiful, responsive interface.

## ✨ Features

- **Real-time scraping** of Pitchfork's high-scoring albums page
- **Material-UI interface** with modern, professional design
- **Responsive design** that works perfectly on all devices
- **Album information** including title, artist, genre, and score
- **"Best New" badges** for specially highlighted albums
- **Color-coded genre chips** for easy categorization
- **Floating action button** for quick refresh
- **Loading states** and error handling
- **React-powered** interactive components

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Internet connection
- Proxy configuration (if needed)

### Installation & Setup

1. **Clone/Navigate to the project directory:**

   ```bash
   cd /Users/Armin/Desktop/Pitchfork_Review
   ```

2. **Create and activate virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**

   ```bash
   pip install requests beautifulsoup4 flask
   ```

4. **Set up proxy (if needed):**

   ```bash
   export https_proxy="http://127.0.0.1:1080"
   export http_proxy="http://127.0.0.1:1080"
   ```

5. **Run the web application:**

   ```bash
   python pitchfork_web_app.py
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:5000
   ```

## 📱 Usage

### Web Interface

- **Main Page**: Displays all high-scoring albums in a beautiful grid layout
- **Refresh Button**: Click to fetch the latest data from Pitchfork
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### Command Line (Legacy)

You can still use the original command-line scraper:

```bash
python pitchfork_scraper.py
```

## 🛠 Technical Details

### What's Changed from Original

- ✅ **Fixed URL**: Now uses the correct Pitchfork high-scoring albums page
- ✅ **Improved scraping**: Better extraction of artist and genre information
- ✅ **Material-UI interface**: Professional, modern design with React components
- ✅ **Enhanced UX**: Loading states, error handling, and interactive elements
- ✅ **Responsive design**: Perfect on desktop, tablet, and mobile
- ✅ **Color-coded genres**: Visual categorization with themed chips
- ✅ **Proxy support**: Automatic proxy detection and usage

### Architecture

- **Backend**: Flask web server with scraping functionality
- **Frontend**: React with Material-UI components
- **Design System**: Material-UI (MUI) for professional, consistent design
- **Data Source**: https://pitchfork.com/reviews/best/high-scoring-albums/
- **Dependencies**: Minimal - only requests, beautifulsoup4, and flask

## 🎯 API Endpoints

- `GET /` - Main web interface
- `GET /api/albums` - JSON API returning album data
- `GET /refresh` - Refresh data and return to main page

## 🐛 Troubleshooting

### Common Issues

1. **"No albums found"**

   - Check your internet connection
   - Verify proxy settings if using a proxy
   - Try refreshing the data

2. **"Error loading albums"**

   - Pitchfork website might be temporarily unavailable
   - Check if proxy is working correctly
   - Wait a moment and try again

3. **Flask app won't start**
   - Make sure virtual environment is activated
   - Verify all dependencies are installed
   - Check if port 5000 is available

### Proxy Configuration

If you're behind a corporate firewall or using a proxy:

```bash
export https_proxy="http://your-proxy-host:port"
export http_proxy="http://your-proxy-host:port"
```

## 📊 Data Structure

Each album contains:

```json
{
    "title": "Album Title",
    "artist": "Artist Name",
    "genre": "Genre",
    "score": "8.0+",
    "best_new": true/false
}
```

## 🔄 Comparison: Before vs After

### Before (Original)

- ❌ Used non-existent URL (`/best/high-scoring-albums/`)
- ❌ Syntax errors and indentation issues
- ❌ No artist/genre extraction
- ❌ Command-line only interface
- ❌ No error handling

### After (Improved)

- ✅ Correct URL (`/reviews/best/high-scoring-albums/`)
- ✅ Clean, working code
- ✅ Extracts title, artist, genre, and identifies "Best New" albums
- ✅ Beautiful web interface
- ✅ Comprehensive error handling and user feedback
- ✅ Mobile-responsive design
- ✅ Real-time data refresh

## 📝 License

This project is open source and available under the MIT License.

---

**Enjoy discovering the latest high-scoring albums from Pitchfork! 🎵**
