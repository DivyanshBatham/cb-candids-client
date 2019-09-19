import React, { Component } from 'react';
// import ReactCrop from 'react-image-crop';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import MyDropzone from '../MyDropzone';
// import CardRenderer from '../../components/CardRenderer';
import './upload.scss';
// import Loader from '../../components/Loader';
import { rotation, orientation } from './orientation';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      isCropping: true,
      errors: {},
      // crop: {
      //   unit: '%',
      //   width: 30,
      //   aspect: 16 / 9,
      // },
    };
  }

  // handleChange = (event) => {

  //   this.setState({
  //     src: URL.createObjectURL(event.target.files[0]),
  //   });


  //   const file = event.target.files[0];
  //   if (file) {
  //     orientation(file, (base64img, value) => {
  //       console.log(base64img, value);
  //       console.log(rotation[value]);
  //       this.setState({
  //         src: base64img,
  //         style: {
  //           transform: rotation[value],
  //         },
  //       });
  //       // const rotated = $('#placeholder2').attr('src', base64img);
  //       // if (value) {
  //       //   rotated.css('transform', rotation[value]);
  //       // }
  //     });
  //   }
  // }


  handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      orientation(file, (base64img, value) => {
        this.setState({
          imgSrcDisplay: base64img,
          imgSrc: file,
          style: {
            transform: rotation[value],
          },
        });
      });
    }
  }

  handleFileDrop = (files) => {
    const file = files[0];

    const img = new Image();
    img.onload = () => {
      orientation(file, (base64img, value) => {
        let imageStyle = {};
        let imageContainerStyle = {};

        alert(`${rotation[value]} ${value}`);
        // TODO: Check condition for rotation:
        if (value === 1 || value === 0) {
          // No Rotation:
          const ratio = (img.height / img.width) * 100;

          imageContainerStyle = {
            paddingTop: `${ratio}%`, // Good for Landscape Images
          };

          imageStyle = {
            paddingTop: `${ratio}%`,
            backgroundImage: `url(${base64img})`,
          };
        } else {
          // Image has to be Rotated:
          const ratio = (img.height / img.width) * 100;

          imageContainerStyle = {
            paddingTop: `${(img.width / img.height) * 100}%`, // Good for Portrait Images
          };

          imageStyle = {
            paddingTop: `${ratio}%`,
            backgroundImage: `url(${base64img})`,
            transformOrigin: 'top left',
            // transform: `translate(100%) rotate(90deg) scale(${100 / ratio}`,
            // Works for 90deg and 0deg only
            // Fails for 180deg
            transform: `translate(100%) ${rotation[value]} scale(${100 / ratio}`,

          };
        }

        this.setState({
          imgSrc: file,
          imageContainerStyle,
          imageStyle,
        });
      });
    };
    img.src = URL.createObjectURL(file);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { imgSrc } = this.state;
    const data = new FormData();
    data.append('imgSrc', imgSrc);

    axios.post(
      'http://192.168.1.9:4500/users/upload',
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      },
    ).then((res) => {
      console.log(res);
      alert('File Uploaded: ', res.data.changes.imgSrc);
    })
      .catch((err) => {
        console.log(err);
        alert('File Upload Error');
      });
  };


  render() {
    const {
      imgSrc, imgSrcDisplay, imageContainerStyle, isCropping, title, description, taggedUsers, imgHeight, imgWidth, imageStyle,
    } = this.state;


    return (
      <div className="container">
        <div className="upload">

          <h1>Upload</h1>
          <form className="card" onSubmit={this.handleSubmit}>

            <div className="inputWrapper" data-error={this.state.errors.title}>
              <input
                type="text"
                id="title"
                aria-label="Title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
            </div>

            <div className="inputWrapper" data-error={this.state.errors.description}>
              <input
                type="text"
                id="description"
                aria-label="Description"
                placeholder="Description"
                value={description}
                onChange={this.handleChange}
              />
            </div>

            <div className="inputWrapper" data-error={this.state.errors.taggedUsers}>
              <input
                type="text"
                id="taggedUsers"
                aria-label="TaggedUsers"
                placeholder="TaggedUsers"
                value={taggedUsers}
                onChange={this.handleChange}
              />
            </div>


            {
              imgSrc ?
                (
                  <div
                    className="imageContainer"
                    style={imageContainerStyle}
                  >
                    {/* TODO: Add Options: */}
                    {/* <button>Edit</button> */}
                    {/* <button>Remove</button> */}
                    <div className="image" style={imageStyle} />
                  </div>

                ) :
                (
                  // TODO: Maybe Move every file handling code to MyDropzone only
                  <MyDropzone
                    handleOnDrop={this.handleFileDrop}
                  />
                )
            }

          </form>
          <button onClick={this.handleSubmit}>Upload</button>

        </div>
      </div>
    );
  }
}

export default Upload;
