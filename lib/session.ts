export function aliasSet(alias: string) {
  sessionStorage.setItem("alias", alias);
}
export function roomIdSet(roomId: string) {
  sessionStorage.setItem("roomId", roomId);
}
export function aliasGet() {
  const alias = sessionStorage.getItem("alias");
  return alias;
}
export function roomIdGet() {
  const roomId = sessionStorage.getItem("roomId");
  return roomId;
}
export function isHostSet(isHost: string) {
  sessionStorage.setItem("isHost", isHost);
}
export function isHostGet() {
  const isHost = sessionStorage.getItem("isHost");
  return isHost;
}
