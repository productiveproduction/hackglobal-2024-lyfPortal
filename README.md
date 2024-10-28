# GeoMemory: Interactive 3D Memory Capsules Platform

### Description

- GeoMemory is a platform designed to encourage commuters to "Capsule the Memories | Re-Discover the Familiar".
- It is for everyone to explore and share interactive 3D Memory Capsules. 
- These capsules can capture moments from family outings, dates, events, festivals, hangouts, providing a vivid and interactive way to document and discover experiences. The app also offers useful information for travelers navigating Singapore, including cultural and historical landmarks.
- It was built during the 24 hours hacksingapore 2024 hackathon.

### General Technology Stack

- **UI**: React + Vite
- **NERF Engine**: Luma WebGL Library
- **Photo Realistic 3D Map**: Google Maps 3D Tiles API
- **Map Renderer**: CesiumJs


### Prerequisites

- Node.js + React
- Relatively decent graphic card in development machine
- API token from Google Maps

### Setup

1. **Clone the repository**
2. **Install dependencies using Yarn:**

    ```sh
    yarn
    ```

3. **Run the application locally:**

    ```sh
    yarn dev
    ```

4. **Access the application:**

    The application will run on `http://localhost:5173/`.

Note: If you want, run `yarn run build` to deploy. But in my experience, running locally is more performant than accessing the compressed deployed version.

### Code References

- Luma WebGL Library: `https://github.com/lumalabs/luma-web-examples/tree/main`  
- Google Maps 3D Tiles: `https://github.com/googlemaps-samples/js-3d-area-explorer/blob/main/docker-compose.yaml`


### Deployed Application

View live application at `https://geomemory.vercel.app/`

