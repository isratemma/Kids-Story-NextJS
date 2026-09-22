'use server';

import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { dbConnect, collection } from '@/lib/dbConnect';
import { AuthError } from 'next-auth';

// ─── Register ────────────────────────────────────────────────────────────────

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

  // Auto-login after successful registration
  await signIn('credentials', {
    email: email.toLowerCase(),
    password,
    redirect: false,
  });

  return { success: true };
}

// ─── Login ───────────────────────────────────────────────────────────────────

export async function loginUser({ email, password }) {
  if (!email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  try {
    await signIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: 'Invalid email or password.' };
    }
    throw err;
  }
}
