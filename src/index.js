import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import {
  ApolloProvider as ApolloHooksProvider,
  useQuery,
} from 'react-apollo-hooks';
import "./index.css";

const client = new ApolloClient({
  uri: 'https://graphql-pokemon.now.sh/graphql',
});

const GET_POKEMONS = gql(`
  query getPokemons {
    pokemons(first: 50) {

number
name
weight {
minimum
maximum
}
height {
minimum
maximum
}
types
attacks {
special {
name
type
damage

}
}
image
attacks {
special {
name
type
damage
}
}
}
  }
`);

function NewWay() {
  const { data, error } = useQuery(GET_POKEMONS);
  if (error) return <div>Error</div>;
  return (
    <ul>
      <h2>Pokemons</h2>
      {data && data.pokemons.map((pokemon, index) => (
        <div className="name"> 
          <div key={index}><img src={pokemon.image}></img> </div>
          <div>
            <h2>Pokemon name:</h2>
          <h3 key={index}>{pokemon.name}</h3>
          <div>
            <h2>Pokemon type:</h2>
          <h3 key={index}>{pokemon.types}</h3>
        </div>
        <div>
          <h2>Pokemon weight:</h2>
          <h3 key={index}>{pokemon.weight.minimum}</h3>
        </div>
        <div>
          
          <h3 key={index}>{pokemon.weight.maximum}</h3>
        </div>
        <div>
        <h2>Pokemon height:</h2>
          <h3 key={index}>{pokemon.height.minimum}</h3>
        </div>
        <div>
          <h3 key={index}>{pokemon.height.maximum}</h3>
        </div>
        </div>
        <div>
        <h2>Pokemon special attack:</h2>
        <div>
          <h3 key={index}>{pokemon.attacks.special.damage}</h3>
        </div>
        </div>

        </div>
        
      ))}
    </ul>
  );
}



ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <NewWay />
      </Suspense>
    </ApolloHooksProvider>
    
  </ApolloProvider>,
  document.getElementById('root')
);
