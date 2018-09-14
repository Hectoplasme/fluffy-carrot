import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SubNavbar = props => {
  const { slug } = props;
  if (slug) {
    return (
      <div className="max-w-3xl mx-auto mb-4 md:mb-8 px-8 text-center md:px-24 ">
        <NavLink
          exact
          to={`/${slug}`}
          className="link mr-4 my-2"
          activeClassName="active bg-grey-lighter"
        >
          Aperçu
        </NavLink>
        <NavLink
          exact
          to={`/${slug}/boards`}
          className="link mr-4 my-2"
          activeClassName="active bg-grey-lighter"
        >
          Tableaux
        </NavLink>
        <NavLink
          exact
          to={`/${slug}/recipes`}
          className="link mr-4 my-2"
          activeClassName="active bg-grey-lighter"
        >
          Recettes
        </NavLink>
        <NavLink
          exact
          to={`/${slug}/subscribers`}
          className="link mr-4 my-2"
          activeClassName="active bg-grey-lighter"
        >
          Abonnés
        </NavLink>
        <NavLink
          exact
          to={`/${slug}/subscriptions`}
          className="link my-2"
          activeClassName="active bg-grey-lighter"
        >
          Abonnements
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="max-w-3xl mx-auto mb-4 md:mb-8 px-8 text-center md:px-24 ">
        <div className="link mr-4 my-2 w-32 h-12 bg-grey-lighter" />
        <div className="link mr-4 my-2 w-32 h-12 bg-grey-lighter" />
        <div className="link mr-4 my-2 w-32 h-12 bg-grey-lighter" />
        <div className="link mr-4 my-2 w-32 h-12 bg-grey-lighter" />
        <div className="link mr-4 my-2 w-32 h-12 bg-grey-lighter" />
      </div>
    );
  }
};

SubNavbar.proptypes = {
  slug: PropTypes.string
};

export default SubNavbar;
