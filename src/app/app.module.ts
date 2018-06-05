import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo,APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { AppComponent } from "./app.component";

export function createApollo(httpLink: HttpLink) {
 
}

@NgModule({
  imports: [
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    BrowserModule
  ],
   providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
 bootstrap: [AppComponent],
 declarations: [
    AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const http = httpLink.create({uri: 'https://api.github.com/graphql'});

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = "ea2412a6f84c6d7f64caa98f20970aa23cad8038";
      // return the headers to the context so httpLink can read them
      // in this example we assume headers property exists
      // and it is an instance of HttpHeaders
      if (!token) {
        return {};
      } else {
        return {
          headers: {
        Authorization: `Bearer ${token}`,
        Accept:"application/vnd.github.hawkgirl-preview, application/vnd.github.vixen-preview+json"
    }
        };
      }
    });

    apollo.create({
      link: auth.concat(http),
      // other options like cache
      cache:new InMemoryCache()
    });
  }
}