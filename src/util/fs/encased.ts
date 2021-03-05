import fs from 'fs/promises';

import { encase } from '../fn';

export const stat = encase(fs.stat);
export const unlink = encase(fs.unlink);
export const readFile = encase(fs.readFile);
