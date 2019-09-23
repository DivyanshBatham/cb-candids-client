import React, { Component } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import MyDropzone from '../MyDropzone';
import { rotation, orientation } from './orientation';
import RandomColor from '../../helpers/RandomColor';
import './upload.scss';

const customStyles = {
  option: (styles, { isFocused }) => ({
    ...styles,
    fontSize: '0.9rem',
    color: '#2F2525',
    background: isFocused ? '#F4F4F4' : styles.background,
  }),
  input: styles => ({
    ...styles,
    fontSize: '0.9rem',
  }),
  placeholder: styles => ({
    ...styles,
    fontSize: '0.9rem',
  }),
  valueContainer: styles => ({
    ...styles,
    padding: '0.3rem 0.5rem',
  }),
  control: (styles, { isFocused }) => ({
    ...styles,
    fontSize: '0.9rem',
    border: 'solid 1px #E2E0DD',
    boxShadow: isFocused ? '0 0 0 1px #888888' : 'none',
    ':hover': {
      border: 'solid 1px #E2E0DD',
      boxShadow: isFocused ? '0 0 0 1px #888888' : 'none',
    },
  }),
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: data.color,
    // backgroundColor: RandomColor.getColorGuaranteed(),
    borderRadius: '500px',
    marginRight: '6px',
  }),
  multiValueLabel: styles => ({
    ...styles,
    color: 'white',
    paddingLeft: '1rem',
  }),
  multiValueRemove: styles => ({
    ...styles,
    color: 'white',
    marginRight: '0.4rem',
    ':hover': {},
  }),
};

const colourOptions = [
  {
    value: 'ocean', label: 'Ocean', color: RandomColor.getColorGuaranteed(),
  },
  { value: 'purple', label: 'Purple', color: RandomColor.getColorGuaranteed() },
  {
    value: 'red', label: 'Red', color: RandomColor.getColorGuaranteed(),
  },
  { value: 'orange', label: 'Orange', color: RandomColor.getColorGuaranteed() },
  { value: 'yellow', label: 'Yellow', color: RandomColor.getColorGuaranteed() },
  { value: 'green', label: 'Green', color: RandomColor.getColorGuaranteed() },
  { value: 'forest', label: 'Forest', color: RandomColor.getColorGuaranteed() },
  { value: 'slate', label: 'Slate', color: RandomColor.getColorGuaranteed() },
  { value: 'silver', label: 'Silver', color: RandomColor.getColorGuaranteed() },
];

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

  // this promise function should return a list of options:
  promiseOptions = inputValue =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.filterColors(inputValue));
      }, 1000);
    });


  filterColors = inputValue => colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()));


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
                name="title"
                aria-label="Title"
                placeholder="Title"
                value={title}
                onChange={this.handleChange}
              />
            </div>

            <div className="inputWrapper">
              <textarea
                id="description"
                rows="3"
                name="description"
                aria-label="Description"
                placeholder="Description (Optional)"
                value={description}
                onChange={this.handleChange}
              />
            </div>

            <div className="inputWrapper">
              <AsyncSelect
                placeholder="Tag Users (Optional)"
                isMulti
                className="react-select-container"
                classNamePrefix="react-select"
                cacheOptions
                defaultOptions
                loadOptions={this.promiseOptions}
                styles={customStyles}
                isClearable={false}
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
