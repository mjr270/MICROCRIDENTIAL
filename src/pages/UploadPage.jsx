import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center px-6 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <FaCloudUploadAlt className="text-6xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Upload Your File</h2>
        <p className="text-gray-500 mb-6">Upload images, videos, or documents safely.</p>

        <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 mb-4 transition hover:border-blue-500">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border-none outline-none cursor-pointer"
          />
        </div>

        {preview && (
          <div className="mb-4">
            {file.type.startsWith("image/") ? (
              <img
                src={preview}
                alt="preview"
                className="rounded-xl w-full max-h-60 object-cover"
              />
            ) : file.type.startsWith("video/") ? (
              <video
                src={preview}
                controls
                className="rounded-xl w-full max-h-60 object-cover"
              />
            ) : (
              <p className="text-gray-500">Preview not available for this file type.</p>
            )}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`w-full py-3 text-white font-semibold rounded-xl transition ${
            uploading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
