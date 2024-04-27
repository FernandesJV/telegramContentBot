import { ObjectId } from "mongodb";

export interface Content {
  url: string;
  contentType: string;
  owner: string;
  timeStamp: number;
}
