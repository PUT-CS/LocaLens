import { BSON, ObjectSchema, Realm } from "realm";

// Define your object model
export default class Profile extends Realm.Object<Profile> {
  _id!: BSON.ObjectId;
  user!: string;
  long!: number;
  lat!: number;
  imageUrl!: number;
  description!: number;

  static schema: ObjectSchema = {
    name: "Pin",
    properties: {
      _id: "objectId",
      user: "string",
      long: "number",
      lat: "number",
      imageUrl: "number",
      description: "number",
    },
    primaryKey: "_id",
  };
}
