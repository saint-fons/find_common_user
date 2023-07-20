export interface UserData {
  email: string;
  number: string;
}
export interface ErrorsInterface {
  message: string;
  messageType: 'error' | 'warning' | 'info';
}

export interface ErrorItemInterface {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface ErrorResponseInterface {
  errors: ErrorItemInterface[];
}

export interface ServerResponse {
  email: string;
  number: string;
}