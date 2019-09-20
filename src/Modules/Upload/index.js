import React, { Component } from 'react';
import axios from 'axios';
import MyDropzone from '../MyDropzone';
import { rotation, orientation } from './orientation';
import './upload.scss';

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
    };
  }

  handleFileDrop = (files) => {
    const file = files[0];

    const img = new Image();
    img.onload = () => {
      orientation(file, (base64img, value) => {
        const ratio = (img.height / img.width) * 100;

        let imageStyle = {};
        let imageContainerStyle = {};


        // TODO: Check condition for rotation:
        if (value === 3) {
          // Image has to be Rotated: rotate(180deg)
          imageContainerStyle = {
            paddingTop: `${ratio}%`,
          };

          imageStyle = {
            paddingTop: `${ratio}%`,
            backgroundImage: `url(${img.src})`,
            transform: `${rotation[value]}`,
          };
        } else if (value === 6) {
          // Image has to be Rotated: rotate(90deg)
          imageContainerStyle = {
            paddingTop: `${(img.width / img.height) * 100}%`,
          };

          imageStyle = {
            paddingTop: `${ratio}%`,
            backgroundImage: `url(${img.src})`,
            transformOrigin: 'top left',
            transform: `translate(100%) ${rotation[value]} scale(${100 / ratio}`,
          };
        } else {
          // No Rotation: rotate(0deg) or unknown
          imageContainerStyle = {
            paddingTop: `${ratio}%`,
          };

          imageStyle = {
            paddingTop: `${ratio}%`,
            backgroundImage: `url(${img.src})`,
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
      imgSrc, imageContainerStyle, title, description, taggedUsers, imageStyle,
    } = this.state;


    return (
      <div className="container">
        <div className="upload">

          <h2 className="sectionHeading">Share Candid:</h2>
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
