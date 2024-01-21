interface String {
  appendUniqueId(): string;
}

String.prototype.appendUniqueId = function(this: string): string {
  const value = this;
  const uniqueId = Math.random().toString(36).substring(2);
  return `${value}-${uniqueId}`;
}
