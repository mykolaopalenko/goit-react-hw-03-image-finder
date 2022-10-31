import { Component } from 'react';
import { findImage, PER_PAGE } from './servicesApi';
import { Searchbar } from './Searchbar/Searchbar';
import { Error } from './Error/Error';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './Button/Button';

export class App extends Component {
  state = {
    query: '',
    isLoading: false,
    images: [],
    isLoadMoreBtnExist: false,
    isModalOpen: false,
    modalImage: null,
    error: null,
  };

  searchImages = async searchQuery => {
   this.setState({ isLoading: true });

   if (this.state.query !== searchQuery) {
     this.setState({ query: searchQuery });
     this.currentPage = 1;
   }

   try {
     await findImage(searchQuery, this.currentPage).then(response => {
       if (response.totalHits > PER_PAGE) {
         this.setState({
           isLoadMoreBtnExist: true,
           images: response.hits,
           isLoading: false,
           error: null,
         });
       } else if (response.totalHits <= PER_PAGE && response.totalHits > 0) {
         this.setState({
           isLoadMoreBtnExist: false,
           images: response.hits,
           isLoading: false,
           error: null,
         });
       } else if (response.totalHits === 0) {
         this.setState({
           isLoadMoreBtnExist: false,
           images: response.hits,
           isLoading: false,
           error: 'No results',
         });
       }
     });
   } catch (err) {
     this.setState({ error: err });
   }
 };

  loadMoreImages = () => {
    this.setState({ isLoading: true });
    this.currentPage = this.changePage();

    try {
      findImage(this.state.query, this.currentPage).then(response => {
        this.setState({
          images: [...this.state.images, ...response.hits],
          isLoading: false,
        });
        if (this.currentPage > Math.floor(response.totalHits / PER_PAGE)) {
          this.setState({
            isLoadMoreBtnExist: false,
          });
        }
      });
    } catch (err) {
      this.setState({ err });
    }
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

        {this.state.images.length !== 0 && (
          <ImageGallery
            images={this.state.images}
            openModal={this.toggleModal}
            getBigImage={this.getBigImage}
          />
        )}

        {this.state.isLoading && <Loader />}

        {this.state.isLoadMoreBtnExist && (
          <LoadMoreBtn onClick={this.loadMoreImages} />
        )}

        {this.state.isModalOpen && (
          <Modal closeModal={this.toggleModal} image={this.state.modalImage} />
        )}

        {this.state.error && <Error children={this.state.error} />}
      </>
    );
  }
}
