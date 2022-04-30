import { Button, Hidden, Typography } from "@mui/material";
import React, { useRef } from "react";

export const Upload = ({ attachments, setAttachments }) => {
  const uploadFileRef = useRef(null);

  const onFileUploadChange = (e) => {
    console.log(e.target.files);
    setAttachments(e.target.files);
  };

  return (
    <>
      <input
        ref={uploadFileRef}
        type="file"
        multiple={true}
        onChange={onFileUploadChange}
        style={{ display: "none" }}
      />

      {/* DESKTOP */}
      <Hidden smDown>
        <Button
          onClick={() => {
            uploadFileRef.current.click();
          }}
          size="large"
          variant="contained"
          style={{
            backgroundColor: "#C1C1C1",
            borderColor: "#C1C1C1",
            color: "white",
            fontSize: "12px",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Upload ({attachments.length})
        </Button>
      </Hidden>

      {/* MOBILE */}
      <Hidden smUp>
        <Button
          fullWidth
          onClick={() => {
            uploadFileRef.current.click();
          }}
          size="large"
          variant="contained"
          style={{
            backgroundColor: "#C1C1C1",
            borderColor: "#C1C1C1",
            color: "white",
            fontSize: "12px",
            fontFamily: "Verdana, sans-serif",
          }}
        >
          Upload ({attachments.length})
        </Button>
      </Hidden>
    </>
  );
};
