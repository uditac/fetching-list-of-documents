import jsonfile from "jsonfile";
import { Image } from "@daos/ImageDao";
import { Document } from "@daos/DocumentDao";

interface MockDb {
  images: Image[];
  documents: Document[];
}

export class MockDaoMock {
  private readonly dbFilePath = "src/daos/MockDb/MockDb.json";

  protected openDb(): Promise<MockDb> {
    return jsonfile.readFile(this.dbFilePath);
  }

  protected saveDb(db: any): Promise<any> {
    return jsonfile.writeFile(this.dbFilePath, db);
  }
}
