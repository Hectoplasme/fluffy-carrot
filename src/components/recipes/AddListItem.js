import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class AddList extends Component {
  state = {
    itemNew: "",
    items: [],
    itemsFromParent: false
  };

  static getDerivedStateFromProps(props, state) {
    const { items } = props;
    const { itemsFromParent } = state;
    const newState = {};
    if (items && !itemsFromParent) {
      items.forEach((item, i) => {
        newState[`item-${i + 1}`] = item;
      });
      //Return list to parent component state
      props.update(items);
      return {
        ...newState,
        items: ["", ...items],
        itemsFromParent: true
      };
    } else {
      return null;
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      items: this.updateArray(this.state)
    });
  };

  onUpdateStep = e => {
    this.setState({
      [e.target.name]: e.target.value,
      items: this.updateArray(this.state, false, null, e.target.name)
    });
  };

  updateArray = (state, adding = false, i = null, item) => {
    let arrayItems = [];
    if (adding) {
      arrayItems.push("");
    }

    for (let key in state) {
      if (
        key !== "items" &&
        key !== "adding" &&
        key !== "itemNew" &&
        key !== `item-${i}` &&
        key !== "itemsFromParent" &&
        key !== item
      ) {
        arrayItems.push(state[key]);
      } else if (key === `item-${i}`) {
        arrayItems.push(" ");
      } else if (key === item) {
        const elementValue = this.stepContainer.querySelector(
          `textarea[name=${item}]`
        ).value;
        arrayItems.push(elementValue);
      } else if (!adding && key !== "itemNew" && key !== "itemsFromParent") {
        arrayItems.push(this.inputNew.value);
      }
    }
    if (adding) {
      arrayItems.push(this.inputNew.value);
    }

    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space
    const arrayReturnToParent = arrayItems.filter(item => !regexp.test(item)); // Return only not empty items

    //Return list to parent component
    this.props.update(arrayReturnToParent);

    return arrayItems;
  };

  addItem = () => {
    const regexp = RegExp(/^ *$/); //Test if the string is empty or contain only space
    if (!regexp.test(this.inputNew.value)) {
      let index = this.state.items.length;
      this.setState({
        [`item-${index}`]: this.inputNew.value,
        items: this.updateArray(this.state, true),
        itemNew: ""
      });
    }
  };

  deleteItem = i => {
    this.setState({
      [`item-${i}`]: " ",
      items: this.updateArray(this.state, false, i)
    });
  };

  render() {
    const { title, placeholder, labelButton, step, error } = this.props;
    const { items } = this.state;
    let stepCount = 0;

    if (!step) {
      return (
        <div className="pt-4 pb-8 border-b border-grey-lighter">
          <label className="block font-bold mb-3 text-lg">{title}</label>
          {items.map((item, i) => {
            if (i !== 0 && item !== " ") {
              return (
                <div key={`item-${i}`} className="my-1">
                  <span
                    className="mr-2 btn-floating h-6 w-6 cursor-pointer"
                    onClick={this.deleteItem.bind(this, i)}
                  >
                    <i className="fas fa-minus icon text-xs" />
                  </span>
                  <span>{item}</span>
                </div>
              );
            }
            return null;
          })}
          <br />
          <input
            type="text"
            name="itemNew"
            value={this.state.itemNew}
            onChange={this.onChange}
            placeholder={placeholder}
            ref={ref => (this.inputNew = ref)}
            onKeyPress={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                this.addItem();
              }
            }}
            className={classnames(
              "inline-block w-full md:w-64 p-3 mb-2 mr-2 rounded",
              {
                "border border-grey-dark": !error,
                "border-red border": error
              }
            )}
          />
          <button
            type="button"
            className="w-full md:w-auto block md:inline-block mt-2 font-bold btn cursor-pointer"
            onClick={this.addItem}
          >
            <i className="fas fa-plus icon" />
            {labelButton}
          </button>
          {error && (
            <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
              {error}
            </span>
          )}
        </div>
      );
    } else {
      return (
        <div
          ref={ref => (this.stepContainer = ref)}
          className="py-8 border-b border-grey-lighter"
        >
          <label className="block font-bold mb-4 text-lg">{title}</label>
          <div className="mb-2">
            {items.map((item, i) => {
              if (i !== 0 && item !== " ") {
                stepCount++;
                return (
                  <div key={`item-${i}`} className="my-1">
                    <span
                      className="mr-2 btn-floating h-6 w-6 cursor-pointer"
                      onClick={this.deleteItem.bind(this, i)}
                    >
                      <i className="fas fa-minus icon text-xs" />
                    </span>
                    <span>
                      Etape n°
                      {stepCount}
                    </span>
                    <textarea
                      name={`item-${i}`}
                      // data-key={`item-${i}`}
                      value={this.state[`item-${i}`]}
                      onChange={this.onUpdateStep}
                      placeholder={placeholder}
                      ref={ref => (this.inputNew = ref)}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      className="w-full h-32 p-3 my-2 border border-grey-dark rounded resize-none"
                    />
                  </div>
                );
              }
              return null;
            })}
            <span
              className={classnames({
                "text-red": error
              })}
            >
              Etape n°
              {stepCount + 1}
            </span>
            <textarea
              name="itemNew"
              value={this.state.itemNew}
              onChange={this.onChange}
              placeholder={placeholder}
              ref={ref => (this.inputNew = ref)}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              className={classnames(
                "w-full h-32 p-3 my-2 rounded resize-none",
                {
                  "border border-grey-dark": !error,
                  "border-red border": error
                }
              )}
            />
          </div>
          {error && (
            <span className="block my-1 p-4 font-normal rounded bg-red-lightest border border-red italic text-sm">
              {error}
            </span>
          )}
          <button
            type="button"
            className="w-full sm:w-auto ml-auto block mt-2 font-bold btn"
            onClick={this.addItem}
          >
            <i className="fas fa-plus icon" />
            {labelButton}
          </button>
        </div>
      );
    }
  }
}

AddList.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelButton: PropTypes.string.isRequired,
  items: PropTypes.array,
  update: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default AddList;
