import {
  AuthError,
  AuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from '@/utils/firebase';

const authSignIn = async (
	provider: AuthProvider,
	callback?: () => void | null,
	errorCallback?: (error: AuthError) => void | null
) => {
	try {
		await signInWithPopup(auth, provider);

		if (callback) {
			callback();
		}
	} catch (error: any) {
		if (errorCallback) {
			errorCallback(error);
		}
	}
};

export const googleSignin = (
	callback?: () => void | null,
	errorCallback?: (error: AuthError) => void | null
) => {
	return () => {
		const provider = new GoogleAuthProvider();
		provider.addScope('email');
		authSignIn(provider, callback, errorCallback);
	};
};

export const facebookSignin = (
	callback?: () => void | null,
	errorCallback?: (error: AuthError) => void | null
) => {
	return () => {
		const provider = new FacebookAuthProvider();
		provider.addScope('email, user_birthday');
		authSignIn(provider, callback, errorCallback);
	};
};
