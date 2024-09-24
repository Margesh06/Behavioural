# YouTube  - Observer and Strategy Design Pattern

This project demonstrates a **YouTube Channel Subscription System** using design patterns. The system allows users to:

- Create YouTube channels
- Subscribe to channels
- Upload videos
- Notify subscribers when a new video is uploaded
- Sort videos using different sorting strategies

## Table of Contents
1. [Design Patterns Used](#design-patterns-used)
2. [Features](#features)
3. [Getting Started](#getting-started)
4. [How the System Works](#how-the-system-works)
5. [Code Structure](#code-structure)
6. [Example Usage](#example-usage)

## Design Patterns Used

### 1. **Observer Pattern**
The **Observer Pattern** is implemented to create a subscription system between YouTube channels and subscribers. This allows channels to notify all subscribed users whenever a new video is uploaded.

- **Observable (Subject)**: The `YouTubeChannel` class acts as the observable. It maintains a list of subscribers (observers) and notifies them when new videos are uploaded.
- **Observer**: The `Subscriber` class implements the `IObserver` interface. It receives notifications from the observable whenever a new video is uploaded to the subscribed channel.

### 2. **Strategy Pattern**
The **Strategy Pattern** is used to allow the sorting of videos in different ways without changing the core logic. Different sorting algorithms can be applied dynamically by the user.

- **Context**: The `VideoSortingContext` class, which manages sorting using different strategies.
- **Strategy**: The `ISortingStrategy` interface, along with concrete implementations such as `MostRecentSort`, `OldestFirstSort`, and `MostPopularSort`.

### Why Design Patterns?
- **Observer Pattern**: Ensures flexibility by decoupling the YouTube channel (subject) and its subscribers (observers), allowing the system to easily notify subscribers when new content is available.
- **Strategy Pattern**: Enables easy switching between different video sorting algorithms (strategies) without modifying the underlying channel or video logic.

## Features
- **Create Channels**: Users can create multiple YouTube channels.
- **Subscribe to Channels**: Subscribers can subscribe to YouTube channels and get notifications when new videos are uploaded.
- **Upload Videos**: Channels can upload videos, and all subscribers are notified of new uploads.
- **Sort Videos**: Videos can be sorted by different strategies:
  - Most Recent
  - Oldest First
  - Most Popular (mocked as alphabetical sorting)

## Getting Started
### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, etc.).
- Knowledge of basic HTML, JavaScript, and TypeScript to understand the structure.

### Running the Code
1. Clone or download the project files.
2. Open `index.html` in a browser to interact with the system.
3. The UI allows for creating channels, uploading videos, subscribing, and sorting videos.

## How the System Works

1. **Create a YouTube Channel**:
   - A user can input a channel name and click the "Create Channel" button.
   - A new `YouTubeChannel` instance is created, and the UI updates to display the channel.

2. **Upload a Video**:
   - Each channel allows the user to upload videos by entering a title and clicking the "Upload Video" button.
   - Upon upload, all subscribers to the channel are notified through the `notify()` function, which calls the `update()` method of each observer.

3. **Subscribe to a Channel**:
   - A user can subscribe to any existing channel by entering the channel name and clicking "Subscribe".
   - A new `Subscriber` instance is created and registered to the specified `YouTubeChannel`.
   - Subscribers receive alerts and see new videos added to their notifications list.

4. **Sorting Videos**:
   - Users can choose a sorting strategy (most recent, oldest first, most popular) from the dropdown menu.
   - When the "Apply Sorting" button is clicked, the videos across all channels are fetched and sorted using the selected strategy.

## Code Structure

### Interfaces
- **`IObservable`**: Represents the observable in the observer pattern. Declares methods for subscribing, unsubscribing, and notifying observers.
- **`IObserver`**: Represents the observer in the observer pattern. Declares methods for receiving updates and returning the observer's name.
- **`ISortingStrategy`**: Represents the strategy in the strategy pattern. Declares a method for sorting an array of videos.

### Classes
- **`YouTubeChannel`**: Implements the `IObservable` interface. Manages subscribers, uploads videos, and notifies subscribers of new uploads.
- **`Subscriber`**: Implements the `IObserver` interface. Receives notifications from the channel when new videos are uploaded.
- **`MostRecentSort`, `OldestFirstSort`, `MostPopularSort`**: Concrete implementations of the `ISortingStrategy` interface. Each class sorts videos based on different criteria.
- **`VideoSortingContext`**: Encapsulates a sorting strategy and applies it to sort videos.

### UI Interaction
- **Create Channel**: Adds a new channel to the list of channels.
- **Upload Video**: Allows users to upload videos to a specific channel and notify all subscribers.
- **Subscribe to Channel**: Registers a new subscriber to a specific channel.
- **Sort Videos**: Applies a selected sorting strategy to the uploaded videos.

## Example Usage

- **Create a Channel**: Enter the channel name in the input field and click "Create Channel".
- **Upload a Video**: Enter the video title in the respective channel's input field and click "Upload Video". Subscribers will get notified.
- **Subscribe to a Channel**: Enter the channel name in the subscription input field and click "Subscribe". A new subscriber will be created and subscribed to the specified channel.
- **Sort Videos**: Select a sorting method from the dropdown and click "Apply Sorting" to see the videos sorted based on the chosen strategy.

## Conclusion
This system effectively demonstrates the use of both the **Observer Pattern** and the **Strategy Pattern**. It allows dynamic management of subscribers and video notifications, as well as the ability to apply various video sorting strategies in a flexible and maintainable way.


## Snapshots

![image](https://github.com/user-attachments/assets/067aef99-083a-4f05-acfb-f0415aba3007)

![image](https://github.com/user-attachments/assets/27ae8e66-248e-4c27-8eb2-5fd81de53d2b)

![image](https://github.com/user-attachments/assets/12b00edb-3ac2-491a-9d63-b9b5161343c3)




