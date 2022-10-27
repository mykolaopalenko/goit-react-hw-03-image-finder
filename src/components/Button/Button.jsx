import { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from './Button.styled';

export class LoadMoreBtn extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button type="button" onClick={onClick}>
        Load more
      </Button>
    );
  }
}

LoadMoreBtn.propTypes = { onClick: PropTypes.func };