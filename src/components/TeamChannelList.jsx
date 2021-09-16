import React from "react";
import { AddChannel } from "../assets";

const TeamChannelList = ({
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setIsEditing,
  setCreateType,
  setToggleConatiner
}) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error please wait and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    <div className="team-channel-list">
      <p className="team-channel-list__message loading">
        {type === "team" ? "Channels" : "Messages"} Loading...
      </p>
    </div>;
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? "Channels" : "Direct Messages"}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleConatiner={setToggleConatiner}
          type={type === "team" ? "team" : "messaging"}
        />
      </div>
      <p className="team-channel-list__message">{children}</p>
    </div>
  );
};

export default TeamChannelList;
