import {
  Instance,
  HostContext,
  Props,
  Container,
  TextInstance,
  Type,
  UpdatePayload
} from "./fs-renderer-types";
import path from "path";
import { writeFileSync, existsSync, mkdirSync, renameSync } from "fs";

const HOST_CONTEXT: HostContext = {};

export const getPublicInstance = (instance: Instance) => {
  const { rootContainerInstance, ...rest } = instance;
  return rest;
};
export const getRootHostContext = (): HostContext => HOST_CONTEXT;
export const getChildHostContext = () => HOST_CONTEXT;

export const prepareForCommit = () => {};
export const resetAfterCommit = () => {};
export const createInstance = (
  type: string,
  props: Props,
  rootContainerInstance: Container
): Instance => ({ type, props, rootContainerInstance });
export const createTextInstance = (
  text: string,
  rootContainerInstance: Container
): TextInstance => ({ text, rootContainerInstance });
export const appendInitialChild = (
  parentInstance: Instance,
  child: Instance | TextInstance
) => {
  child.parent = parentInstance;
};
export const finalizeInitialChildren = () => true;
export const prepareUpdate = () => ({});
export const shouldSetTextContent = () => false;
export const shouldDeprioritizeSubtree = () => false;

export const appendChildToContainer = () => {};

const buildParentPath = (instance: Instance | TextInstance) => {
  const names = [];
  let current = instance.parent;
  while (current) {
    names.push(current.props.name);
    current = current.parent;
  }
  return path.join(instance.rootContainerInstance.rootPath, ...names.reverse());
};

export const commitMount = (
  instance: Instance,
  type: Type,
  newProps: Props
) => {
  const parentPath = buildParentPath(instance);
  const targetPath = path.join(parentPath, newProps.name);

  if (!existsSync(parentPath)) {
    mkdirSync(parentPath, { recursive: true });
  }

  if (type === "file") {
    writeFileSync(targetPath, newProps.children);
  } else if (type === "directory" && !existsSync(targetPath)) {
    mkdirSync(targetPath);
  }
};

export const commitUpdate = (
  instance: Instance,
  updatePayload: UpdatePayload,
  type: Type,
  oldProps: Props,
  newProps: Props
) => {
  if (oldProps.name !== newProps.name) {
    instance.props = newProps;
    renameSync(
      path.join(buildParentPath(instance), oldProps.name),
      path.join(buildParentPath(instance), newProps.name)
    );
  }
};

export const commitTextUpdate = (
  textInstance: TextInstance,
  oldText: string,
  newText: string
) => {
  if (oldText !== newText) {
    textInstance.text = newText;
    writeFileSync(buildParentPath(textInstance), newText);
  }
};
export const removeChild = () => {};
export const appendChild = (
  parentInstance: Instance,
  child: Instance | TextInstance
) => {
  child.parent = parentInstance;
};

export const scheduleDeferredCallback = () => {};
export const cancelDeferredCallback = () => {};
export const setTimeout = global.setTimeout;
export const clearTimeout = global.clearTimeout;
export const noTimeout = {};
export const now = () => Date.now();

export const isPrimaryRenderer = true;
export const supportsMutation = true;
export const supportsPersistence = false;
export const supportsHydration = false;
