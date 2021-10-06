import * as dotenv from "dotenv";
dotenv.config();

dotenv.config({ path: "../../.env" });

export default {
  client: process.env.CLIENT,
  port: process.env.PORT,

  user_table: process.env.USERTABLE,

  content_table: process.env.CONTENTTABLE,
  content_meta_table: process.env.CONTENTMETATABLE,

  comment_table: process.env.COMMENTTABLE,
};
