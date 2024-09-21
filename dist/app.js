"use strict";
// // Observer Pattern Interfaces
// interface IObservable {
//     subscribe(observer: IObserver): void;
//     unsubscribe(observer: IObserver): void;
//     notify(video: string): void;
// }
var _a, _b, _c;
// Concrete Observable (YouTube Channel)
class YouTubeChannel {
    constructor(name) {
        this.subscribers = [];
        this.videos = [];
        this.name = name;
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
        console.log(`${subscriber.getName()} subscribed to ${this.name}`);
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }
    uploadVideo(video) {
        this.videos.push(video);
        this.notify(video);
    }
    notify(video) {
        this.subscribers.forEach(subscriber => subscriber.update(video));
    }
    getVideos() {
        return this.videos;
    }
    getName() {
        return this.name;
    }
}
// Concrete Observer (Subscriber)
class Subscriber {
    constructor(name) {
        this.notifications = [];
        this.name = name;
    }
    update(video) {
        this.notifications.push(video);
        this.renderNotifications();
        alert(`New video uploaded: ${video}`);
    }
    renderNotifications() {
        const element = document.getElementById('subscriber-notifications');
        if (element) {
            element.innerHTML = this.notifications.map(notification => `<li>${notification}</li>`).join('');
        }
    }
    getName() {
        return this.name;
    }
}
class MostRecentSort {
    sort(videos) {
        return videos.slice();
    }
}
class OldestFirstSort {
    sort(videos) {
        return videos.slice().reverse();
    }
}
class MostPopularSort {
    sort(videos) {
        return videos.slice().sort(); // Mocked as alphabetical sorting
    }
}
// Sorting Context
class VideoSortingContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    sort(videos) {
        return this.strategy.sort(videos);
    }
}
// UI Interactions
const channels = [];
const subscribers = [];
// Create Channel
(_a = document.getElementById('create-channel')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const channelNameInput = document.getElementById('channel-name');
    const channelName = channelNameInput.value;
    const newChannel = new YouTubeChannel(channelName);
    channels.push(newChannel);
    const channelsList = document.getElementById('channels-list');
    if (channelsList) {
        const channelElement = document.createElement('div');
        channelElement.className = 'channel';
        channelElement.innerHTML = `
            <h3>${channelName}</h3>
            <input type="text" placeholder="Video Title" id="video-title-${channelName}" />
            <button onclick="uploadVideo('${channelName}')">Upload Video</button>
        `;
        channelsList.appendChild(channelElement);
    }
});
// Upload Video
function uploadVideo(channelName) {
    const channel = channels.find(c => c.getName() === channelName);
    if (channel) {
        const videoInput = document.getElementById(`video-title-${channelName}`);
        const videoTitle = videoInput.value;
        channel.uploadVideo(videoTitle);
    }
}
// Subscribe to Channel
(_b = document.getElementById('subscribe-channel')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
    const subscribeChannelInput = document.getElementById('subscribe-channel-name');
    const channelName = subscribeChannelInput.value;
    const subscriberName = `Subscriber_${Math.random().toString(36).substr(2, 5)}`; // Random subscriber name
    const newSubscriber = new Subscriber(subscriberName);
    subscribers.push(newSubscriber);
    const channel = channels.find(c => c.getName() === channelName);
    if (channel) {
        channel.subscribe(newSubscriber);
        alert(`${subscriberName} subscribed to ${channelName}`);
    }
    else {
        alert(`Channel ${channelName} not found`);
    }
});
// Video Sorting Strategy
(_c = document.getElementById('apply-sorting')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => {
    const sortingSelect = document.getElementById('sorting-strategy');
    const selectedStrategy = sortingSelect.value;
    let strategy;
    switch (selectedStrategy) {
        case 'oldestFirst':
            strategy = new OldestFirstSort();
            break;
        case 'mostPopular':
            strategy = new MostPopularSort();
            break;
        case 'mostRecent':
        default:
            strategy = new MostRecentSort();
    }
    const sortingContext = new VideoSortingContext(strategy);
    const allVideos = channels.flatMap(channel => channel.getVideos());
    const sortedVideos = sortingContext.sort(allVideos);
    const sortedVideosDiv = document.getElementById('sorted-videos');
    if (sortedVideosDiv) {
        sortedVideosDiv.innerHTML = sortedVideos.map(video => `<li>${video}</li>`).join('');
    }
});
