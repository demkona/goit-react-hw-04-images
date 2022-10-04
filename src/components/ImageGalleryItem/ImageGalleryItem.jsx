import css from '../ImageGalleryItem/ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ picturesId, srcWebformat, onClick }) => {
    return (
        <li className={css.ImageGalleryItem} onClick={onClick}>
            <img
                src={srcWebformat}
                alt=""
                className={css.ImageGalleryItemImage}
            />
        </li>
    );
};
