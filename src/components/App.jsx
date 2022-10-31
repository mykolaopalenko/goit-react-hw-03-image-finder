import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';
import * as api from './servicesApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    gallery: [],
    isLoadMoreBtnExist: false,
    isModalOpen: false,
    modalImage: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.fetchImageGallery(this.state.query, this.state.page);
    }
  }

  searchImages = query => {
    if (query.trim() === '') {
      toast.error('Please, enter your request');
      return;
    }
    if (query === this.state.query) {
      toast.error('Please, enter something new');
      return;
    }
    this.setState({ query, page: 1, gallery: [] });
  };

  fetchImageGallery = async (query, page) => {
    try {
      this.setState({ loading: true });
      const gallery = await (await api.fetchGallery(query, page)).gallery;
      this.setState(prevState => ({
        gallery: [...prevState.gallery, ...gallery],
        loading: false,
      }));
      if (gallery.length === 0) {
        toast.error('Nothing found for your request. Please, try again', {
          theme: 'colored',
        });
      }
    } catch (error) {
      this.setState({ error: 'Something went wrong, please, try again' });
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  changePage = () => {
    return (this.currentPage += 1);
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  getBigImage = async image => {
    this.setState(prevState => {
      return { modalImage: image };
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchImages} />

        {this.state.gallery.length !== 0 && (
          <ImageGallery
            gallery={this.state.gallery}
            openModal={this.toggleModal}
            getBigImage={this.getBigImage}
          />
        )}

        {this.state.isLoading && <Loader />}

        {this.state.gallery.length >= 12 && (
          <LoadMoreBtn onClick={this.loadMoreImages} />
        )}

        {this.state.isModalOpen && (
          <Modal closeModal={this.toggleModal} image={this.state.modalImage} />
        )}
        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
