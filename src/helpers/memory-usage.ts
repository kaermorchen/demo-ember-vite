import Helper from "@ember/component/helper";

export default class MemoryUsage extends Helper {
  interval: any;
  heapSize: number | undefined;

  constructor() {
    super();

    // @ts-ignore
    if (!performance.memory) {
      return;
    }

    this.interval = setInterval(this.measureMemory.bind(this), 1000);
  }

  async measureMemory() {
    // @ts-ignore
    const dirtyValue = performance.memory.usedJSHeapSize / 1048576;

    this.heapSize = Math.round(dirtyValue * 100) / 100;

    this.recompute();
  }

  compute() {
    return this.heapSize ? `Memory used ${this.heapSize} MB` : null;
  }

  willDestroy() {
    super.willDestroy();

    clearInterval(this.interval);
  }
}
