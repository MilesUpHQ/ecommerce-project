import { AsyncTypeahead } from "react-bootstrap-typeahead";

const TypeAhead = ({
  options,
  handleSearch,
  setSearchItem,
  searchItem,
  isLoading,
  placeholder,
  setSearchInput,
  searchInput,
  handleSearchFilter,
  asyncSearch,
  notAsyncSearch
}) => {
  return (
    <AsyncTypeahead
      filterBy={() => true}
      id="async-example"
      isLoading={isLoading}
      minLength={3}
      onSearch={asyncSearch && handleSearch}
      options={options}
      onInputChange={(text, e) => {
        notAsyncSearch && setSearchInput(text);
        notAsyncSearch && handleSearch(text); 
      }}
      onChange={setSearchItem}
      placeholder={placeholder}
      selected={searchItem}
      onKeyDown={(e) =>
        notAsyncSearch && e.key === "Enter" ? handleSearchFilter(searchInput) : ""
      }
    />
  );
};

export default TypeAhead;
