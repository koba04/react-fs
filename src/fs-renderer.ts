import Reconciler from "react-reconciler";
import * as HostConfig from "./fs-renderer-host-config";
import {
  Type,
  Props,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout,
  Container
} from "./fs-renderer-types";

// eslint-disable-next-line new-cap
export const FSRenderer = Reconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>(HostConfig);
