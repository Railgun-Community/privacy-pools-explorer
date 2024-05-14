export const mobileBreakpoint = 440;
export const tabletBreakpoint = 1090;

interface WindowSize {
  width: number;
  height: number;
}

export const isMobile = (windowSize: WindowSize) =>
  windowSize.width <= mobileBreakpoint;

export const isTablet = (windowSize: WindowSize) =>
  windowSize.width <= tabletBreakpoint && windowSize.width > mobileBreakpoint;

export const isSmallDevice = (windowSize: WindowSize) =>
  isMobile(windowSize) || isTablet(windowSize);
