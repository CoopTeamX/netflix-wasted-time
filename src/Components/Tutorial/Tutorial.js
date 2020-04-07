import React, { Component } from "react";
import Modal from "react-modal";

import "./Tutorial.scss";
import loginImage from "./images/en/login.png";
import activityImage from "./images/en/activity.png";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleModalCloseRequest = () => {
    // opportunity to validate something and keep the modal open even if it
    // requested to be closed
    this.setState({ modalIsOpen: false });
  };

  handleSaveClicked = (e) => {
    alert("Save button was clicked");
  };

  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary btn-modal"
          onClick={this.openModal}
        >
          Find out how to download your Netflix history
        </button>
        <Modal
          className="Modal__Bootstrap modal-dialog modal-lg"
          closeTimeoutMS={150}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleModalCloseRequest}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">How to get your Netflix history?</h4>
              <button
                type="button"
                className="close"
                onClick={this.handleModalCloseRequest}
              >
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="modal-body">
              <h2>1. Login to your Netflix account</h2>
              <img
                src={loginImage}
                className="modal-image"
                alt="Netflix login page"
              />
              <h2>
                2. Go to your{" "}
                <a
                  target="blank_"
                  href="https://www.netflix.com/viewingactivity"
                >
                  viewing activity
                </a>
              </h2>
              <h2>3. Download all your viewing activity</h2>
              <img
                src={activityImage}
                className="modal-image"
                alt="Viewing activity page"
              />
              <h2>4. Upload your viewing activity on "Wasted on Netflix" !</h2>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleModalCloseRequest}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
