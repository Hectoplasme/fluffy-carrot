import React, { Component } from "react";

class About extends Component {
  render() {
    return (
      <div className="max-w-2xl mx-auto px-8 py-12 md:px-24">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8">A propos</h1>
        <p className="leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div className="mt-4 ">
          <a
            href="http://github.com"
            target="_blank"
            className="btn-floating btn-floating--accent mr-2"
          >
            <i className="fab fa-github icon" />
          </a>
          <a
            href="http://laurianneterrier.com"
            target="_blank"
            className="btn-floating btn-floating--accent mr-2"
          >
            <i className="fas fa-globe icon" />
          </a>
          <a
            href="http://laurianneterrier.tumblr.com"
            target="_blank"
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
