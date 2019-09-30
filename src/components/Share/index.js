import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import { copyTextToClipboard } from '../../helpers';
import { hideShareMenu } from '../../actions/shareAction';
import './share.scss';

class Share extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideOption);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideOption);
  }
  setWrapperRefInShare = (node) => {
    this.setWrapperRefInShare = node;
  };
  handleClickOutsideOption = (event) => {
    if (
      this.setWrapperRefInShare &&
      !this.setWrapperRefInShare.contains(event.target)
    ) {
      this.props.hideShareMenu();
    }
  };
  handleCopy = () => {
    const { shareData } = this.props;
    this.props.hideShareMenu();
    copyTextToClipboard(shareData.url);
  };
  render() {
    const { shareData } = this.props;
    const iconSize = 32;
    return (
      <div
        className="shareContainer"
        ref={this.setWrapperRefInShare}
      >
        <div className="shareContainer__share">
          <div className="shareContainer__share__row">
            <WhatsappShareButton
              url={shareData.url}
              title={shareData.title}
              separator="::"
              onShareWindowClose={() => this.props.hideShareMenu()}
            >
              <WhatsappIcon size={iconSize} round />
            </WhatsappShareButton>
            <FacebookShareButton
              url={shareData.url}
              onShareWindowClose={() => this.props.hideShareMenu()}
              quote={shareData.title}
            >
              <FacebookIcon size={iconSize} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareData.url}
              onShareWindowClose={() => this.props.hideShareMenu()}
              title={shareData.title}
            >
              <TwitterIcon size={iconSize} round />
            </TwitterShareButton>
          </div>
          <div className="shareContainer__share__row">
            <TelegramShareButton
              url={shareData.url}
              onShareWindowClose={() => this.props.hideShareMenu()}
              title={shareData.tit}
            >
              <TelegramIcon size={iconSize} round />
            </TelegramShareButton>
            <LinkedinShareButton
              url={shareData.url}
              onShareWindowClose={() => this.props.hideShareMenu()}
              windowWidth={750}
              windowHeight={600}
            >
              <LinkedinIcon size={iconSize} round />
            </LinkedinShareButton>
            <div className="shareContainer__share__row__copyContainer">
              <FontAwesomeIcon
                className="shareContainer__share__row__copyContainer__copy"
                icon="copy"
                onClick={this.handleCopy}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    shareData: state.share,
  };
}
Share.propTypes = {};

export default connect(
  mapStateToProps,
  { hideShareMenu },
)(Share);
