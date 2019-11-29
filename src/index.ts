import React from "react";
import { FSRenderer } from "./fs-renderer";
import { Container } from "./fs-renderer-types";
import ReactReconciler from "react-reconciler";
import { rmdirSync } from "fs";

type RootContainer = {
  fiberRoot?: ReactReconciler.FiberRoot;
  container: Container;
};

const rootContainerMap = new Map<string, RootContainer>();

export const ReactFS = {
  render(element: React.ReactNode, rootPath: string) {
    let rootContainer = rootContainerMap.get(rootPath);
    if (!rootContainer) {
      rootContainer = {
        container: {
          rootPath
        }
      };
      rootContainerMap.set(rootPath, rootContainer);
    }

    // First, we remove the root to clean up.
    // TODO: support hydration
    rmdirSync(rootPath, { recursive: true });

    rootContainer.fiberRoot = FSRenderer.createContainer(
      rootContainer.container,
      false,
      false
    );
    FSRenderer.updateContainer(
      element,
      rootContainer.fiberRoot,
      null,
      () => {}
    );
  }
};
