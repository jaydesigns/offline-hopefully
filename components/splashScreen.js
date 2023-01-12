const Video = () => {
    return (
      <div className="flex flex-col justify-center h-full w-full bg-grey">
          <video autoPlay muted playsInline width="100%">
              <source src="/vid/logoAnimation-light.mp4" type="video/mp4" />
        Sorry, your browser doesn&apos;t support embedded videos.
          </video>
      </div>
    );
  };
  
  export default Video;