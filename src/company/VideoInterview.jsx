import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function VideoInterview() {
  const { company } = useParams();

  const myMeeting = async (element) => {
    const appID = 659154371; // 👈 paste here
    const serverSecret = "ef66400a2e74795306d70671e9bc78893abce970ce2c67f7862f9ba5b3694614"; // 👈 paste here

    const roomID = company; // same company = same room

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      "Candidate"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Join Link",
          url: window.location.href,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
  };

  return (
    <div style={{ height: "100vh" }}>
      <div ref={myMeeting} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default VideoInterview;