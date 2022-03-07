export const copyToClipboard = (code: string, cb?: () => void) => {
  navigator.clipboard.writeText(code);
  if (cb) {
    cb();
  }
};
