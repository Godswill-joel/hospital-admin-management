// import mongoose, { Document, Types } from "mongoose";

// export enum UserRole {
//     ADMIN = "ADMIN",
//     DOCTOR = "DOCTOR",
//     RECEPTIONIST = "RECEPTIONIST",
//     PATIENT = "PATIENT",
// }

// export interface IUser extends Document {
//     email: string;
//     password: string;
//     role: UserRole;
//     hospitalId?: Types.ObjectId;
//     isActive: boolean;
//     createdAt: Date;
//     updatedAt: Date;
// }
// export interface IDoctor extends Document {
//     userId: Types.ObjectId;
//     hospitalId: Types.ObjectId;

//     name: string;
//     specialization: string;

//     imageUrl?: string;
//     imagePublicId?: string;

//     experience?: string;
//     qualifications?: string;
//     location?: string;
//     about?: string;

//     fee: number;

//     availability: "Available" | "Unavailable";

//     schedule: Map<string, string[]>;

//     success?: string;
//     patients?: string;

//     rating: number;

//     createdAt: Date;
//     updatedAt: Date;
// }

// UserSchema.index({ email: 1 });

// export default mongoose.model < IUser > ("User", UserSchema);