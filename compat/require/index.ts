function require(id: string): void {
  console.log('require', id);
  return;
}

require.has = function (id: string): boolean {
  console.log('require.has', id);
  return false;
};

export default require;
