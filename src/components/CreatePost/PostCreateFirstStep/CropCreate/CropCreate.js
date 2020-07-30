import React, { Fragment, useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Cropper from 'react-easy-crop';
import { getOrientation } from 'get-orientation/browser';
import getCroppedImg from './cropImage'
import { getRotatedImage } from './rotateImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faTrash, faSpinner, faAnkh } from '@fortawesome/free-solid-svg-icons';
import PageLoader from '../../../PageLoader/PageLoader';
import './CropCreate.scss';

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

const CropCreate = forwardRef((props, ref) => {
    // const hasImage = props.image ? props.image : null;

    const [imgConfigs, setconfig] = useState({
        imageSrc: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        rotation: 0,
        aspect: 1 / 1,
        croppedAreaPixels: null,
        croppedImage: null,
        isCropping: false,
    });



    useImperativeHandle(ref, () => ({

        onFileChange: async event => {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0];
                let imageDataUrl = await readFile(file, setconfig)
                // apply rotation if needed
                const orientation = await getOrientation(file)
                const rotation = ORIENTATION_TO_ANGLE[orientation]
                if (rotation) {
                    imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
                }
                setconfig({
                    ...imgConfigs,
                    imageSrc: imageDataUrl,
                    crop: { x: 0, y: 0 },
                    zoom: 1,
                })
            }
        },

        showResult: async () => {
            try {
                setconfig(() => ({
                    ...imgConfigs,
                    isCropping: true
                }));
                const croppedImage = await getCroppedImg(
                    imgConfigs.imageSrc,
                    imgConfigs.croppedAreaPixels,
                    imgConfigs.rotation
                );
                setconfig(() => ({
                    ...imgConfigs,
                    croppedImage: croppedImage,
                    isCropping: false,
                }));
                return croppedImage;
            } catch (e) {
                console.error(e)
                setconfig({
                    ...imgConfigs,
                    isCropping: false,
                });
            }
        }

    }));

    const onCropChange = crop => {
        setconfig({
            ...imgConfigs,
            crop: crop
        });
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setconfig({
            ...imgConfigs,
            croppedAreaPixels: croppedAreaPixels
        });
    }

    const onZoomChange = zoom => {
        setconfig({
            ...imgConfigs,
            zoom: zoom
        });
    }

    const onRotateChange = rotation => {
        setconfig({
            ...imgConfigs,
            rotation: rotation
        });
    }

    const onDelete = () => {
        setconfig({
            ...imgConfigs,
            croppedImage: null,
            isCropping: false,
            imageSrc: null
        });
    }

    return (
        <div className="CropCreate">
            {imgConfigs.isCropping && <PageLoader />}

            <div className="col crop-container">
                <Cropper
                    image={imgConfigs.imageSrc}
                    crop={imgConfigs.crop}
                    zoom={imgConfigs.zoom}
                    rotation={imgConfigs.rotation}
                    aspect={imgConfigs.aspect}
                    showGrid={false}
                    onCropChange={onCropChange}
                    onCropComplete={onCropComplete}
                    onZoomChange={onZoomChange}
                    onRotationChange={onRotateChange}
                />
            </div>


            <div className="col mt-2">
                <div className="col form-group d-flex p-0">
                    <label htmlFor="zoom " className="col-4 text-uppercase p-0 m-0">Zoom</label>
                    <input
                        id="zoom"
                        type="range"
                        step="0.1"
                        min="1"
                        max="10"
                        value={imgConfigs.zoom}
                        className="col-8 form-control-range custom-slider p-0"
                        onChange={(e) => {
                            onZoomChange(e.target.value)
                        }} />
                </div>

                <div className="col form-group d-flex p-0">
                    <label htmlFor="rotation" className="col-4 text-uppercase p-0 m-0">Rotation</label>
                    <input
                        id="rotation"
                        type="range"
                        step="1"
                        min="0"
                        max="360"
                        value={imgConfigs.rotation}
                        className="col-8 form-control-range p-0"
                        onChange={(e) => {
                            onRotateChange(e.target.value);
                        }} />
                </div>
            </div>


            <button
                className="btn btn-primary text-uppercase btn-block"
                onClick={onDelete}
                disabled={imgConfigs.isCropping}>
                <FontAwesomeIcon icon={faTrash} className='faTrash' />
            </button>
        </div>

    );
})


function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}


export default CropCreate;