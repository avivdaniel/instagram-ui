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
            if (imgConfigs.imageSrc === null) {
                return undefined;
            }
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
                console.log('done', { croppedImage })
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

    // const onImageDisplayerClick = () => {
    //     if (imgConfigs.imageSrc) {
    //         return;
    //     }
    //     fileInputRef.current.click();
    // }

    const onDelete = () => {
        setconfig({
            ...imgConfigs,
            croppedImage: null,
            isCropping: false,
            imageSrc: null
        });
    }

    return (

        <div className="CropCreate col-12 p-0">

            {imgConfigs.isCropping && <PageLoader />}

            <>
                <div className="crop-container">
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

                <div className="controls">
                    <input type="range" step="0.1" min="1" max="10" value={imgConfigs.zoom} className="form-control-range" onChange={(e) => {

                        onZoomChange(e.target.value)
                    }} />
                    <input type="range" step="1" min="0" max="360" value={imgConfigs.rotation} className="form-control-range" onChange={(e) => {
                        onRotateChange(e.target.value);
                    }} />

                    {/* <Slider
            value={rotation}
            min={0}
            max={360}
            step={1}
            aria-labelledby="Rotation"
            classes={{ container: classes.slider }}
            onChange={(e, rotation) => setRotation(rotation)}
          /> */}
                </div>



                <div className="CropCreate-btn-container d-flex justify-content-between p-1">
                    <button className="btn btn-primary text-uppercase btn-block" onClick={onDelete} disabled={imgConfigs.isCropping}>  <FontAwesomeIcon icon={faTrash} className='faTrash' /></button>
                </div>

            </>

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