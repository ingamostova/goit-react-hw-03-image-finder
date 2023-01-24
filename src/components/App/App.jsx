import React, { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { fetchImages } from 'api';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    pictures: [],
    page: 1,
    totalPictures: 0,
    searchQuerry: null,
    isLoading: false,
    error: null,
    largeImageURL: '',
    showModal: false,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: (prevState.page += 1),
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevImage = prevState.searchQuerry;
    const nextImage = this.state.searchQuerry;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage || prevPage !== nextPage) {
      try {
        this.setState({ isLoading: true, error: null });
        const data = await fetchImages(nextImage, nextPage);
        console.log(data);
        if (!data.hits.length) {
          throw new Error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...data.hits],
          totalPictures: data.totalHits,
        }));
      } catch (error) {
        this.setState({
          error: error.message,
        });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = searchQuerry => {
    console.log(searchQuerry);
    this.setState({ searchQuerry, page: 1, pictures: [] });
  };

  onToggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  onOpenModal = evt => {
    const largeImageURL = evt.target.dataset.source;
    // console.log(largeImageURL);
    if (largeImageURL) {
      this.setState({ largeImageURL: largeImageURL });
      this.onToggleModal();
    }
  };

  render() {
    const {
      isLoading,
      error,
      pictures,
      totalPictures,
      showModal,
      largeImageURL,
    } = this.state;
    const { handleSubmit, loadMore, onOpenModal } = this;
    const difference = pictures.length < totalPictures;

    return (
      <Container>
        <Searchbar onSubmit={handleSubmit} />
        {error && <p>{error}</p>}
        {/* {pictures.length > 0 && !isLoading && ( */}
        <ImageGallery onClick={onOpenModal} pictures={pictures} />
        {/* )} */}
        {pictures.length > 0 && !isLoading && difference && (
          <Button onClick={loadMore} />
        )}
        {isLoading && <Loader />}
        {showModal && (
          <Modal onToggleModal={this.onToggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </Container>
    );
  }
}
