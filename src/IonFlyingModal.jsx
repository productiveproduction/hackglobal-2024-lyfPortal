import React from "react";
import { CupertinoPane } from "cupertino-pane";
import { useEffect } from "react";
import { createConfigCenter } from "./demo/config-panel.js";

const backdropOpacity = 0.4;

export default function IonFlyingModal ({ innerRef, panelKey, children }) {

  useEffect(() => {
    innerRef.current = new CupertinoPane(`.${panelKey}`, {
      modal: {
        transition: 'zoom',
        flying: true
      },
      backdrop: true,
      backdropOpacity: backdropOpacity,
      parentElement: "body",
    buttonDestroy: false,
      events: {
        onDidPresent: () => createConfigCenter(),
        onBackdropTap: () => innerRef.current?.destroy({animate: true}),
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={panelKey}>{children}</div>;
};
