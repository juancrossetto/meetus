export interface AuthContextState {
  token: string | null;
  authenticated: boolean | null;
  user: User | null;
  message: Message | null;
  loading: boolean;
  registerUser: (data: User) => void;
  userAuthenticated: () => void;
  login: (data: User) => void;
  closeSession: () => void;
  changePassword: (data: any) => void;
  updatePoints: (points: number) => void;
}
