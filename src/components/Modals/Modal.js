import React, { Component } from "react";

//CSS
import "./Modals.css";

class Modal extends Component {
  render() {
    return (
      <div className="modal modal-add">
        <div className="modal-inner">
          <div className="modal-header border-bottom">
            <p className="modal-heading heading-6">{this.props.heading}</p>
            <button className="btn btn-floating btn-close">
              <i className="icon icon-large fas fa-times" />
            </button>
          </div>
          <div className="modal-body border-bottom">{this.props.children}</div>
          <div className="modal-footer">
            <div className="modal-footer-left" />
            {this.props.footer.map((button, i) => {
              return (
                <button
                  className={`${button.accent ? "btn--accent " : ""}btn${
                    button.position === "right" ? " btn-right " : ""
                  }`}
                  key={`btn-right-${i}`}
                >
                  {button.name}
                </button>
              );
            })}
            {/* <div className="modal-footer-right float-right">
              <button className="btn">Annuler</button>
              <button className="btn btn--accent">Enregistrer</button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
