import React from "react";
import PropTypes from "prop-types";

const List = props => {
  const { title, icon, items } = props;
  return (
    <div className="mt-4">
      <div className="text-lg font-bold mb-4">{title}</div>
      <ul className="p-0">
        {items.map((item, i) => {
          if (icon) {
            return (
              <li
                key={`list-item-${i}`}
                className="flex items-center px-0 pb-4"
              >
                <i className={`icon fas fa-${icon} mr-2`} />
                {item}
              </li>
            );
          } else {
            return (
              <li
                key={`list-item-${i}`}
                className="block py-4 clearfix mb-4 leading-normal"
              >
                <span className="text-6xl font-bold float-left align-top mr-4 -mt-2">
                  {i + 1}.
                </span>
                {item}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

List.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default List;
