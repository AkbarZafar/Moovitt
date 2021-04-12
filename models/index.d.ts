import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Box {
  readonly id: string;
  readonly name: string;
  readonly location: string;
  readonly items?: string[];
  constructor(init: ModelInit<Box>);
  static copyOf(source: Box, mutator: (draft: MutableModel<Box>) => MutableModel<Box> | void): Box;
}