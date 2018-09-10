import React, { Component } from "react";
import classnames from "classnames";

export class ModalHeader extends Component {
  render() {
    return (
      <div>
        <div className="text-xl sm:text-2xl font-bold pl-4 pr-16 sm:px-16 text-center py-6 sm:py-8 border-b border-grey-lighter">
          {this.props.children}
        </div>
        <button className="btn-floating absolute pin-r pin-t mr-2 mt-1 sm:mt-4 sm:mr-4 overflow-hidden hover:bg-transparent after:bg-grey-light">
          <i className="fas fa-times icon" />
        </button>
      </div>
    );
  }
}

export class ModalFooter extends Component {
  render() {
    return (
      <div className="px-4 pt-4 flex flex-col sm:flex-row border-t border-grey-lighter">
        {this.props.children}
      </div>
    );
  }
}

export class ModalBody extends Component {
  render() {
    return <div className="p-4">{this.props.children}</div>;
  }
}

export class Modal extends Component {
  render() {
    return (
      <div
        className="min-h-screen p-4 pt-8 pb-20"
        style={{
          background: "rgba(0, 0, 0, 0.15)"
        }}
      >
        <div
          className={classnames(
            "relative mx-auto pb-4 bg-white rounded-lg mx-4 mt-12lg:mt-0",
            {
              "max-w-lg": !this.props.thin,
              "max-w-sm": this.props.thin
            }
          )}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
