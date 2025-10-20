import type { MockResource } from ".";

export interface Contact extends MockResource{
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}
