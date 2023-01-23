import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Overlay, Container } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component() {
  //   componentDidMount() {
  // window.addEventListener('keydown', this.handleKeyDown);
  // console.log(this.props);
  //   }

  //   handleKeyDown = e => {
  //     if (e.code === 'Escape') {
  //       this.props.onClose();
  //     }
  //   };

  render() {
    <Overlay className="overlay">
      <Container className="modal">
        <img src="" alt="" />
      </Container>
    </Overlay>;
  }
}
