import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    theDetail: {
      name: string,
      age: number;
    };
  }
}