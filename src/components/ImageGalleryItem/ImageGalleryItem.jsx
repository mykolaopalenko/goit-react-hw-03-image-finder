import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItemCss, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  render() {
    const { image } = this.props;

    return (
      <ImageGalleryItemCss>
        <Image
          src={image.webformatURL}
          alt={image.tags}
          data-action={image.largeImageURL}
        />
      </ImageGalleryItemCss>
    );
  }
};

ImageGalleryItem.propTypes = {
   image: PropTypes.shape({
     webformatURL: PropTypes.string.isRequired,
     tags: PropTypes.string.isRequired,
     largeImageURL: PropTypes.string.isRequired,
   }),
 };
