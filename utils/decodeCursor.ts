import { atob } from 'buffer';

module.exports = function decodeCursor(cursor: any) {
  try {
    cursor = JSON.parse(atob(cursor));
    cursor.timestamp = new Date(cursor.timestamp);
    return cursor;
  } catch {
    return null;
  }
};
