import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from "../Button/Button";
import { Loader } from '../Loader/Loader'
import { Modal } from "../Modal/Modal";
import { ApiService } from '../../services/Api';
import { useState, useEffect } from 'react';

export function App() {
  const [collections, setCollections] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query || !page) {
      return;
    }
    fetchPictures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleImageClick = url => {
    setLargeImage(url);
    toggleModal();
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1)
  };

  const fetchPictures = () => {
    const options = { page, query, };
    setIsLoading(true);
    ApiService(options)
      .then(prevCollections => setCollections([...collections, ...prevCollections]),
      )
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const changQuery = query => {
    setQuery(query);
    setPage(1);
    setCollections([]);
    setError(null);
  }

  const isNotLastPage = collections.length / page === 12;
  const btnEnable = collections.length > 0 && !isLoading && isNotLastPage;

  return (
    <>
      <Searchbar onSubmit={changQuery} />
      {error && <h1>{error}</h1>}
      <ImageGallery>
        {collections.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            srcWebformat={webformatURL}
            onClick={() => handleImageClick(largeImageURL)} />))}
      </ImageGallery>
      {isLoading && <Loader />}
      {!isLoading && btnEnable && (<Button onClick={handleNextPage} />)}
      {showModal && (<Modal showModal={toggleModal}>
        <img src={largeImage} alt="" />
      </Modal>
      )}
    </>
  )
}
// export class App extends Component {
//   state = {
//     collections: [],
//     page: 1,
//     query: " ",
//     largeImage: "",
//     imgTags: "",
//     error: "",
//     showModal: false,
//     isLoading: false,
//   };

//   componentDidUpdate(prevProps, { query, page }) {
//     if (query !== this.state.query || page !== this.state.page) {
//       this.fetchPictures();
//     };
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal, }));
//   };

//   toggleLoading = () => {
//     this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
//   };

//   bigImage = (largeImage = "") => {
//     this.setState({ largeImage });
//     this.toggleModal();
//   };

//   handleNextPage = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   fetchPictures = () => {
//     const { page, query } = this.state;
//     const options = { page, query, };
//     this.toggleLoading()
//     ApiService(options)
//       .then((collections) => {
//         this.setState((prevState) => ({
//           collections: [...prevState.collections, ...collections],
//         }));
//       })
//       .catch((error) => this.setState({ error: "Picture not found" }))
//       .finally(() => {
//         this.toggleLoading()
//       });
//   };

//   changQuery = (query) => {
//     this.setState({ query: query, page: 1, collections: [], error: null });
//   }
//   render() {
//     const { collections, error, isLoading, showModal, largeImage, imgTags, page } = this.state;
//     const isNotLastPage = collections.length / page === 12;
//     const btnEnable = collections.length > 0 && !isLoading && isNotLastPage;
//     return (
//       <div>
        // <Searchbar onSubmit={this.changQuery} />
        // {error && <h1>{error}</h1>}
        // <ImageGallery collections={collections} bigImage={this.bigImage} />
        // {isLoading && <Loader />}
        // {!isLoading && btnEnable && (<Button onClick={this.handleNextPage} />
        // )}
        // {showModal && (
        //   <Modal showModal={this.bigImage}>
        //     <img src={largeImage} alt={imgTags} />
        //   </Modal>
        // )}
//       </div>
//     );
//   };
// };
