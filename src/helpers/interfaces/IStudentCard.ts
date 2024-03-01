import { StudentDetails } from '@/types/coach/Students';

export interface IStudentCardUser extends StudentDetails {
    avatar?: string;
    name?: string;
    objective?: string;
    username?: string;
    isVerified?: boolean;
}
