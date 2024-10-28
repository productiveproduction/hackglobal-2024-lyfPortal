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

import {
  cesiumViewer,
  performFlyTo,
  setAutoOrbitCameraSpeed,
  setAutoOrbitType,
  updateZoomToRadius,
  zoomResetCallback,
} from "../../util/cesium.js";
import createMarkers from "../../util/create-markers.js";
import { getNearbyPois } from "../../util/places.js";
import { getConfigCenterConfig } from "./config.js";

/**
 * Updates the camera of the map with the current configuration values.
 */
export async function updateCamera() {
  try {
    const { camera: cameraConfig, poi: poiConfig } = getConfigCenterConfig();

    console.info("The new camera settings set by the user is camera speed: "+cameraConfig.speed+" orbit type: "+cameraConfig.orbitType)
    // Adjust the camera speed of the auto orbit animation
    setAutoOrbitCameraSpeed(cameraConfig.speed);
    await setAutoOrbitType(cameraConfig.orbitType);
    await updateZoomToRadius(poiConfig.searchRadius);
  } catch (error) {
    console.error(error);
  }
}

/**
 * Updates the location of the map with the current configuration values.
 */
export const updateLocation = async () => {
  try {
    const {
      location: { coordinates },
    } = getConfigCenterConfig();
    console.log("The new coordinates set by the user is lat: "+coordinates.lat+" long: "+coordinates.lng)

    // move the camera to face the main location's coordinates
    await performFlyTo(coordinates);
    updateZoomControl(coordinates);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates the markers on the map with the current configuration values.
 */
export const updateMarkers = async () => {
  try {
    const {
      location: { coordinates },
      poi: poiConfig,
    } = getConfigCenterConfig();

    // based on the given main location, fetch the surrounding POIs of the selected categories
    const pois = await getNearbyPois(poiConfig, coordinates);

    const clonePois = [...pois];
    console.log("======= pois", clonePois)
    
    // Fusionpolis, Singapore
    if (coordinates.lat == 1.299774 && coordinates.lng == 103.78832) {
      [
        {id: 1, link: "https://lumalabs.ai/capture/a5004f63-5c39-48eb-b49e-42af5ab710ea"},
        {id: 2, link: "https://lumalabs.ai/capture/884a4302-7f04-4d52-8b07-e64b7280c29e"},
        {id: 3, link: "https://lumalabs.ai/capture/9d7b2160-3108-47a7-a102-49d8b158c3e5"},
        {id: 4, link: "https://lumalabs.ai/capture/336434d0-f3cb-4a51-a328-fc6b3fac5263"},
        {id: 5, link: "https://lumalabs.ai/capture/8834ec26-67d5-47c7-bdc7-46671dc8981d"}
      ].map(({id, link}) => {
        pois[id].icon_mask_base_uri = "https://irp.cdn-website.com/57267e60/dms3rep/multi/Time-capsule-messages"
        pois[id].icon_background_color = "#0424BF"
        pois[id].name = "CAPSULE"
        pois[id].url = link
      })
    }
    // Hearbeat@Bedok, Singapore
    if (coordinates.lat == 1.3269753 && coordinates.lng == 103.9321493) {
      [
        {id: 1, link: "https://lumalabs.ai/capture/6f651f5b-b263-489e-bc92-5fdc221498ad"},
        {id: 2, link: "https://lumalabs.ai/capture/ed64c3c5-f737-4915-bad8-95cf49f96d66"},
        {id: 3, link: "https://lumalabs.ai/capture/e3dde385-e375-49fd-8fc4-e7fd15b36619"},
      ].map(({id, link}) => {
        pois[id].icon_mask_base_uri = "https://irp.cdn-website.com/57267e60/dms3rep/multi/Time-capsule-messages"
        pois[id].icon_background_color = "#0424BF"
        pois[id].name = "CAPSULE"
        pois[id].url = link
      })
    }

    // remove all markers from the map before creating new ones
    cesiumViewer.entities.removeAll();
    // create markers according to the POIs placed on the map
    await createMarkers(pois, coordinates);
  } catch (error) {
    console.error(error);
  }
};

// A reference to the abort controller used to cancel the zoom reset button click event
let zoomResetController;

/**
 * Updates the zoom reset control button with the given coordinates.
 */
function updateZoomControl(coords) {
  const zoomResetButton = document.querySelector(".zoom-reset-button");

  if (!zoomResetButton) {
    return;
  }

  // cancel the previous zoom reset button click event
  if (zoomResetController) {
    zoomResetController.abort();
  }

  // create a new abort controller for the zoom reset button click event
  zoomResetController = new AbortController();

  // add a click event listener to the zoom reset button
  zoomResetButton.addEventListener(
    "click",
    () => {
      zoomResetCallback(coords);
    },
    { signal: zoomResetController.signal }
  );
}
