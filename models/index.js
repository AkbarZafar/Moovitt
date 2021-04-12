// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Box } = initSchema(schema);

export {
  Box
};