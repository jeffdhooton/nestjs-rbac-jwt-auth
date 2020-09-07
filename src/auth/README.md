# Authentication Module

This module handles all authentication for the application.

## Module

## Service

The authentication service can be found in `./auth.service.ts`. This service handles user login, user registration, and user validation. This service is scoped to the AuthService only.

## Controller

There are a few routes scoped to the Authentication Module:

### Login

**Endpoint**: /auth/login

**Parameters**:

- username <string>
- password <string>

**Returns**:

Returns the user if successful along with an access_token that will be used for Bearer auth requests for all future requests.

## Strategies

There are a few strategies implemented currently:

### Local Strategy

The local strategy simple verifies users based on username and password utilizing the AuthService.

### JWT Strategy

The JWT strategy is used for all subsequent requests authorized using Bearer authentication.

## RBAC

TODO
