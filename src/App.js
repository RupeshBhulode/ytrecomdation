import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ChannelInfo from "./pages/ChannelInfo";
import MultiVideoTrends from "./pages/MultiVideoTrends";
import VideoAnalysis from "./pages/VideoAnalysis";
import MostLikedComments from "./pages/MostLikedComments";
import CommentThreads from "./pages/CommentThreads";
import About from "./pages/About";
import "./App.css";

function App() {
  const [selectedSection, setSelectedSection] = useState("Channel Info");

  const [channelInfoState, setChannelInfoState] = useState({
    channelName: "",
    isPremium: false,
    channelData: null,
    loading: false,
    error: null,
  });

  const [multiTrendState, setMultiTrendState] = useState({
    channelName: "",
    isPremium: false,
    trendData: [],
    loaded: false,
    loading: false,
    error: null,
  });

  const [videoAnalysisState, setVideoAnalysisState] = useState({
    videoId: "",
    isPremium: false,
    data: null,
    loading: false,
    error: null,
    loaded: false,
  });

  const [mostLikedState, setMostLikedState] = useState({
    videoId: "",
    isPremium: false,
    data: null,
    loading: false,
    error: null,
    loaded: false,
  });

  const [commentThreadsState, setCommentThreadsState] = useState({
    videoId: "",
    isPremium: false,
    data: [],
    loading: false,
    error: null,
    loaded: false,
  });

  const renderContent = () => {
    switch (selectedSection) {
      case "Channel Info":
        return (
          <ChannelInfo
            state={channelInfoState}
            setState={setChannelInfoState}
            setSelectedSection={setSelectedSection}
            setVideoAnalysisState={setVideoAnalysisState}
          />
        );
      case "Multi Video Trends":
        return (
          <MultiVideoTrends
            state={multiTrendState}
            setState={setMultiTrendState}
          />
        );
      case "Video Analysis":
        return (
          <VideoAnalysis
            state={videoAnalysisState}
            setState={setVideoAnalysisState}
          />
        );
      case "Most Liked Comments":
        return (
          <MostLikedComments
            state={mostLikedState}
            setState={setMostLikedState}
          />
        );
      case "Comment Threads":
        return (
          <CommentThreads
            state={commentThreadsState}
            setState={setCommentThreadsState}
          />
        );
      case "About":
      return <About />; // ✅ Added this case
    default:
      return <ChannelInfo
        state={channelInfoState}
        setState={setChannelInfoState}
        setSelectedSection={setSelectedSection}
        setVideoAnalysisState={setVideoAnalysisState}
      />;
    }
  };

  return (
    <div className="app-container">
      <Navbar onSelect={setSelectedSection} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
