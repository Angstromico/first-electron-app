import { app } from 'electron';
import path from 'node:path';
import Database, { type  Database as DatabaseType } from 'better-sqlite3';

class AppDatabase {
  private db: DatabaseType;

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'todo.sqlite');
    
    this.db = new Database(dbPath);
    
    this.db.pragma('journal_mode = WAL');
    this.setUpDataBase();
  }

  private setUpDataBase(): void {
    this.db.exec(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER DEFAULT 0
    )`);
  }
}

export type AppDatabaseInstance = AppDatabase
export default AppDatabase;