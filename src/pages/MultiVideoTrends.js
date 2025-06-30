import React, { useEffect } from "react";
import "../pagecss/MultiVideoTrends.css";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const LOCAL_STORAGE_KEY = "channelInfoState";

const MultiVideoTrends = ({ state, setState }) => {
  const { channelName, isPremium, trendData, loaded, loading, error } = state;

  useEffect(() => {
    if (loaded || loading) return;

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) {
      setState((prev) => ({
        ...prev,
        error: "No channel info found in local storage.",
        loading: false,
      }));
      return;
    }

    try {
      const { channelName, isPremium } = JSON.parse(stored);
      if (!channelName) {
        setState((prev) => ({
          ...prev,
          error: "Channel name missing in stored data.",
          loading: false,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        channelName,
        isPremium,
        loading: true,
        error: null,
      }));

      fetch(
        `https://new-youtube-gygl.onrender.com/multi_video_trend?channel_name=${encodeURIComponent(
          channelName
        )}&is_premium=${isPremium}`
      )
        .then((res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setState((prev) => ({
            ...prev,
            trendData: data.trend_data || [],
            loaded: true,
            loading: false,
          }));
        })
        .catch((err) => {
          setState((prev) => ({
            ...prev,
            error: err.message,
            loading: false,
          }));
        });
    } catch (e) {
      setState((prev) => ({
        ...prev,
        error: "Failed to parse localStorage data.",
        loading: false,
      }));
    }
  }, [loaded, loading, setState]);

  if (loading) return <p className="loading-text">Loading trend data...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const labels = trendData.map((video, i) => `Video ${i + 1}`);
  const hateCounts = trendData.map((v) => v.hate_count);
  const requestCounts = trendData.map((v) => v.request_count);
  const questionCounts = trendData.map((v) => v.question_count);
  const feedbackCounts = trendData.map((v) => v.feedback_count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Hate",
        data: hateCounts,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      },
      {
        label: "Request",
        data: requestCounts,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.1)",
      },
      {
        label: "Question",
        data: questionCounts,
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.1)",
      },
      {
        label: "Feedback",
        data: feedbackCounts,
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Trend Comparison Across Videos",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="trends-container">
      <h2 className="trends-title">Multi Video Trends</h2>
      <p className="trends-subtitle">
        Comparing trends for: <strong>{channelName}</strong>{" "}
        {isPremium ? "(Premium)" : "(Free)"}
      </p>

      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="video-thumbnails">
        {trendData.map((video, index) => (
          <div key={video.video_id} className="video-thumbnail-card">
            <p className="video-thumbnail-title">
              <strong>Video {index + 1}:</strong> {video.title}
            </p>
            <img
              src={`https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`}
              alt="Thumbnail"
              className="video-thumbnail-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiVideoTrends;
