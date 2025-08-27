import React, { useEffect } from "react";
import "../pagecss/ChannelInfo.css";

const LOCAL_STORAGE_KEY = "channelInfoState";

const ChannelInfo = ({ state, setState, setSelectedSection }) => {
  const { channelName, isPremium, channelData, loading, error } = state;

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch (e) {
        console.error("Failed to parse stored channel info:", e);
      }
    }
  }, [setState]);

  const fetchChannelInfo = async () => {
  if (!channelName.trim()) {
    setState((prev) => ({ ...prev, error: "Please enter a channel name." }));
    return;
  }

  setState((prev) => ({
    ...prev,
    loading: true,
    error: null,
    channelData: null,
  }));

  try {
    const response = await fetch(
      `https://new-youtube-gygl.onrender.com/channel_info?channel_name=${encodeURIComponent(
        channelName
      )}&is_premium=${isPremium}`
    );

    if (response.status === 429) {
      // Handle rate limit gracefully
      throw new Error(
        "You’ve reached the request limit. Please try again after some time."
      );
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    setState((prev) => {
      const newState = { ...prev, channelData: data };
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          channelName,
          isPremium,
          channelData: data,
        })
      );
      localStorage.removeItem("selectedVideoId");
      return newState;
    });
  } catch (err) {
    setState((prev) => ({ ...prev, error: err.message }));
  } finally {
    setState((prev) => ({ ...prev, loading: false }));
  }
};

  return (
    <div className="channel-info-container">
      <h2>Channel Info</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter channel name"
          value={channelName}
          onChange={(e) =>
            setState((prev) => ({ ...prev, channelName: e.target.value }))
          }
        />

        <div className="toggle-container">
          <input
            type="checkbox"
            id="premiumToggle"
            checked={isPremium}
            onChange={(e) =>
              setState((prev) => ({ ...prev, isPremium: e.target.checked }))
            }
          />
          <label htmlFor="premiumToggle" className="toggle-label">
            <span className="toggle-text">{isPremium ? "Premium" : "Normal"}</span>
            <span className="toggle-ball"></span>
          </label>
        </div>

        <button onClick={fetchChannelInfo}>Fetch</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {channelData && (
        <>
          {/* Top card */}
          <div className="channel-card">
            <img
              src={channelData.profile_image}
              alt="Profile"
              className="profile-image"
            />
            <div className="channel-details">
              <h3 className="channel-name">{channelData.channel_name}</h3>
              <p className="subscriber-count">
                <strong>Subscribers:</strong>{" "}
                {channelData.subscriber_count.toLocaleString()}
              </p>
               <a
    href={`https://www.youtube.com/${channelData.channel_id ? "channel/" + channelData.channel_id : "@" + channelData.channel_name}`}
    target="_blank"
    rel="noopener noreferrer"
    className="view-channel-button"
  >
    View Channel
  </a>
            </div>
          </div>

          {/* Videos list */}











          <div className="channel-extra-content">
            <h4>Latest Videos:</h4>
            {Array.isArray(channelData.latest_videos) &&
            channelData.latest_videos.length > 0 ? (
              <ul className="video-list">
                {channelData.latest_videos.map((video) => (
                  <li key={video.video_id} className="video-item">
                    <img
                      src={video.thumbnail_url}
                      alt="Thumbnail"
                      className="video-thumbnail"
                    />
                    <div className="video-details">
                      <p>
                        <strong>{video.title}</strong>
                      </p>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.video_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                    <button
                      onClick={() => {
                        localStorage.setItem(
                          "selectedVideoId",
                          video.video_id
                        );
                        setSelectedSection("Video Analysis");
                      }}
                    >
                      Get Analysis
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No videos found.</p>
            )}
          </div>









        </>
      )}
    </div>






  );
};

export default ChannelInfo;
