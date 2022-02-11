import { AsyncTypeahead } from "react-bootstrap-typeahead";

const TypeAhead = ({
  options,
  handleSearch,
  setSearchItem,
  searchItem,
  isLoading,
  placeholder
}) => {
  return (
    <AsyncTypeahead
      filterBy={() => true}
      id="async-example"
      isLoading={isLoading}
      minLength={3}
      onSearch={handleSearch}
      options={options}
      onChange={setSearchItem}
      placeholder={placeholder}
      selected={searchItem}
    />
  );
};

export default TypeAhead;
