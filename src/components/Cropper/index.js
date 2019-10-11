import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './crop.scss';

class Cropper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        unit: '%',
        width: 100,
        aspect: 1 / 1,
      },
      disabled: false,
      imgSrc: props.imgSrc,
    };
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.addEventListener('load', () =>
        this.setState({ src: URL.createObjectURL(file) }));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }
  handleUpdateBlob = () => {
    const { croppedImageUrl } = this.state;
    this.props.updateEditedBlob(croppedImageUrl);
    this.setState({ disabled: true });
  };


  render() {
    const { crop, disabled, imgSrc } = this.state;
    return (
      <div className="crop">
        <div className="crop__iconContainer">
          <div className="iconContainer iconContainer--light">
            <FontAwesomeIcon
              icon="times"
              onClick={() => this.props.onCancleEdit()}
            />
          </div>
          <span className="sectionHeading sectionHeading--light">Crop Image</span>
          <div className="iconContainer iconContainer--light">
            <FontAwesomeIcon icon="check" onClick={this.handleUpdateBlob} />
          </div>
        </div>
        <ReactCrop
          src={imgSrc}
          crop={crop}
          disabled={disabled}
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
          className={disabled ? 'ReactCrop--disabled' : null}
        />
      </div>
    );
  }
}
export default Cropper;
