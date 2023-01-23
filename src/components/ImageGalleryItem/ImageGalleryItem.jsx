import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryitem.styled';

export const ImageGalleryItem = ({ item: { webformatURL } }) => {
  return (
    <Item>
      <Image src={webformatURL} loading="lazy" alt="" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }),
};
