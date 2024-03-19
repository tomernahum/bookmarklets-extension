//@ts-check


function getVideo() {
    function isVideoPlaying(video) { return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2)};
    
    const videos = Array.from(document.querySelectorAll('video'))
    const playingVideos = videos.filter(isVideoPlaying)

    if (playingVideos.length > 0) {
        return playingVideos[0]
    }
    else if (videos.length > 0) {
        return videos[0]
    }
    else {
        throw new Error('No video found')
    }
}

// getVideo().requestPictureInPicture()
document.querySelector('video')?.requestPictureInPicture()