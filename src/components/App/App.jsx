import React, { Component } from "react";
import axios from "axios";
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery'
import { Loader } from '../Loader/Loader'

axios.defaults.baseURL = "https://pixabay.com/api/?q=cat&page=1&key=29162129-cd407d8c81083a7eed9c52ced&image_type=photo&orientation=horizontal&per_page=400";



export class App extends Component {
  state = {
    collections: [],
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const response = await axios.get("/");
    this.setState({
      collections: response.data.hits,
      isLoading: false,
      error: null,
    });



  }

  render() {
    const { collections } = this.state;
    return (
      <div>
        <Searchbar />
        <Loader />
        <ImageGallery collections={collections} />
      </div>
    );
  }
}
