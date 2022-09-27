import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import PropTypes from 'prop-types';
import css from '../ImageGallery/ImageGallery.module.css'


export const ImageGallery = ({ collections, bigImage }) => {
    return (
        <ul className={css.ImageGallery}>
            {collections.map(({ id, webformatURL, largeImageURL }) => {
                const handleItemClick = () => bigImage(largeImageURL);

                return (
                    <ImageGalleryItem
                        key={id}
                        image={webformatURL}
                        onClick={handleItemClick}
                    />
                );
            })}
        </ul>
    );
};

ImageGallery.propTypes = {
    pictures: PropTypes.array,
    bigImage: PropTypes.func,
};