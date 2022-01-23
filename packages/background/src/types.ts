export interface MessageTarget {
  get: () => void;
  set: () => void;
  trigger: () => void;
  create: ({ title, url }: { title: string; url: string }) => void;
  close: (tabID: number | undefined) => void;
}
