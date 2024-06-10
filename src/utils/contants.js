

export const GOOGLE_API_KEY = "AIzaSyCFTF13zVMF3CC9q_meq9rU0u_ku0S5W1A"

export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=58&regionCode=IN&key=${GOOGLE_API_KEY}`

export const YOUTUBE_VIDEO_BY_ID =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${GOOGLE_API_KEY}`

export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="