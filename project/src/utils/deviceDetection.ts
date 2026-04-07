export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;
};

export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return true;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobileDevice();
};
