import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";

const MultipleTypeAhead = ({
  options,
  handleSearch,
  setSearchItem,
  searchItem,
  isLoading,
  placeholder,
  handleSearchFilter,
  onEnterSearchItems,
}) => {
  const SearchButton = ({ onClick }) => (
    <button
      onClick={onClick}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      className="btn btn-primary"
      style={{
        top: 0,
        right: 0,
        bottom: 0,
        border: 0,
        padding: "0 12px",
        position: "absolute",
        borderRadius: "0 5px 5px 0",
      }}
    >
      Search
    </button>
  );

  const [value, setValue] = React.useState(null);
  return (
    <Typeahead
      multiple
      filterBy={() => true}
      id="async-example"
      isLoading={isLoading}
      minLength={3}
      options={options}
      onInputChange={(text, e) => {
        onEnterSearchItems && setValue(text);
        handleSearch(text);
      }}
      onChange={setSearchItem}
      placeholder={placeholder}
      selected={searchItem}
      onKeyDown={(e) =>
        onEnterSearchItems && e.key === "Enter" ? handleSearchFilter(value) : ""
      }
    >
      {onEnterSearchItems && (
        <SearchButton onClick={() => handleSearchFilter(value)} />
      )}
    </Typeahead>
  );
};

export default MultipleTypeAhead;
