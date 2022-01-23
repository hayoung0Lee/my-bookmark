import { BookmarkManager } from "./src/BookmarkManager";
import { MessageHandler } from "./src/MessageHandler";

const bookmarkManager = new BookmarkManager();
const messageHandler = new MessageHandler(bookmarkManager);
