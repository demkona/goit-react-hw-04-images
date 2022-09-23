import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import css from '../ImageGallery/ImageGallery.module.css'

export const ImageGallery = ({ collections }) => (
    <ul className={css.ImageGallery}>
        {collections.map(({ id, webformatURL }) => (
            <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
            />
        ))}
    </ul>
);