// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//      http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Returns the customized configuration data from URL hash parameters.
 *
 * @returns {Partial<NeighbourhoodDiscoveryConfig>} The customized configuration data.
 */
export const getCustomConfig = () => {
  const params = new URLSearchParams(window.location.hash.replace("#", ""));

  const locationConfig = {
    ...(params.get("location.coordinates.lat") &&
      params.get("location.coordinates.lng") && {
        coordinates: {
          lat: Number(params.get("location.coordinates.lat")),
          lng: Number(params.get("location.coordinates.lng")),
        },
      }),
  };

  const poiConfig = {
    ...(params.get("poi.types") && {
      types: params.getAll("poi.types"),
    }),
    ...(params.get("poi.searchRadius") && {
      searchRadius: Number(params.get("poi.searchRadius")),
    }),
    ...(params.get("poi.density") && {
      density: Number(params.get("poi.density")),
    }),
  };

  return {
    ...(Object.values(locationConfig).length && { location: locationConfig }),
    ...(Object.values(poiConfig).length && { poi: poiConfig }),
  };
};

/**
 * Sets overrides for the configuration data as URL hash parameters.
 * If the passed value is `undefined`, the given parameter will be removed from the URL.
 *
 * @param {string} parameter - The name of the URL hash parameter to set.
 * @param {string | number | Array<string | number> | undefined} value - The value of the URL hash parameter to set.
 */
export const setCustomConfig = (parameter, value) => {
  const params = new URLSearchParams(window.location.hash.replace("#", ""));

  if (value) {
    if (Array.isArray(value)) {
      // Delete array parameter values and add new array values
      params.delete(parameter);
      for (let index = 0; index < value.length; index++) {
        params.append(parameter, value[index]);
      }
    } else {
      // Override parameter value
      params.set(parameter, value);
    }
  } else {
    // Remove parameter value
    params.delete(parameter);
  }

  window.location.hash = params;
};

/**
 * Returns the data of an HTML form element in form of an object.
 *
 * @param {HTMLFormElement} form - The HTML form element to get the data from.
 * @returns {Object} The form data as object.
 */
const getFormData = (form) => {
  const formData = new FormData(form);

  return Array.from(formData.keys()).reduce((result, key) => {
    const inputType = form.querySelector(`input[name="${key}"]`).type;
    // Handle numeric input values
    const isNumericValue = inputType === "number" || inputType === "range";
    const value = isNumericValue
      ? Number(formData.get(key))
      : formData.get(key);

    if (key.includes(".")) {
      // Handle object data with dot-separated keys
      // e.g. "my.nested.keys" results in {my: {nested: {keys: ...}}}
      const [objectKey, ...nestedKeys] = key.split(".");

      const setNestedProperty = (object, properties, value) => {
        const [property, ...nestedProperties] = properties;
        return {
          ...object,
          [property]: nestedProperties.length
            ? setNestedProperty(nestedProperties, value)
            : value,
        };
      };

      result[objectKey] = setNestedProperty(
        result[objectKey] || {},
        nestedKeys,
        value
      );
    } else if (result[key]) {
      // Combine the values of inputs with the same name as array
      result[key] = formData.getAll(key);
    } else {
      result[key] = value;
    }

    return result;
  }, {});
};

/**
 * Returns the location configuration from the config center UI.
 *
 * @returns {LocationConfig} The location configuration.
 */
export const getLocationConfig = () => {
  const locationConfigForm = document.querySelector(
    'form[name="location-config"]'
  );
  // const locationConfigForm = document.querySelectorAll(
  //   'form[name="location-config"]'
  // )[1];
  // console.log("=======", getFormData(locationConfigForm));
  return getFormData(locationConfigForm);
};

/**
 * Returns the POI configuration from the config center UI.
 *
 * @returns {PoiConfig} The POI configuration.
 */
export const getPoiConfig = () => {
  const poiConfigForm = document.querySelector('form[name="poi-config"]');
  const poiConfig = getFormData(poiConfigForm);

  return {
    ...poiConfig,
    // Make sure the `types` are always returned in form of an array
    types: Array.isArray(poiConfig.types)
      ? poiConfig.types
      : [poiConfig.types].filter(Boolean),
  };
};

/**
 * Returns the configuration data from the config center UI.
 *
 * @returns {NeighbourhoodDiscoveryConfig} The configuration data.
 */
export const getConfigCenterConfig = () => ({
  location: getLocationConfig(),
  poi: getPoiConfig(),
});
