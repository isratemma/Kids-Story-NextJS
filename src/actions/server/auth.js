'use server';

import bcrypt from 'bcryptjs';
import { dbConnect, collection } from '@/lib/dbConnect';

export async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    return { error: 'All fields are required.' };
  }

  const db = await dbConnect();
  const users = db.collection(collection.USERS);

  const existing = await users.findOne({ email: email.toLowerCase() });
  if (existing) {
    return { error: 'An account with this email already exists.' };
  }

  const hashed = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email: email.toLowerCase(),
    password: hashed,
    createdAt: new Date(),
  });

  return { success: true };
}
