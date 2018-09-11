import React, { Component } from "react";
import classnames from "classnames";
import Spinner from "../layout/Spinner";

import firebase from "firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

export default class AddRecipeImg extends Component {
  state = {
    imgUrl: "",
    isUploading: false,
    progress: 0,
    fileTooBig: false,
    img: "img-url",
    showImgUrlInput: true,
    error: ""
  };

  onFileUploadStart = e => {
    this.setState({
      isUploading: true,
      progress: 0
    });
  };

  handleUploadError = error => {
    this.setState({
      isUploading: false,
      error: "L'image n'a pas été téléchargée avec succès.."
    });
  };

  handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({
          imgUrl: url,
          progress: 100,
          isUploading: false
        });

        this.props.onSuccess();
      });
  };

  onChange = e => {
    if ([e.target.name] === "img" && e.target.value === "img-url") {
      this.setState({
        [e.target.name]: e.target.value,
        showImgUrlInput: true
      });
    } else if ([e.target.name] === "img" && e.target.value !== "img-url") {
      this.setState({
        [e.target.name]: e.target.value,
        showImgUrlInput: false,
        imgUrl: ""
      });
    } else {
      this.props.onSuccess(e.target.value);
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  render() {
    const errorUpload = this.state.error;
    const { error } = this.props;
    return (
      <div className="w-full">
        <div className="relative mb-3">
          <label htmlFor="img" className="block font-bold mb-1 text-lg">
            Photo de la recette
          </label>
          <i className="fas fa-chevron-down absolute pin-r mr-4 mt-6 text-grey-darker" />
          <select
            name="img"
            className="w-full mb-2 p-3 my-2 rounded bg-grey-light font-bold cursor-pointer appearance-none text-dark"
            value={this.state.img}
            onChange={this.onChange}
          >
            <option value="img-upload">Télécharger une image</option>
            <option value="img-url">Enregistrer depuis un site</option>
          </select>
          <input
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.onChange}
            placeholder="https://picsum.photos/200/300/?random"
            className={classnames("w-full p-3 mt-2 rounded", {
              "border border-grey-dark": !error,
              "border-red border-2": error,
              hidden: !this.state.showImgUrlInput
            })}
          />
        </div>
        <div className="flex justify-center">
          {!this.state.showImgUrlInput &&
            !this.state.isUploading &&
            this.state.progress === 0 && (
              <CustomUploadButton
                // htmlFor="file"
                className={classnames(
                  "flex flex-col items-align justify-center h-96 p-12 mb-4 border-2 border-dashed  rounded-lg text-center cursor-pointer",
                  {
                    "border-grey-darker": !error && !errorUpload,
                    "border-red text-red": error || errorUpload
                  }
                )}
                accept="image/*"
                name="file"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.onFileUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              >
                <i className="fas fa-camera mb-4 text-4xl" />
                <span className="font-bold text-lg">Ajouter une image</span>
                <span className="italic mt-2 text-sm">
                  ( Votre image ne doit pas excéder 1MB )
                </span>
              </CustomUploadButton>
            )}
          {!this.state.showImgUrlInput && this.state.isUploading && <Spinner />}
          {!this.state.showImgUrlInput &&
            this.state.progress === 100 && (
              <CustomUploadButton
                accept="image/*"
                name="file"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.onFileUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              >
                <img
                  src={this.state.imgUrl}
                  className="bg-grey-light rounded-lg cursor-pointer"
                  alt=""
                />
              </CustomUploadButton>
            )}
        </div>
        {errorUpload && (
          <div className="text-sm text-red italic">{errorUpload}</div>
        )}
        {error && (
          <div
            className={classnames("text-sm text-red italic", {
              hidden: errorUpload
            })}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
}
