import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase";
export const ImageUpload = () => {
  const [showInput, setShowInput] = useState(false);
  const [user, setuser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      storage
        .ref("users/" + user.uid + "/profileImage")
        .getDownloadURL()
        .then((fireBaseUrl) => {
          setShowInput(fireBaseUrl);
        });
    });
  }, []);

  return (
    <div>
      <img
        src={showInput}
        style={{ borderRadius: "30px", marginRight: "40px" }}
        alt="abc"
        height="50px"
        width="50px"
      />
    </div>
  );
};
