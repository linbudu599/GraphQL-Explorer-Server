import { createClient } from "../genql-generated";

const client = createClient({
  url: "http://localhost:4000/graphql",
  headers: () => ({}),
});

(async () => {
  const recipes = await client.query({
    QueryRecipeUnions: {
      __typename: true,
      on_Cook: {
        name: true,
        yearsOfExperience: true,
        experience: {
          company: {
            description: true,
            name: true,
            registerDate: true,
            scale: true,
          },
          isFired: true,
          workYears: true,
        },
      },
    },
  });
  console.log(recipes);
})();
