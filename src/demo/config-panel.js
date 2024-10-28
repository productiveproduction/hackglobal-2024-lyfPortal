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

import { config } from "../Google3DTiles.jsx";
import { getLocationSettingsSection } from "./location-settings.js";
import { getPlaceSettingsSection } from "./place-settings.js";

import { updateCamera, updateLocation, updateMarkers } from "./utils/app.js";
import { getCustomConfig } from "./utils/config.js";


/**
 * Toggles the visibility of configuration sections based on the state of a configuration section.
 *
 * If the state of the configuration section is "open," it closes all other configuration sections will be closed.
 *
 * @param {Event} event - The event object of the clicked `details` element
 * specifically the `newState` property.
 */
const toggleConfigSection = (event) => {
  if (event.newState === "open") {
    const details = document.querySelectorAll(
      `.config-section:not(#${event.target.id})`
    );

    details.forEach((detail) => (detail.open = false));
  }
};

/**
 * Creates the config center UI and adds it to the DOM
 */
export const createConfigCenter = async () => {
  const customConfig = getCustomConfig();
  // Combine the config customizations with the default config
  const locationConfig = { ...config.location, ...customConfig.location };
  const poiConfig = { ...config.poi, ...customConfig.poi };

  const flyModal = document.querySelector(".modal-flying");

  const configCenterPanel = document.createElement("details");
  configCenterPanel.classList.add("config-center-panel");
  configCenterPanel.open = true;

  // Create the config center summary HTML elements
  const summary = document.createElement("summary");

  const locationSection = await getLocationSettingsSection(locationConfig);

  // Create the config center details HTML elements
  const placeTypesSection = await getPlaceSettingsSection(poiConfig);

  [placeTypesSection].forEach((section) => {
    section.addEventListener("toggle", toggleConfigSection);
  });

  // Append the HTML elements to the container
  summary.appendChild(locationSection);

  configCenterPanel.appendChild(summary);
  configCenterPanel.appendChild(placeTypesSection);
  flyModal.appendChild(configCenterPanel);
  document.querySelector('.location-input input').focus()
  
  // Update the map according to the received custom config
  if (customConfig.camera) {
    updateCamera();
  }
  if (customConfig.location) {
    updateLocation();
  }
  if (customConfig.location || customConfig.poi) {
    updateMarkers();
  }
};
