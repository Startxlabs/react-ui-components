import React, { useEffect, useState } from "react";
import PlacesAutocomplete, { getLatLng, geocodeByPlaceId } from "react-places-autocomplete";

export type LocationInfo = {
  lat: number;
  lng: number;
  address: string;
  postalCode: string | null;
};

type ListItemStyle = {
  hover?: React.CSSProperties;
  style: React.CSSProperties;
};

interface LocationInput {
  input: React.ElementType;
  handleChange: (data: LocationInfo) => void;
  value: string;
  listItemStyle: ListItemStyle;
}

const LocationInput: React.FC<LocationInput> = ({ value, handleChange, input, listItemStyle }) => {
  const [address, setAddress] = useState("");

  const handleSelect = async (address: string, placeId: string) => {
    setAddress(address);

    const response = await geocodeByPlaceId(placeId);

    if (response?.length) {
      const result = response[0];
      let postalCode = null;

      const { lat, lng } = await getLatLng(result);

      result?.address_components.map((component) => {
        if (component.types.includes("postal_code")) {
          postalCode = component.short_name || component.long_name;
        }
      });

      handleChange({
        lat,
        lng,
        address,
        postalCode,
      });
    }
  };

  useEffect(() => {
    if (value) setAddress(value);
  }, [value]);

  const Input = input as "input";

  return (
    <PlacesAutocomplete
      value={address}
      onChange={(address) => setAddress(address)}
      onSelect={handleSelect}
      searchOptions={{ componentRestrictions: { country: "AU" } }}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <h2>Location</h2>
          <Input
            id="location"
            name="location"
            {...getInputProps({
              classname: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <span>Loading....</span>}
            {suggestions.map((suggestion) => {
              let style = { ...listItemStyle.style };

              if (listItemStyle.hover && suggestion.active) {
                style = { ...style, ...listItemStyle.hover };
              }

              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className: "suggestion-item",
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationInput;
