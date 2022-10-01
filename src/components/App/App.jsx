import React, { Component } from "react";
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from "../Button/Button";
import { Loader } from '../Loader/Loader'
import { Modal } from "../Modal/Modal";
import { ApiService } from '../Api/Api';
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

  componentDidUpdate(prevProps, { query, }) {
    if (query !== this.state.query) {
      this.fetchPictures();
    }
  }

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

  fetchPictures = () => {
    const { page, query } = this.state;
    const options = { page, query, };
    this.toggleLoading()
    ApiService(options)
      .then((collections) => {
        this.setState((prevState) => ({
          collections: [...prevState.collections, ...collections],
          page: prevState.page + 1,
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
    const isNotLastPage = collections.length / (page - 1) === 12;
    const btnEnable = collections.length > 0 && !isLoading && isNotLastPage;
    return (
      <div>
        <Searchbar onSubmit={this.changQuery} />
        {error && <h1>{error}</h1>}
        <ImageGallery collections={collections} bigImage={this.bigImage} />
        {isLoading && <Loader />}
        {!isLoading && btnEnable && (<Button onClick={this.fetchPictures} />
        )}
        {showModal && (
          <Modal showModal={this.bigImage}>
            <img src={largeImage} alt={imgTags} />
          </Modal>
        )}
      </div>
    );
  }
}
