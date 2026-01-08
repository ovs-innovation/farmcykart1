import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiX } from "react-icons/fi";
import useGetSetting from "@hooks/useGetSetting";
import { notifySuccess, notifyError } from "@utils/toast";

const Uploader = ({ setImageUrl, imageUrl }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const uploadUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
  const upload_Preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const { storeCustomizationSetting } = useGetSetting();
  const storeColor = storeCustomizationSetting?.theme?.color || "green";

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    multiple: false,
    maxSize: 5000000, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          notifyError("Image size must be less than 5MB");
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          notifyError("Only JPEG, PNG, and WEBP images are allowed");
        } else {
          notifyError("File upload failed. Please try again.");
        }
        return;
      }

      if (acceptedFiles && acceptedFiles.length > 0) {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        notifySuccess("Image selected! Uploading...");
      }
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name} className="relative inline-block mr-2">
      <img
        className="inline-flex border-2 border-gray-100 w-24 h-24 object-cover rounded-full"
        src={file.preview}
        alt={file.name}
      />
      {uploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
          <div className="text-white text-xs text-center">
            <div className="animate-spin mb-1">⏳</div>
            <div>{uploadProgress}%</div>
          </div>
        </div>
      )}
    </div>
  ));

  useEffect(() => {
    const uploadURL = uploadUrl;
    const uploadPreset = upload_Preset;
    
    if (files && files.length > 0 && !uploading) {
      const file = files[0];
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      // Simulate progress (Cloudinary doesn't provide progress events easily)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev < 90) return prev + 10;
          return prev;
        });
      }, 200);

      axios({
        url: uploadURL,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      })
        .then((res) => {
          clearInterval(progressInterval);
          setUploadProgress(100);
          if (res.data && res.data.secure_url) {
            setImageUrl(res.data.secure_url);
            notifySuccess("Image uploaded successfully! 🎉");
            // Clear files after successful upload to show the uploaded image
            setTimeout(() => {
              setFiles([]);
              setUploading(false);
            }, 500);
          } else {
            throw new Error("Invalid response from server");
          }
        })
        .catch((err) => {
          clearInterval(progressInterval);
          setUploading(false);
          setFiles([]);
          console.error("Upload error:", err);
          notifyError(err?.response?.data?.error?.message || "Failed to upload image. Please try again.");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImageUrl("");
    setFiles([]);
    notifySuccess("Image removed");
  };

  return (
    <div className="w-full text-center">
      <div
        className={`px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-all ${
          uploading
            ? "border-store-500 bg-store-50 cursor-wait"
            : "border-gray-300 hover:border-store-500 hover:bg-gray-50 cursor-pointer"
        }`}
        {...getRootProps()}
      >
        <input {...getInputProps()} disabled={uploading} />
        <span className="mx-auto flex justify-center">
          {uploading ? (
            <div className="relative">
              <FiUploadCloud className="text-3xl text-store-500 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-store-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <FiUploadCloud className="text-3xl text-store-500" />
          )}
        </span>
        {uploading ? (
          <>
            <p className="text-sm mt-2 font-medium text-store-600">
              Uploading... {uploadProgress}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 max-w-xs mx-auto">
              <div
                className="bg-store-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm mt-2 text-gray-700">Drag your image here</p>
            <p className="text-xs text-gray-500 mt-1">or click to browse</p>
            <em className="text-xs text-gray-400 block mt-1">
              (Only *.jpeg, *.png, *.webp images, max 5MB)
            </em>
          </>
        )}
      </div>
      <aside className="flex flex-row flex-wrap mt-4 justify-center items-center gap-3">
        {imageUrl && !uploading && (
          <div className="relative inline-block">
            <img
              className="inline-flex border-2 border-gray-200 rounded-full w-32 h-32 object-cover shadow-md"
              src={imageUrl}
              alt="Uploaded profile"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
              title="Remove image"
            >
              <FiX className="w-4 h-4" />
            </button>
            <p className="text-xs mt-1" style={{ color: '#006E44' }}>✓ Uploaded</p>
          </div>
        )}
        {!imageUrl && thumbs}
        {uploading && thumbs}
      </aside>
    </div>
  );
};

export default Uploader;

