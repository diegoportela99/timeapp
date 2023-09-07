// export const config = {
//     firebaseConfig: {
//         apiKey: "AIzaSyDh7BsQz-IRqEWuNuD4WEOoynHyP4gwx0o",
//         authDomain: "time-app2.firebaseapp.com",
//         projectId: "time-app2",
//         storageBucket: "time-app2.appspot.com",
//         messagingSenderId: "982446485650",
//         appId: "1:982446485650:web:9c4d5cba032d79c562364b",
//         databaseURL: "https://time-app2-default-rtdb.asia-southeast1.firebasedatabase.app/"
//     }
// }

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyDh7BsQz-IRqEWuNuD4WEOoynHyP4gwx0o",
//     authDomain: "time-app2.firebaseapp.com",
//     projectId: "time-app2",
//     storageBucket: "time-app2.appspot.com",
//     messagingSenderId: "982446485650",
//     appId: "1:982446485650:web:9c4d5cba032d79c562364b",
//     databaseURL: "https://time-app2-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }


const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL
}


const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { get, getDatabase, onValue, ref, set } from 'firebase/database'


const db = getDatabase()


export function writeUserData(uid: string, name: string, email: string, imageURL: string) {
    const reference = ref(db, 'users/' + uid)

    const taskAmountCheck = ref(db, 'users/' + uid + '/taskAmount')
    onValue(taskAmountCheck, (snapshot) => {
        const data = snapshot.val()
        if (data == null) {
            set(reference, {
                name: name,
                email: email,
                image: imageURL,
                taskAmount: 0,
            })
        }
    })
}


export function getNameFromDatabase(uid: any) {
    const reference = ref(db, 'users/' + uid + '/name')
    let data

    if (reference !== null) {
        onValue(reference, (snapshot) => {
            data = snapshot.val()
            return (data)
        })
    } else {
        console.log("no data")
        return("ekirgh")
    }
}


export function getEmailFromDatabase(uid: any) {
    const reference = ref(db, 'users/' + uid + '/email')
    let data

    onValue(reference, (snapshot) => {
        data = snapshot.val()
    })

    return (data)
}


export function getImageFromDatabase(uid: any):string | undefined {
    const reference = ref(db, 'users/' + uid + '/image')
    let data

    onValue(reference, (snapshot) => {
        data = snapshot.val()
    })

    return (data)
}

export function getTaskAmountFromDatabase(uid: any): string {
    const reference = ref(db, 'users/' + uid + '/taskAmount')
    var data
    onValue(reference, (snapshot) => {
        data = snapshot.val()
        console.log("should be 0      ", data)
    })

    return (data!)

}



// ????? idk what this is testing anymore

export async function test() {
    const reference = ref(db, 'users/' + sessionStorage.getItem("uid") + '/taskAmount')

    const snapshot = await get(reference)

    return(snapshot.val())

}
