import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalCss } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalCss>
          <img src={image.url} alt={image.tags} />
        </ModalCss>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
