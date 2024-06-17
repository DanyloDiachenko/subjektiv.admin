import React, { ChangeEvent, DragEvent, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface IProps {
    onChange: (file: FileList) => void;
}

const UploadFile = ({ onChange }: IProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [inputKey, setInputKey] = useState(0);

    const handleDrag = function (event: DragEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        if (event.type === "dragenter" || event.type === "dragover") {
            setDragActive(true);
        } else if (event.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (event: DragEvent<HTMLElement>) {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            onChange(event.dataTransfer.files);
            setInputKey((previousKey) => previousKey + 1);
        }
    };

    const handleChange = function (event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (dragActive) return;
        if (event.target.files && event.target.files[0]) {
            onChange(event.target.files);
            setInputKey((previousKey) => previousKey + 1);
        }
    };
    const alternativeImageRef = useRef<HTMLInputElement | null>(null);

    const onAlternativeImageAddClick = () => {
        if (alternativeImageRef.current) {
            alternativeImageRef.current.click();
        }
    };

    return (
        <label
            htmlFor="add-alternative-image
                                        "
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <div
                id="add-alternative-image"
                className={styles.add}
                onClick={onAlternativeImageAddClick}
            >
                +
            </div>
            <input
                key={inputKey}
                className="input-file"
                type="file"
                accept="image/*,video/*"
                onChange={handleChange}
                multiple={true}
                style={{ display: "none" }}
                ref={alternativeImageRef}
            />
        </label>
    );
};

export default UploadFile;
