import mitt, { Emitter } from 'mitt';
import { TEmitterEventTypes } from './types';

const emitter: Emitter<TEmitterEventTypes> = mitt();
// export { emitter, Emitter, TEmitterEventTypes };
export default emitter;
