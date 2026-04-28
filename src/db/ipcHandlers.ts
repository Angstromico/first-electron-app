import { type IpcMain, ipcMain } from "electron";
import {type AppDatabaseInstance} from "./database";

export default function setUpIpcHandlers(db: AppDatabaseInstance) {
 ipcMain.handle('task:add', (_, title: string) => {
    return db.addTask(title);
  });

  ipcMain.handle('task:getAll', () => {
    return db.getAllTasks();
  });

  ipcMain.handle('task:delete', (_, id: number) => {
    return db.deleteTask(id);
  });

  ipcMain.handle('task:markCompleted', (_, id: number, completed: boolean) => {
    return db.markCompleted(id, completed);
  });
}