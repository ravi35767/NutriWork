import { videos } from './data/mockVideos';

// This will be used for API integration later
export const videoService = {
  getVideos: async () => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(videos);
      }, 1000);
    });
  },
  
  addVideo: async (video) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(video);
      }, 1000);
    });
  },
  
  updateVideo: async (video) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(video);
      }, 1000);
    });
  },
  
  deleteVideo: async (id) => {
    // TODO: Replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 1000);
    });
  },
}; 