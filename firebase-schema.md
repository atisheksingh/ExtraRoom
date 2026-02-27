Firebase schema (Firestore)

Collections:

- users (document id = uid)
  - uid: string
  - email: string | null
  - displayName: string | null
  - photoURL: string | null
  - createdAt: timestamp
  - updatedAt: timestamp (optional)

- items (auto-id documents)
  - ownerId: string (uid of user)
  - name: string
  - category: string
  - value: number
  - imageUrl: string
  - status: string ("in-vault" | "out-for-delivery" | "with-user")
  - hubType: string ("micro" | "mega")
  - dateAdded: ISO string
  - createdAt: timestamp
  - updatedAt: timestamp (optional)

Security rules (suggestion): only authenticated users may read/write their own items/users doc.

Example rules (Firestore rules):

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /items/{itemId} {
      allow create: if request.auth != null && request.resource.data.ownerId == request.auth.uid;
      allow read, update, delete: if request.auth != null && resource.data.ownerId == request.auth.uid;
    }
  }
}
