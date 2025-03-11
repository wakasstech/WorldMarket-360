/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Argon Dashboard 2 PRO MUI components
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import "./media.css";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditMedia = ({ handleImageChange, initialImage }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
const [notShow, setNotShow] = useState(false);


  useEffect(() => {
    if (initialImage && notShow !== true ) {
      setFileList([
        {
          uid: "-1",
          name: "current_image",
          status: "done",
          url: initialImage,
        },
      ]);
    }
  }, [initialImage]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    handleImageChange(newFileList);
  };

  const handleRemove = (file) => {
    setFileList([]); // Reset the file list to empty
    setPreviewImage(""); // Reset the preview image
    handleImageChange([]); // Pass an empty array to the parent component
    setNotShow(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        cursor: "pointer",

        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      {/* <ArgonBox mt={1.5}> */}
      <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <ArgonTypography component="label" variant="caption" fontWeight="bold">
          Upload Image/Thumbnail
        </ArgonTypography>
      </ArgonBox>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
        // showUploadList={{
        //   showRemoveIcon: false, // Hide the remove icon
        // }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

EditMedia.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  initialImage: PropTypes.string, // Add PropTypes for the new prop
};

export default EditMedia;
