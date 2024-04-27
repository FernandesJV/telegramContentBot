import { Collection, MongoClient, ServerApiVersion, Timestamp } from "mongodb";
import { Content } from "../models/Content";
import { botContext as BotContext } from "../interfaces/botContext";

const MONGODB_URI = process.env.MONGODB_URI;

type usertype = {
    _id: string,
    name: string,
    age: number
  }

class MongoService {
  private client: MongoClient;
  private collection: Collection<Content>;

  constructor() {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI not set in enviroment");
    }
    this.client = new MongoClient(MONGODB_URI, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    this.collection = this.client.db("discordContent").collection<Content>("content");
  }

  public recordContentFromContext(ctx: BotContext) {
    const content: Content = {
        owner: ctx.update.message.from.username ?? '',
        url: ctx.text ?? '',
        timeStamp: Date.now(),
        contentType: this.getContentTypeFromUrl(ctx.text ?? '')
    }
    this.collection.insertOne(content);
  }

  private getContentTypeFromUrl(url: string): string {
    switch(true) {
        case(url.indexOf("instagram")!==-1):
            return "instagram";
        case(url.indexOf("tiktok")!==-1):
            return "tiktok";
        case(url.indexOf("reddit")!==-1):
            return "reddit";
        case(url.indexOf("youtube")!==-1):
            return "youtube";
        default:
            return "";
    }
  }
}

export const mongoService = new MongoService();
