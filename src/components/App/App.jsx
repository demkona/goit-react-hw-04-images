import React, { Component } from "react";
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from "../Button/Button";
import { Loader } from '../Loader/Loader'
import { Modal } from "../Modal/Modal";
import { ApiService } from '../../services/Api';
export class App extends Component {
  state = {
    collections: [],
    page: 1,
    query: " ",
    largeImage: "",
    imgTags: "",
    error: "",
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, { query, page }) {
    if (query !== this.state.query || page !== this.state.page) {
      this.fetchPictures();
    };
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, }));
  };

  toggleLoading = () => {
    this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
  };

  bigImage = (largeImage = "") => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  handleNextPage = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  fetchPictures = () => {
    const { page, query } = this.state;
    const options = { page, query, };
    this.toggleLoading()
    ApiService(options)
      .then((collections) => {
        this.setState((prevState) => ({
          collections: [...prevState.collections, ...collections],
        }));
      })
      .catch((error) => this.setState({ error: "Picture not found" }))
      .finally(() => {
        this.toggleLoading()
      });
  };

  changQuery = (query) => {
    this.setState({ query: query, page: 1, collections: [], error: null });
  }
  render() {
    const { collections, error, isLoading, showModal, largeImage, imgTags, page } = this.state;

    console.log('collections', collections)
    console.log('isLoading', isLoading)
    console.log('showModal', showModal)
    console.log('page', page)

    const isNotLastPage = collections.length / page === 12;
    const btnEnable = collections.length > 0 && !isLoading && isNotLastPage;
    console.log('isNotLastPage', isNotLastPage)
    console.log('btnEnable', btnEnable)

    return (
      <div>
        <Searchbar onSubmit={this.changQuery} />
        {error && <h1>{error}</h1>}
        <ImageGallery collections={collections} bigImage={this.bigImage} />
        {isLoading && <Loader />}
        {!isLoading && btnEnable && (<Button onClick={this.handleNextPage} />
        )}
        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  };
};
