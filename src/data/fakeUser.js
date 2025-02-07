const now = new Date();
const oneHourLater = new Date(now.getTime() + 3600 * 1000);

export const fakeUser = {
    "user": {
        "id": "fake-id-1234",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "fakeuser@example.com",
        "email_confirmed_at": now.toISOString(),
        "phone": "",
        "confirmed_at": now.toISOString(),
        "last_sign_in_at": now.toISOString(),
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {
            "avatar": "https://picsum.photos/200",
            "email_verified": true,
            "fullName": "Read only User"
        },
        "identities": [
            {
                "identity_id": "fake-identity-id-1234",
                "id": "fake-id-1234",
                "user_id": "fake-id-1234",
                "identity_data": {
                    "email": "fakeuser@example.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "fake-id-1234"
                },
                "provider": "email",
                "last_sign_in_at": "2025-02-07T13:25:49.579876Z",
                "created_at": "2025-02-07T13:25:49.579938Z",
                "updated_at": "2025-02-07T13:25:49.579938Z",
                "email": "fakeuser@example.com"
            }
        ],
        "created_at": now.toISOString(),
        "updated_at": now.toISOString(),
        "is_anonymous": false
    },
    "session": {
        "access_token": "fake-access-token-1234",
        "token_type": "bearer",
        "expires_in": 3600,
        "expires_at": Math.floor(oneHourLater.getTime() / 1000),
        "refresh_token": "fake-refresh-token-1234",
        "user": {
            "id": "fake-id-1234",
            "aud": "authenticated",
            "role": "authenticated",
            "email": "fakeuser@example.com",
            "email_confirmed_at": now.toISOString(),
            "phone": "",
            "confirmed_at": now.toISOString(),
            "last_sign_in_at": now.toISOString(),
            "app_metadata": {
                "provider": "email",
                "providers": [
                    "email"
                ]
            },
            "user_metadata": {
                "avatar": "https://picsum.photos/200",
                "email_verified": true,
                "fullName": "Read only User"
            },
            "identities": [
                {
                    "identity_id": "fake-identity-id-1234",
                    "id": "fake-id-1234",
                    "user_id": "fake-id-1234",
                    "identity_data": {
                        "email": "fakeuser@example.com",
                        "email_verified": false,
                        "phone_verified": false,
                        "sub": "fake-id-1234"
                    },
                    "provider": "email",
                    "last_sign_in_at": "2025-02-07T13:25:49.579876Z",
                    "created_at": "2025-02-07T13:25:49.579938Z",
                    "updated_at": "2025-02-07T13:25:49.579938Z",
                    "email": "fakeuser@example.com"
                }
            ],
            "created_at": now.toISOString(),
            "updated_at": now.toISOString(),
            "is_anonymous": false
        }
    }
}
export const fakeLogin = {
    'username' : 'test@test.com',
    'password' : 'foieur0934839'
}