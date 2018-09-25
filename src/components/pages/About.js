import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="max-w-2xl mx-auto px-8 py-12 md:px-24">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8">A propos</h1>
        <p className="leading-normal">
          Fluffy Cookie est un projet personnel conçu pour me permettre
          d'enrichir et valider mes compétences en front-end et back-end. Les
          technologies utilisées sont: ReactJs, Google Firestore et TailwindCSS.{" "}
          <a
            href="http://github.com/hectoplasme/fluffy-carrot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple"
          >
            Retrouvez le code de ce projet sur github
          </a>
          .<br />
          <br />
          Sinon, lorsque je ne code pas, je joue du piano ou je dessine. Vous
          pouvez me retrouver sur{" "}
          <a
            href="http://laurianneterrier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple"
          >
            mon site web
          </a>{" "}
          ou admirer mes illustrations sur{" "}
          <a
            href="http://laurianneterrier.tumblr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple"
          >
            tumblr
          </a>
          .
        </p>
        <div className="mt-4 ">
          <a
            href="https://github.com/Hectoplasme/fluffy-carrot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-floating btn-floating--accent mr-2"
          >
            <i className="fab fa-github icon" />
          </a>
          <a
            href="http://laurianneterrier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-floating btn-floating--accent mr-2"
          >
            <i className="fas fa-globe icon" />
          </a>
          <a
            href="http://laurianneterrier.tumblr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-floating btn-floating--accent mr-2"
          >
            <i className="fab fa-tumblr icon" />
          </a>
        </div>
      </div>
    );
  }
}

export default About;
