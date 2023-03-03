import admin from 'firebase-admin'; 
import { getApps } from 'firebase-admin/app';

const serviveAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if(!getApps().length){
    admin.initializeApp({
        credential: admin.credential.cert(serviveAccount),
    });
}

const adminDb = admin.firestore()

export {adminDb} //Now we can do anything with admin without any permissions