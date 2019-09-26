import React, { Component } from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import debounce from 'debounce-promise';
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
    // backgroundColor: data.color,
    backgroundColor: RandomColor.getColorGuaranteed(),
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

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      errors: {
        // title: '* Title is required',
        // imgSrc: '* Image is required',
        // imgSrc: 'Oops! Candid Not Selected',
      },
      taggedUsers: [],
      title: '',
      description: '',
      imgSrc: null,
    };
  }

  // With Debounce:
  getOptions = debounce(
    inputValue => new Promise(resolve => axios.get('http://192.168.1.9:4500/users', {
      params: {
        search: inputValue,
      },
    }).then((res) => {
      resolve(res.data.data.options);
    }).catch((err) => {
      console.error(err);
      resolve([]);
    }))
    , 500,
  );

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

  handleTitleChange = (e) => {
    const { title: titleError } = this.state.errors;
    const { value } = e.target;
    if (titleError !== undefined) {
      this.setState(prevState => ({
        title: value,
        errors: {
          ...prevState.errors,
          title: value.length > 0 ? '' : '* Title is required',
        },
      }));
    } else {
      this.setState({
        title: value,
      });
    }
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title, description, taggedUsers, imgSrc,
    } = this.state;
    const errors = {};

    if (title === '') {
      errors.title = '* Title is required';
    }

    if (!imgSrc) {
      errors.imgSrc = 'Image is required';
    }

    if (Object.entries(errors).length === 0 && errors.constructor === Object) {
      // No errors:
      const data = new FormData();
      data.append('imgSrc', imgSrc);
      data.append('title', title);
      data.append('description', description);
      data.append('taggedUsers', JSON.stringify(taggedUsers));

      axios({
        method: 'post',
        url: 'https://calm-waters-47062.herokuapp.com/posts',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
          'Content-Type': 'multipart/form-data',
        },
        data,
      })
        .then((res) => {
          console.log(res);
          // alert('File Uploaded: ', res.data.changes.imgSrc);
        })
        .catch((err) => {
          console.log(err);
          // alert('File Upload Error');
        });
    } else {
      this.setState({
        errors,
      });
    }
  };


  tagUser = (selectedOptions) => {
    this.setState({
      taggedUsers: selectedOptions.map(option => option.value),
    });
  };

  render() {
    const {
      imgSrc, imageContainerStyle, title, description, imageStyle, errors,
    } = this.state;

    return (
      <div className="container">
        <div className="upload">

          <h2 className="sectionHeading">Share Candid:</h2>
          <form className="card" onSubmit={this.handleSubmit}>

            <div className={errors.title ? 'inputWrapper inputWrapper--error' : 'inputWrapper'} data-error={errors.title}>
              <input
                type="text"
                id="title"
                name="title"
                aria-label="Title"
                placeholder="Title"
                value={title}
                onChange={this.handleTitleChange}
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
                onChange={this.handleDescriptionChange}
              />
            </div>

            <div className="inputWrapper">
              <AsyncSelect
                placeholder="Tag Users (Optional)"
                isMulti
                // cacheOptions
                defaultOptions
                loadOptions={this.getOptions}
                styles={customStyles}
                isClearable={false}
                onChange={this.tagUser}
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
                    error={this.state.errors.imgSrc}
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
