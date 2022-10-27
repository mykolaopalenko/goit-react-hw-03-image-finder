import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalCss } from './Modal.styled';

export class Modal extends Component {
  render() {
    const { closeModal, image } = this.props;
    return (
      <Overlay onClick={closeModal}>
        <ModalCss>
          <img src={image.url} alt={image.tags} />
        </ModalCss>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
