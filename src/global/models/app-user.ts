export class AppUser {
    uid: string
    displayName: string
    photoURL: string
    email: string
    emailVerified: boolean
    phoneNumber: string
    isAnonymous: boolean
    providerData: [{ 
        uid: string
        displayName: string
        photoURL: string
        email: string
        phoneNumber: string
        providerId: string
    }]
    apiKey: string
    appName: string
    authDomain: string
    stsTokenManager: {
        apiKey: string
        refreshToken: string
        accessToken: string
        expirationTime: number
    }
    redirectEventId: string
    lastLoginAt: string
    createdAt: string
}