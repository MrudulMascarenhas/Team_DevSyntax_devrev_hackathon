import ticket_tagger from './functions/ticket_tagger';
import override_tagger from './functions/override_tagger';
export const functionFactory = {
  // Add your functions here
  ticket_tagger,
  override_tagger,

} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
