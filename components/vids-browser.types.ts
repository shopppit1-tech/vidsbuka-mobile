export interface VidsBrowserHandle {
  login(): void;
  openVids(): void;
  logout(): void;
}

export interface VidsBrowserProps {
  onStatusChange: (status: string) => void;
}
