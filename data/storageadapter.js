// StorageAdapter.js
export class StorageAdapter {
    save(data) {
      throw new Error("save() method not implemented");
    }
  
    load(query) {
      throw new Error("load() method not implemented");
    }
  }
  
  // LocalStorageAdapter.js
  export class LocalStorageAdapter extends StorageAdapter {
    save(data) {
      const id = Date.now();
      localStorage.setItem(id, JSON.stringify(data));
      return id;
    }
  
    load(id) {
      return JSON.parse(localStorage.getItem(id));
    }
  }
  
  /*// Example: MySQLAdapter.js
  export class MySQLAdapter extends StorageAdapter {
    constructor(dbConnection) {
      super();
      this.db = dbConnection;
    }
  
    async save(data) {
      const query = "INSERT INTO notes (inputText, explanation) VALUES (?, ?)";
      const result = await this.db.execute(query, [data.inputText, data.explanation]);
      return result.insertId;
    }
  
    async load(id) {
      const query = "SELECT * FROM notes WHERE id = ?";
      const [rows] = await this.db.execute(query, [id]);
      return rows[0];
    }
  }*/
  