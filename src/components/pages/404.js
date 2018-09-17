import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12 md:px-24">
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">Page introuvable</h1>
      <p className="leading-normal">
        Oups! Il semble que la page que vous cherchez n'existe pas...
      </p>
      <div className="mt-4 ">
        <Link to="/" className="link font-normal text-purple-dark -ml-4">
          <i className="fas fa-chevron-left icon mr-4" />
          Retour à l'acceuil
        </Link>
      </div>
    </div>
  );
};

export default Page404;
