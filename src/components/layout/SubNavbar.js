import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SubNavbar = props => {
  const { id } = props;
  return (
    <div className="max-w-3xl mx-auto mb-4 md:mb-8 px-8 text-center md:px-24 ">
      <NavLink
        exact
        to={`/${id}`}
        className="link mr-4 my-2"
        activeClassName="active bg-grey-lighter"
      >
        Aperçu
      </NavLink>
      <NavLink
        exact
        to={`/${id}/boards`}
        className="link mr-4 my-2"
        activeClassName="active bg-grey-lighter"
      >
        Tableaux
      </NavLink>
      <NavLink
        exact
        to={`/${id}/recipes`}
        className="link mr-4 my-2"
        activeClassName="active bg-grey-lighter"
      >
        Recettes
      </NavLink>
      <NavLink
        exact
        to={`/${id}/subscribers`}
        className="link mr-4 my-2"
        activeClassName="active bg-grey-lighter"
      >
        Abonnés
      </NavLink>
      <NavLink
        exact
        to={`/${id}/subscriptions`}
        className="link my-2"
        activeClassName="active bg-grey-lighter"
      >
        Abonnements
      </NavLink>
    </div>
  );
};

SubNavbar.proptypes = {
  id: PropTypes.string.isRequired
};

export default SubNavbar;
