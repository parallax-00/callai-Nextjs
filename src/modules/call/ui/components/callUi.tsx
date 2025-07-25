"use client";
import { useState } from "react";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import CallLobby from "./callLobby";
import CallActive from "./callActive";
import CallEnded from "./callEnded";

interface Props {
  meetingName: string;
}

const CallUi = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

  const handleJoin = async () => {
    if (!call) {
      return;
    }
    await call.join();
    setShow("call");
  };

  const handleLeave = async () => {
    if (!call) {
      return;
    }
    call.endCall();
    setShow("ended");
  };

  return (
    <StreamTheme className="h-full">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={handleLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};

export default CallUi;
