export interface UserAuth {
  address?: string;
  email?: string;
  isEmailVerified: boolean;
  walletConnected: boolean;
  profileCompleted: boolean;
  termsAccepted: boolean;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username?: string;
  acceptTerms: boolean;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ProfileFormData {
  username: string;
  email: string;
  bio?: string;
  avatar?: FileList;
  notifications: {
    email: boolean;
    browser: boolean;
    donations: boolean;
    updates: boolean;
  };
}