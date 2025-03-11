// BlogMediaMultiple.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import './media.css';

import ArgonBox from 'components/ArgonBox';
import ArgonTypography from 'components/ArgonTypography';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BlogMediaMultiple = ({ handleImageChange, initialImages }) => {

console.log(initialImages)

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setFileList(
        initialImages.map((image, index) => ({
          uid: `-${index}`,
          name: `current_image_${index}`,
          status: 'done',
          url: image.url,
          originFileObj: image.originFileObj,
        }))
      );
    }
  }, [initialImages]);

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <ArgonBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
        <ArgonTypography component="label" variant="caption" fontWeight="bold">
          Upload Image
        </ArgonTypography>
      </ArgonBox>

      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
      >
        {uploadButton}
      </Upload>

      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

BlogMediaMultiple.propTypes = {
  handleImageChange: PropTypes.func.isRequired,
  initialImages: PropTypes.array,
};

export default BlogMediaMultiple;