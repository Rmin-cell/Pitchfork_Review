# Pitchfork High-Scoring Albums Scraper & Web GUI

A modern web application that scrapes Pitchfork's high-scoring albums (8.0+) and displays them in a beautiful, responsive interface.

## ✨ Features

### Core Features

- **Real-time scraping** of Pitchfork's high-scoring albums page
- **Real album artwork** scraped directly from Pitchfork
- **Actual scores** (8.7, 9.2, etc.) instead of generic "8.0+"
- **Direct review links** to read full Pitchfork reviews
- **TypeScript** for type safety and better development experience
- **Responsive design** that works perfectly on all devices

### Search & Discovery

- 🔍 **Advanced Search**: Search albums by title or artist
- 🎵 **Genre Filtering**: Filter by specific music genres
- 🏆 **Best New Toggle**: Show only "Best New" albums
- 📊 **Smart Sorting**: Sort by title, artist, score, or genre (ascending/descending)
- 📈 **Results Counter**: See how many albums match your filters

### User Experience

- 🖼️ **Album Detail Modal**: Click any album to see full details and review link
- 💀 **Loading Skeletons**: Beautiful placeholder animations while loading
- 🎨 **Glassmorphism Design**: Modern, elegant UI with backdrop blur effects
- ⚡ **Smooth Animations**: Polished hover effects and transitions
- 📱 **Mobile-First**: Perfect on all screen sizes
- 🎯 **Interactive Cards**: Hover and click for delightful interactions

### Technical

- **TypeScript** throughout for type safety
- **React 18** with modern hooks and best practices
- **Ant Design 5** for professional UI components
- **Styled Components** for custom, theme-aware styling
- **Lazy loading images** for better performance
- **Error handling** with graceful fallbacks

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

5. **Run the backend server:**

   ```bash
   python pitchfork_web_app.py
   ```

6. **In a new terminal, start the React frontend:**

   ```bash
   cd frontend
   npm install
   npm start
   ```

7. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

The frontend (React) will run on port 3000 and automatically proxy API requests to the backend (Flask) on port 5000.

## 📱 Usage

### Web Interface

#### Browsing Albums

- **Hero Section**: Beautiful landing with statistics and "Discover Albums" button
- **Grid Layout**: Albums displayed in responsive cards with real artwork
- **Statistics Dashboard**: View total albums, "Best New" count, and average score

#### Search & Filter

- **Search Bar**: Type to search by album title or artist name
- **Genre Filter**: Select specific genres from dropdown
- **Best New Toggle**: Switch to show only "Best New" albums
- **Sort Options**: 8 different sorting options (title, artist, score, genre - both ascending and descending)

#### Album Details

- **Click Any Album**: Opens a detailed modal with full information
- **View Full Review**: Direct link to read the complete review on Pitchfork
- **Album Artwork**: High-quality images from Pitchfork
- **Color-Coded Scores**: Visual indicators for rating ranges

#### Additional Features

- **Floating Refresh Button**: Bottom-right corner for quick data refresh
- **Results Counter**: Shows how many albums match your current filters
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile

### Command Line (Legacy)

You can still use the original command-line scraper:

```bash
python pitchfork_scraper.py
```

## 🛠 Technical Details

### What's Changed from Original

- ✅ **Fixed URL**: Now uses the correct Pitchfork high-scoring albums page
- ✅ **Real album artwork**: Scrapes actual images from Pitchfork
- ✅ **Actual scores**: Shows real ratings (8.7, 9.2, etc.)
- ✅ **Review links**: Direct links to full Pitchfork reviews
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Advanced search & filtering**: Search, filter by genre, sort, "Best New" toggle
- ✅ **Album detail modal**: Click to see full information and review link
- ✅ **Loading skeletons**: Professional loading states
- ✅ **Enhanced UX**: Smooth animations, better interactions
- ✅ **Responsive design**: Perfect on desktop, tablet, and mobile
- ✅ **Improved scraping**: Better extraction of artist, genre, and images
- ✅ **Proxy support**: Automatic proxy detection and usage

### Architecture

- **Backend**: Flask web server with enhanced scraping (images, scores, review URLs)
- **Frontend**: React 18 with TypeScript
- **UI Framework**: Ant Design 5 for professional components
- **Styling**: Styled Components for custom, theme-aware design
- **Type System**: TypeScript with comprehensive interfaces
- **State Management**: React Hooks (useState, useMemo, useCallback)
- **Design Pattern**: Glassmorphism with pastel gradient palette
- **Data Source**: https://pitchfork.com/reviews/best/high-scoring-albums/
- **API Communication**: Axios with error handling and interceptors

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

Each album now contains:

```typescript
interface Album {
  title: string; // Album title
  artist: string; // Artist name
  genre: string; // Music genre
  score: string; // Actual score (e.g., "8.7", "9.2")
  best_new: boolean; // "Best New" designation
  image_url: string; // 🆕 Real album artwork URL
  review_url: string; // 🆕 Link to full Pitchfork review
}
```

Example response:

```json
{
  "title": "A Moon Shaped Pool",
  "artist": "Radiohead",
  "genre": "Rock",
  "score": "9.1",
  "best_new": true,
  "image_url": "https://pitchfork.com/albums/...",
  "review_url": "https://pitchfork.com/reviews/albums/..."
}
```

## 🔄 Comparison: Before vs After

### Before (Original)

- ❌ Used non-existent URL
- ❌ No album artwork
- ❌ Generic "8.0+" scores
- ❌ No search or filtering
- ❌ JavaScript only
- ❌ Basic card layout
- ❌ No album details view
- ❌ Simple spinner loading

### After (Latest Improvements)

- ✅ Real album artwork from Pitchfork
- ✅ Actual scores (8.7, 9.2, etc.)
- ✅ Direct review links
- ✅ Advanced search by title/artist
- ✅ Genre filtering & sorting
- ✅ "Best New" toggle
- ✅ Full TypeScript
- ✅ Album detail modal
- ✅ Loading skeletons
- ✅ Professional glassmorphism UI
- ✅ Smooth animations
- ✅ Click-to-view interactions
- ✅ Mobile-responsive design

## 📖 Detailed Improvements

For a comprehensive breakdown of all UI/UX improvements, TypeScript migration, and new features, see **[IMPROVEMENTS.md](./IMPROVEMENTS.md)**.

## 📝 License

This project is open source and available under the MIT License.

---

**Enjoy discovering the latest high-scoring albums from Pitchfork! 🎵**
