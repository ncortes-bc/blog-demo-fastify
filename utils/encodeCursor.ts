import { btoa } from 'buffer';

module.exports = function encodeCursor(cursor: any) {
  try {
    cursor = btoa(JSON.stringify(cursor));
    return cursor;
  } catch {
    return null;
  }
};
