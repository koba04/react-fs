export type Type = string;
export type Props = {
  [key: string]: any;
};

export type TextInstance = {
  text: string;
  parent?: Instance;
  rootContainerInstance: Container;
};

export type Instance = {
  type: Type;
  props: Props;
  parent?: Instance;
  rootContainerInstance: Container;
};

export type PublicInstance =
  | Omit<Instance, "rootContainerInstance">
  | Omit<TextInstance, "rootContainerInstance">;

export type Container = {
  rootPath: string;
};

export type HostContext = {};

export type HydratableInstance = object;
export type UpdatePayload = object;
export type ChildSet = object;
export type TimeoutHandle = object;
export type NoTimeout = object;
export type OpaqueHandle = any;
