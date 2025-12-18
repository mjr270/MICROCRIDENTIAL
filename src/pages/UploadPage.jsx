import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "../Style/UploadPage.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected && selected.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(selected));
    } else if (selected && selected.type.startsWith("video/")) {
      setPreview(URL.createObjectURL(selected));
    } else {
      setPreview("");
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((r) => setTimeout(r, 100));
      }

      // Uncomment this when backend is ready:
      // const res = await fetch("http://localhost:5000/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await res.json();

      alert("✅ File uploaded successfully!");
    } catch (err) {
      alert("❌ Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <FaCloudUploadAlt className="dropzone-icon" />
        <h2 className="upload-title">Upload Your File</h2>
        <p className="upload-subtitle">Upload images, videos, or documents safely.</p>

        <div className="upload-dropzone">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>

        {preview && (
          <div className="preview-section">
            {file.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="preview"
                className="preview-image"
              />
            ) : file.type.startsWith("video/") ? (
              <video
                src={preview}
                controls
                className="preview-video"
              />
            ) : (
              <p className="preview-unavailable">Preview not available for this file type.</p>
            )}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`upload-btn ${
            uploading ? "uploading" : "ready"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {uploading && (
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
