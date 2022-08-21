export enum EEmitterEventTypes {
  removeById = 'remove-by-id',
  actionMenu = 'action-menu',
  globalAction = 'global-action',
}

export type TEmitterEventTypes = {
  [EEmitterEventTypes.removeById]: string;
  [EEmitterEventTypes.actionMenu]: string;
  [EEmitterEventTypes.globalAction]: string;
};
