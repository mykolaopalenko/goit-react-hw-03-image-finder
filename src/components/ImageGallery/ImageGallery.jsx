import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryCss } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const { gallery, openModal, getBigImage } = this.props;

    return (
      <ImageGalleryCss
        onClick={e => {
          const url = e.target.getAttribute('data-action');
          const tags = e.target.getAttribute('alt');
          getBigImage({ url, tags });
          openModal();
        }}
      >
        {gallery.map(img => {
          return <ImageGalleryItem key={img.id} image={img} />;
        })}
      </ImageGalleryCss>
    );
  }
}

ImageGallery.propTypes = {
  images:  PropTypes.arrayOf(
   PropTypes.shape({
     id: PropTypes.number.isRequired, 
   })   
  ),
  openModal: PropTypes.func.isRequired,
  getBigImage: PropTypes.func.isRequired,
};
