import React, { useEffect } from "react";
import { performFlyTo, initializeCesiumViewer } from "./util/cesium.js";
import { getNearbyPois } from "./util/places.js";
import createMarkers from "./util/create-markers.js";
import { loadConfig } from './util/config';

export const config = await loadConfig("../config.json");

const {
  location: { coordinates },
  poi: poiConfig,
  camera: cameraConfig,
} = config;

async function main() {

  try {
    await initializeCesiumViewer(coordinates, cameraConfig);

    if (coordinates.lat && coordinates.lng) {
      console.log("Inside main.js ")
      // move the camera to face the main location's coordinates
      await performFlyTo(coordinates);
      // based on the given main location, fetch the surrounding POIs of the selected categories
      const pois = await getNearbyPois(poiConfig, coordinates);
      // create markers according to the POIs placed on the map
      await createMarkers(pois, coordinates);
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Google3DTiles(props) {
  useEffect(() => main(), [])

  return (
    <div id="cesium-container">
      <div className="custom-overlay overlay-is-hidden">
        <div className="zoom-control">
          <button
            className="zoom-control-button zoom-in-button"
            aria-label="Zoom in"
          >
            <img src="assets/icons/zoom-control-plus-icon.svg" alt="" />
          </button>
          <button
            className="zoom-control-button zoom-reset-button"
            aria-label="Reset zoom"
          >
            <img src="assets/icons/zoom-control-reset-icon.svg" alt="" />
          </button>
          <button
            className="zoom-control-button zoom-out-button"
            aria-label="Zoom out"
          >
            <img src="assets/icons/zoom-control-minus-icon.svg" alt="" />
          </button>
        </div>
        <div className="auto-orbit-control">
          <label className="switch" htmlFor="toggle-switch">
            <div className="input-wrapper">
              <input type="checkbox" id="toggle-switch" />
              <span className="slider"></span>
            </div>
          </label>
          <p>Auto Orbit</p>
        </div>
      </div>
      <div className="cesium-attribution-container">
        rendered with
        <a className="cesium-logo__link" href="https://cesium.com/" target="_blank">
          <img
            className="cesium-logo__image"
            src="assets/cesium-js.png"
            alt="CesiumJS Logo"
          />
        </a>
      </div>
    </div>
  );
}
