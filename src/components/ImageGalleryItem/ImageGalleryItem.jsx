import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryitem.styled';

export const ImageGalleryItem = ({
  item: { webformatURL, tags, largeImageURL },
  onClick,
}) => {
  return (
    <Item>
      <Image
        src={webformatURL}
        loading="lazy"
        alt={tags}
        data-source={largeImageURL}
        onClick={onClick}
      />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }),
};
