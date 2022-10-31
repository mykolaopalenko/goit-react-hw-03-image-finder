import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Searchbarstyle,
  SearchForm,
  SearchFormBtn,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { searchQuery: '' };

  searchformOnSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  inputOnChange = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  render() {
    return (
      <Searchbarstyle>
        <SearchForm onSubmit={this.searchformOnSubmit}>
          <SearchFormBtn type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </SearchFormBtn>
          <SearchFormInput
            onChange={this.inputOnChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
          ></SearchFormInput>
        </SearchForm>
      </Searchbarstyle>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

