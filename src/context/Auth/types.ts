export interface AuthContextState {
  token: string | null;
  authenticated: boolean | null;
  user: User | null;
  message: Message | null;
  loading: boolean;
  registerUser: (data: User) => void;
  updateUser: (data: User) => any;
  userAuthenticated: () => void;
  login: (data: User) => void;
  closeSession: () => void;
  changePassword: (data: any) => void;
  updatePoints: (points: number) => void;
  updateUserPoints: () => void;
  setMessage: (msg: React.SetStateAction<Message | null>) => void;
  sendEmail: (email: Email) => void;
  getDailyQuestions: () => any;
  createDailyQuestion: (dailyQuestion: DailyQuestion) => void;
  saveTrade: (trade: Trade) => void;
  getHistoryTrades: () => any;
  getSchedule: () => any;
  updateSchedule: (schedule: Schedule) => void;
}
