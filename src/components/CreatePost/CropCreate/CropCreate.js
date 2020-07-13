import React, { Fragment, useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { getOrientation } from 'get-orientation/browser';
import getCroppedImg from './cropImage'
import { getRotatedImage } from './rotateImage';
// import ImgDialog from './ImgDialog'
import './CropCreate.scss';

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
}

function CropCreate(props) {
    const fileInputRef = useRef(null);
    const [imgConfigs, setconfig] = useState({
        imageSrc: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 1 / 1,
        croppedAreaPixels: null,
        croppedImage: null,
        isCropping: false,
    });

    const onCropChange = crop => {
        setconfig({
            ...imgConfigs,
            crop: crop
        });
    }

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
        setconfig({
            ...imgConfigs,
            croppedAreaPixels: croppedAreaPixels
        })
    }

    const onZoomChange = zoom => {
        setconfig({
            ...imgConfigs,
            zoom: zoom
        })
    }

    const onImageDisplayerClick = () => {
        fileInputRef.current.click();
    }

    const showResult = async () => {
        try {
            setconfig({
                ...imgConfigs,
                isCropping: true
            });
            const croppedImage = await getCroppedImg(
                imgConfigs.imageSrc,
                imgConfigs.croppedAreaPixels
            )
            console.log('done', { croppedImage })
            setconfig({
                ...imgConfigs,
                croppedImage: croppedImage,
                isCropping: false,
            })
        } catch (e) {
            console.error(e)
            setconfig({
                ...imgConfigs,
                isCropping: false,
            })
        }
    }

    const onFileChange = async e => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let imageDataUrl = await readFile(file)

            // apply rotation if needed
            const orientation = await getOrientation(file)
            const rotation = ORIENTATION_TO_ANGLE[orientation]
            if (rotation) {
                imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
            }

            setconfig({
                imageSrc: imageDataUrl,
                crop: { x: 0, y: 0 },
                zoom: 1
            })
        }
    }

    return (

        <div className="CropCreate exa col-12 p-0" onClick={onImageDisplayerClick}>
            <input type="file"
                ref={fileInputRef}
                className='form-control d-none'
                accept="image/*"
                id="image"
                name="image"
                onChange={(e) => {
                    onFileChange(e);
                    props.setFieldValue('image', e.currentTarget.files[0]);
                }}
            />

            {imgConfigs.imageSrc && (
                <Fragment>
                    <div className="crop-container">
                        <Cropper
                            image={imgConfigs.imageSrc}
                            crop={imgConfigs.crop}
                            zoom={imgConfigs.zoom}
                            aspect={imgConfigs.aspect}
                            onCropChange={onCropChange}
                            onCropComplete={onCropComplete}
                            onZoomChange={onZoomChange}
                        />
                    </div>
                    {/* <div className="controls">
                        <input type="range" min="1" max="3" aria-labelledby="Zoom" value={imgConfigs.zoom} className="form-control-range" id="myRange" onChange={(e, zoom) => onZoomChange(zoom)} />
                        <Slider
                                value={imgConfigs.zoom}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e, zoom) => this.onZoomChange(zoom)}
                                classes={{ container: 'slider' }}
                            />
                    </div> */}
                    <div className="button">
                        <button className="btn btn-primary text-uppercase btn-block" onClick={showResult} disabled={imgConfigs.isCropping}>Show result</button>
                    </div>
                    {/* <ImgDialog img={this.state.croppedImage} onClose={this.onClose} /> */}
                </Fragment>
            )}
        </div>
    );
}

// const onFileSelected = e => {
//     const selectedFile = e.target.files[0];
//     console.log(selectedFile);
//     const reader = new FileReader();
//     reader.onload = e => {
//         imgRef.current.src = e.target.result;
//         imgRef.current.title = selectedFile.name;
//     };
//     reader.readAsDataURL(selectedFile);
// };


function readFile(file) {
    return new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}


export default CropCreate;