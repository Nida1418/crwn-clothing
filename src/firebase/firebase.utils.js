import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCXrtMBQWKr1c4mR7UbwWRSowbW5tMi5cQ',
	authDomain: 'crwn-db-4696d.firebaseapp.com',
	projectId: 'crwn-db-4696d',
	storageBucket: 'crwn-db-4696d.appspot.com',
	messagingSenderId: '382845348310',
	appId: '1:382845348310:web:8e9355383a490c83551c77',
	measurementId: 'G-HT91VQZ82F',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	console.log(snapShot);

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
