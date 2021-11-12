interface Product {
  name: string;
  description: string;
  images: ProductImage[];
  madeIn?: string;
  stock: number;
  points: number;
  offerPoints?: number;
}

interface ProductImage {
  url: string;
}

interface Voucher {
  name: string;
  description: string;
  images: ProductImage[];
  stock: number;
  points: number;
  savingPercentage?: number;
}

interface Message {
  msg: string;
  category: string;
}

interface User {
  id?: string;
  name?: string;
  surName?: string;
  dni?: string;
  email?: string;
  password?: string;
  address?: string;
  city?: string;
  country?: string;
  phoneNumber?: string;
  image?: string;
  points: number;
}

interface Address {
  street: string;
  number: string;
  floor?: string | null;
  city: string;
  country: string;
}

interface Account {
  email: string;
  password: string;
}

interface DailyQuestion {
  question: string;
  answers: AnswerDailyQuestion[];
  points: number;
}

interface AnswerDailyQuestion {
  id: number;
  answer: string;
  isCorrect: boolean;
}

interface Email {
  subject: string;
  to: string;
  text: string;
}