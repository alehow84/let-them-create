# Let Them Create - Events Platform Project

## *Overview*


Let Them Create is the fictitious Arts & Crafts events hosting company this events platform was built for. 
This web app is built with Nextjs, Typescript, Firebase Authentication, Firestore Database, Add Events API and Google Events API (SerpApi)

Users of the platform can:

- Sign in and out as an authenticated non-staff user
- Sign in and out as an authenticated staff user
- View and register for arts and crafts events as a non-staff user
- Add an event to a chosen calendar once registered as a non-staff user
- Create a new event as a staff user
- Responsive for desktop and mobile (still needs more work for tablets/ipads)

## *Explore the deployed site*

The project is hosted [here](https://let-them-create.vercel.app/) on Vercel.

- To login as staff, use email address staff@letthemcreate.co.uk, password Abcd1234?!
- Any new events you create as a staff member will be rendered in the events page - events created by LTC staff members are all indicated by the same thumbnail image.
- To login as an existing user, use email address frogs@hotmail.com, same password as above.
- Create your own user login! Be sure to make a note of the password you use as there is currently no feature to remind a user of a forgotten password.


## *Running the project locally*

1. Sign up for free accounts with
   - [Firebase](https://firebase.google.com/)
   - [Google Events API](https://serpapi.com/google-events-api)
  
2. Setup your Firebase project:
   
     - On the Firebase landing page, go to console and create a project
     - Go to project overview, then project settings, and make a note of the following that you will need for the .env file you will create in your local version of the project:
         1.Web Api key
         2. Project name
         3. Project ID
         4. Auth Domain
         5. Storage Bucket
         6. Messaging Sender ID
         7. App ID
     - In the Authentication tab, create a new authenticated user that you will use as your staff login. Make a note of the email & uid as this will be needed for the staff collection. Also make sure you remember the password you create!
     - In the firestore database tab, create two new collections, 1 for staff, 1 for users
     - In the staff collection, create a new document with the following fields:
          - displayName: *type string* LTC Staff member
          - documentID: *type string* Input the document ID of the document you have just created
          - email: *type string* Input the email address of the authenticated staff user you created earlier
          - events: *type array* you can leave this empty
          - uid:  *type string* Input the uid from the authenticated staff user you created earlier
     - In the firestore database tab, select the rules tab. Ensure your rules are set as follows:

  
 ```  
    service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    match /staff/{staffId} {
      allow read: if true;
    }
    match/users/{userId} {
    allow read, write: if request.auth != null;
    }
  }
}

```

3.  *Fork* this repo and then *Clone* it to your local machine

```
https://github.com/alehow84/let-them-create.git
```
  
4. Install Node.js - this project used Node v21.6.1 (please ensure you have this version or later)

5. Install dependencies

```
npm install
```

6. In the root of the project (ltc folder) create a new .env.local file with the following:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YourFirebaseWebApiKey
NEXT_PUBLIC_AUTH_DOMAIN=YouFirebaseAuthDomain
NEXT_PUBLIC_PROJECT_ID=YourFirebaseProjectId
NEXT_PUBLIC_STORAGE_BUCKET=YourFirebaseStorageBucket
NEXT_PUBLIC_MESS_SENDER_ID=YourFirebaseMessagingSenderId
NEXT_PUBLIC_APP_ID=YourFirebaseAppId
NEXT_PUBLIC_SERPAPI_KEY=YourGoogleEventsApiKey
NEXT_PUBLIC_STAFF_EMAIL=YourAuthenticatedStaffMemberEmail
NEXT_PUBLIC_STAFF_DOCREF=YourAuthenticatedStaffMemberDocumentReferenceFromStaffCollectionInFirestore

```
   
   
7. Run the project!

```
npm run dev
```
