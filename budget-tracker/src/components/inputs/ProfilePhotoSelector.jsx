import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="relative w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full">
                    <LuUser className="text-4xl text-primary" />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute bottom-0 right-0 border-2 border-white shadow-md"
                        onClick={onChooseFile}
                    >
                        <LuUpload className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="relative w-20 h-20">
                    <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover border"
                    />
                    <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-0 right-0 border-2 border-white shadow-md"
                        onClick={handleRemoveImage}
                    >
                        <LuTrash className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
