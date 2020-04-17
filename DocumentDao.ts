import { getRandomInt } from "@shared/functions";
import { MockDaoMock } from "./MockDb/MockDao.mock";

export interface Document {
  id: number;
  title: string;
  description: string;
  source: string;
}

export interface IDocumentsDao {
  get: (id: number) => Promise<Document | null>;
  getAll: () => Promise<Document[]>;
}

export class DocumentDao extends MockDaoMock implements IDocumentsDao {
  public async get(id: number): Promise<Document | null> {
    try {
      const db = await super.openDb();
      for (const doc of db.documents) {
        if (doc.id === id) {
          return doc;
        }
      }
      throw new Error("Document not found");
    } catch (err) {
      throw err;
    }
  }

  public async getAll(): Promise<Document[]> {
    try {
      const db = await super.openDb();
      return db.documents;
    } catch (err) {
      throw err;
    }
  }
}
