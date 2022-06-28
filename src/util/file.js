import { message } from 'antd';
import { storage } from 'firebase';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

export const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export const uuidv4 = () =>
  'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};

export const fakeUpload = async (options) => {
  const { onSuccess } = options;
  onSuccess('Ok');
};

export const uploadFileToFirebase = async (file) => {
  console.log('firebase', file);
  const storageRef = ref(storage, 'images/' + `${Date.now() + file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      // 	case 'paused':
      // 		console.log('Upload is paused');
      // 		break;
      // 	case 'running':
      // 		console.log('Upload is running');
      // 		break;
      // }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }
  );
  await uploadTask;
  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  // 👆 getDownloadURL returns a promise too, so... yay more await

  return downloadURL; // 👈 return the URL to the caller
};
