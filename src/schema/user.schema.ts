import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }).min(3, 'Name must be at least 3 characters').max(255, 'Name must be less than 255 characters'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password must be at least 6 characters').max(255, 'Password must be less than 255 characters'),
    passwordConfirmation: string({
      required_error: 'Password must match',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Email must be valid'),
  }).refine((data) => data.password === data.passwordConfirmation, { 
    message: 'Password must match',
    path: ['passwordConfirmation'],
  }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>;
