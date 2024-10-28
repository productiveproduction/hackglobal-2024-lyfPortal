import React from 'react'

export default function PlaceSidebar() {
  return(
    <aside id="sidebar">
        <div className="sidebar-content-wrapper">
          <div className="place-image-container">
            <button className="sidebar-close-button" aria-label="Close Sidebar">
              <img src="assets/icons/sidebar/close-icon.svg" alt="Close" />
            </button>
            <img className="place-image" />
          </div>
          <header className="intro section-container">
            <div className="title-container">
              <h2 className="place-name with-loading-skeleton"></h2>
            </div>
            <div className="rating-overview">
              <div className="rating-overview-number with-loading-skeleton"></div>
              <div className="rating-overview-stars"></div>
              <div className="rating-overview-total"></div>
            </div>
            <div className="place-type with-loading-skeleton"></div>
          </header>
          <div className="place-overview section-container">
            <div className="address">
              <img
                src="assets/icons/sidebar/address-icon.svg"
                alt="address-icon"
              />
              <p className="with-loading-skeleton"></p>
            </div>
            <div className="website">
              <img
                src="assets/icons/sidebar/website-icon.svg"
                alt="website-icon"
              />
              <a className="with-loading-skeleton"></a>
            </div>
            <div className="phone">
              <img src="assets/icons/sidebar/phone-icon.svg" alt="phone-icon" />
              <p className="with-loading-skeleton"></p>
            </div>
            <div className="opening-hours">
              <img
                src="assets/icons/sidebar/opening-hours-icon.svg"
                alt="opening-hours-icon"
              />
              <details>
                <summary
                  className="opening-hours-summary with-loading-skeleton"
                ></summary>
                <div className="opening-hours-details" />
              </details>
            </div>
          </div>
          <div className="reviews-section section-container">
            <h3>Reviews by Google Users</h3>
            <span className="sorting">Most Relevant</span>
            <div className="reviews">
              <div className="reviews-scroll-container"></div>
            </div>
          </div>
        </div>
      </aside>
   )
  }
