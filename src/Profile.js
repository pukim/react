import React from "react";

const profileData = {
  velopert: { name: "김민준", description: "Fronted Engineer @ Laftel Inc. " },
  gildong: { name: "홍길동", description: "전래동화의 주인공" },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div> 존재하지 않는 유저 . </div>;
  }

  return (
    <div>
      <h3>
        {username} ({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  );
};

export default Profile;
