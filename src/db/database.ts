import { app } from 'electron';
import path from 'node:path';
import Database, { type  Database as DatabaseType } from 'better-sqlite3';

export interface ITask {
  id: number;
  title: string;
  completed: boolean;
}

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

  addTask(title: string): { id: number; title: string; completed: boolean } {
    const stmt = this.db.prepare('INSERT INTO tasks (title) VALUES (?)');
    stmt.run(title);

    const row = this.db
      .prepare('SELECT last_insert_rowid() as id')
      .get() as { id: number };

    return {
      id: row.id,
      title,
      completed: true
    }
  }

  getAllTasks() {
    const stmt = this.db.prepare('SELECT * FROM tasks ORDER BY id DESC');
    const allTask = stmt.all() as ITask[];

    return allTask;
  }

  deleteTask(id: number): boolean {
    const stmt = this.db.prepare('DELETE FROM tasks WHERE id = ?');
    const info = stmt.run(id);

    return info.changes > 0;
  }

  markCompleted(id: number, completed: boolean): boolean {
    const stmt = this.db.prepare('UPDATE tasks SET completed = ? WHERE id = ?');
    const info = stmt.run(completed ? 1 : 0, id);

    return info.changes > 0;
  }

  close() {
    this.db.close();
  }
}

export type AppDatabaseInstance = AppDatabase
export default AppDatabase;