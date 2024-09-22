interface IObservable {
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
    notify(video: string): void;
}

interface IObserver {
    update(video: string): void;
    getName(): string;
}

// Concrete Observable (YouTube Channel)
class YouTubeChannel implements IObservable {
    private subscribers: IObserver[] = [];
    private videos: string[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    subscribe(subscriber: IObserver): void {
        this.subscribers.push(subscriber);
        console.log(`${subscriber.getName()} subscribed to ${this.name}`);
    }

    unsubscribe(subscriber: IObserver): void {
        this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }

    uploadVideo(video: string): void {
        this.videos.push(video);
        this.notify(video);
    }

    notify(video: string): void {
        this.subscribers.forEach(subscriber => subscriber.update(video));
    }

    getVideos(): string[] {
        return this.videos;
    }

    getName(): string {
        return this.name;
    }
}

// Concrete Observer (Subscriber)
class Subscriber implements IObserver {
    private name: string;
    private notifications: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    update(video: string): void {
        this.notifications.push(video);
        this.renderNotifications();
        alert(`New video: ${video}`);
    }

    renderNotifications(): void {
        const element = document.getElementById('subscriber-notifications');
        if (element) {
            element.innerHTML = this.notifications.map(notification => `<li>${notification}</li>`).join('');
        }
    }

    getName(): string {
        return this.name;
    }
}

// Video Sorting Strategies
interface ISortingStrategy {
    sort(videos: string[]): string[];
}

class MostRecentSort implements ISortingStrategy {
    sort(videos: string[]): string[] {
        return videos.slice();
    }
}

class OldestFirstSort implements ISortingStrategy {
    sort(videos: string[]): string[] {
        return videos.slice().reverse();
    }
}

class MostPopularSort implements ISortingStrategy {
    sort(videos: string[]): string[] {
        return videos.slice().sort(); // Mocked as alphabetical sorting
    }
}

// Sorting Context
class VideoSortingContext {
    private strategy: ISortingStrategy;

    constructor(strategy: ISortingStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: ISortingStrategy): void {
        this.strategy = strategy;
    }

    sort(videos: string[]): string[] {
        return this.strategy.sort(videos);
    }
}

// UI Interactions
const channels: YouTubeChannel[] = [];
const subscribers: Subscriber[] = [];

// Create Channel
document.getElementById('create-channel')?.addEventListener('click', () => {
    const channelNameInput = document.getElementById('channel-name') as HTMLInputElement;
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
function uploadVideo(channelName: string): void {
    const channel = channels.find(c => c.getName() === channelName);
    if (channel) {
        const videoInput = document.getElementById(`video-title-${channelName}`) as HTMLInputElement;
        const videoTitle = videoInput.value;
        channel.uploadVideo(videoTitle);
    }
}

// Subscribe to Channel
document.getElementById('subscribe-channel')?.addEventListener('click', () => {
    const subscribeChannelInput = document.getElementById('subscribe-channel-name') as HTMLInputElement;
    const channelName = subscribeChannelInput.value;
    const subscriberName = `Subscriber_${Math.random().toString(36).substr(2, 5)}`; // Random subscriber name
    const newSubscriber = new Subscriber(subscriberName);
    subscribers.push(newSubscriber);

    const channel = channels.find(c => c.getName() === channelName);
    if (channel) {
        channel.subscribe(newSubscriber);
        alert(`${subscriberName} subscribed to ${channelName}`);
    } else {
        alert(`Channel ${channelName} not found`);
    }
});

// Video Sorting Strategy
document.getElementById('apply-sorting')?.addEventListener('click', () => {
    const sortingSelect = document.getElementById('sorting-strategy') as HTMLSelectElement;
    const selectedStrategy = sortingSelect.value;

    let strategy: ISortingStrategy;

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
