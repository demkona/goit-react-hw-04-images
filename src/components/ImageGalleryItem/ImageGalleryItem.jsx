import css from '../ImageGalleryItem/ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ id, webformatURL, }) => (
    <li className={css.ImageGalleryItem} key={id}>
        <img className={css.ImageGalleryItemImage} src={webformatURL} alt={webformatURL} />
    </li>
);