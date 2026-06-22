# pos-tablet-demo

## Basic Auth su Vercel

Il progetto usa `middleware.js` per proteggere tutte le pagine con HTTP Basic Auth.
Il file `package.json` serve solo a installare l'helper Vercel usato dal middleware.

Configura queste Environment Variables su Vercel:

- `BASIC_AUTH_USER`
- `BASIC_AUTH_PASSWORD`

Dopo averle aggiunte, fai un nuovo deploy per applicare la protezione.
