import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalCss } from './Modal.styled';

export class Modal extends Component {

   handleBackdropClick = e => {
      if (e.currentTarget === e.target) {
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
   onClose: PropTypes.func,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
