# Irja - Web App

## Deploy
Old vercel.json file below. It also deployed AWS Lambda rendering functions, although it wasn't used.
```json
{
  "buildCommand": "node deploy.mjs && next build"
}
```

## Convex
We use convex for rapid protoyping. Since our data is very relational, relations can be modelled as follows: 
https://stack.convex.dev/relationship-structures-let-s-talk-about-schemas