import {API_PATHS} from "./apiPath.js";
import axiosInstance from "./axiosInstance.js";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //append image file to the form data
    formData.append("image", imageFile);

    try {
        const response = await axiosInstance(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error uploading image", error);
        throw error;
    }
};

export default uploadImage;