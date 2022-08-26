export enum EEmitterEventTypes {
  removeById = 'remove-by-id',
  actionMenu = 'action-menu',
  globalAction = 'global-action',
  globalNotificationsAction = 'global-notifications-action',
}

export type TEmitterEventTypes = {
  [EEmitterEventTypes.removeById]: string;
  [EEmitterEventTypes.actionMenu]: string;
  [EEmitterEventTypes.globalAction]: string;
  [EEmitterEventTypes.globalNotificationsAction ]: string;
};

export type TNotificationEvent = {
  eventType: string;
  type: string;
  text: string;
};
