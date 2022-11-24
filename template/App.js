import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppStackNavigator} from './src/navigation/AppNavigator';
import i18n from 'i18next';
import {initReactI18next, useTranslation} from 'react-i18next';
import ua from './src/i18n/ua';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import FlashMessage from 'react-native-flash-message';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  fromPromise,
} from '@apollo/client';
import {API_URL} from './src/modules/constants';
import {
  logout,
  setAccessToken,
  setTokens,
} from './src/store/slices/userSlice';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    ua: ua,
  },
  lng: 'ua',
  fallbackLng: 'ua',
  interpolation: {
    escapeValue: false,
  },
});

const App: () => Node = () => {
  const {t} = useTranslation();

  const getNewToken = async () => {
    const refreshToken = store.getState().user.refreshToken;
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        mutation($token: String!) {
          refreshToken(refreshToken:$token) {
            refreshToken
            token
          }
        }
      `,
        variables: {
          token: refreshToken,
        },
      }),
    })
      .then(res => res.json())
      .then(result => {
        return result;
      });
    store.dispatch(
      setTokens({
        token: resp.data.refreshToken.token,
        refreshToken: resp.data.refreshToken.refreshToken,
      }),
    );
    return resp.data.refreshToken.token;
  };

  const httpLink = new HttpLink({uri: API_URL});
  const authLink = setContext(async (req, {headers}) => {
    const token = store.getState().user.accessToken;
    return {
      ...headers,
      headers: {
        authorization: token ? `JWT ${token}` : null,
      },
    };
  });

  const errorLink = onError(
    ({graphQLErrors, networkError, operation, forward}) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.message) {
            case 'Signature has expired':
              return fromPromise(
                getNewToken().catch(error => {
                  store.dispatch(logout());
                }),
              )
                .filter(value => Boolean(value))
                .flatMap(accessToken => {
                  const oldHeaders = operation.getContext().headers;
                  // modify the operation context with a new token
                  store.dispatch(setAccessToken(accessToken));
                  operation.setContext({
                    headers: {
                      ...oldHeaders,
                      authorization: `JWT ${accessToken}`,
                    },
                  });
                  // retry the request, returning the new observable
                  return forward(operation);
                });
          }
        }
      }
    },
  );
  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
        <FlashMessage position="top" />
      </ApolloProvider>
    </Provider>
  );
};

export default App;
